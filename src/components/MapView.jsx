import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icons not loading in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom teal marker
const createCustomIcon = (isActive = false) => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `<div style="
      width: ${isActive ? '36px' : '28px'};
      height: ${isActive ? '36px' : '28px'};
      background: ${isActive ? 'linear-gradient(135deg, #14b8a6, #0ea5e9)' : 'linear-gradient(135deg, #2dd4bf, #14b8a6)'};
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 4px 12px rgba(20, 184, 166, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    ">
      <span style="transform: rotate(45deg); font-size: ${isActive ? '14px' : '12px'}; filter: brightness(0) invert(1);">📍</span>
    </div>`,
    iconSize: [isActive ? 36 : 28, isActive ? 36 : 28],
    iconAnchor: [isActive ? 18 : 14, isActive ? 36 : 28],
    popupAnchor: [0, isActive ? -38 : -30],
  });
};

export default function MapView({ items = [], onItemClick, activeItemId = null, type = 'place' }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // If map already initialized, just update markers
    if (mapInstanceRef.current) {
      updateMarkers();
      return;
    }

    // Default center: Gia Lai (Pleiku)
    const center = [13.9833, 108.0];
    const map = L.map(mapRef.current, {
      center,
      zoom: 9,
      zoomControl: false,
      scrollWheelZoom: true,
    });

    // Custom tile layer (CartoDB Positron - clean, minimal style)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    // Zoom control in bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapInstanceRef.current = map;
    updateMarkers();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers whenever items or activeItemId changes
  useEffect(() => {
    updateMarkers();
  }, [items, activeItemId]);

  const updateMarkers = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const validItems = items.filter((item) => item.lat && item.lng);
    if (validItems.length === 0) return;

    validItems.forEach((item) => {
      const isActive = item.id === activeItemId;
      const marker = L.marker([item.lat, item.lng], {
        icon: createCustomIcon(isActive),
      }).addTo(map);

      // Popup content
      const popupContent = `
        <div style="min-width: 200px; font-family: 'Inter', system-ui, sans-serif;">
          <img src="${item.image}" alt="${item.name}" 
               style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;"
               onerror="this.style.display='none'" />
          <h3 style="font-size: 14px; font-weight: 700; margin: 0 0 4px 0; color: #0f172a;">${item.name}</h3>
          <p style="font-size: 12px; color: #64748b; margin: 0 0 6px 0; line-height: 1.4;">
            ${item.shortDescription || item.description?.substring(0, 80) + '...' || ''}
          </p>
          ${item.rating ? `<div style="font-size: 12px; color: #f59e0b;">⭐ ${item.rating}</div>` : ''}
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 250,
        className: 'custom-popup',
      });

      marker.on('click', () => {
        if (onItemClick) onItemClick(item);
      });

      if (isActive) {
        marker.openPopup();
      }

      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    if (validItems.length > 1) {
      const bounds = L.latLngBounds(validItems.map((item) => [item.lat, item.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
    } else if (validItems.length === 1) {
      map.setView([validItems[0].lat, validItems[0].lng], 12);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden border border-dark-100 dark:border-slate-700 shadow-card">
      {/* Map container */}
      <div ref={mapRef} className="w-full h-full min-h-[400px] z-0" />

      {/* No data overlay */}
      {items.filter((i) => i.lat && i.lng).length === 0 && (
        <div className="absolute inset-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <MapPin className="w-10 h-10 text-dark-300 dark:text-slate-600 mb-3" />
          <p className="text-sm text-dark-500 dark:text-slate-400 font-medium">Không có dữ liệu tọa độ để hiển thị</p>
        </div>
      )}

      {/* Custom popup styles */}
      <style>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          border: 1px solid #e2e8f0;
          padding: 0;
        }
        .custom-popup .leaflet-popup-content {
          margin: 12px;
        }
        .custom-popup .leaflet-popup-tip {
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }
        .custom-map-marker {
          background: none !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
}
