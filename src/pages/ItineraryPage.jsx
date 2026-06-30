import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import useTravelStore from '../store/useTravelStore';
import placesData from '../data/placesData';
import { generateItinerary } from '../services/aiService';

// Fix default Leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// ─── Helpers ──────────────────────────────────────────────
const formatVND = (amount) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

const placeById = (id) => placesData.find((p) => p.id === id);

const FALLBACK_IMAGES = [
  "/images/bien_ho_tnnung_1782505155088.png", // Lake
  "/images/chu_dang_ya_volcano_1782505165301.png", // Mountain
  "/images/lang_stor_bahnar_1782505259629.png", // Village
  "/images/doi_che_gia_lai_1782505177095.png", // Tea hill
];

// Calculate realistic travel time based on distance (Haversine formula)
function calculateTravelTime(place1, place2) {
  if (!place1 || !place2) return '15-30 phút';
  
  const R = 6371; // km
  const dLat = (place2.lat - place1.lat) * Math.PI / 180;
  const dLon = (place2.lng - place1.lng) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(place1.lat * Math.PI / 180) * Math.cos(place2.lat * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const dist = R * c; // distance in km
  
  // Assume avg speed 40km/h
  const timeMins = Math.round((dist / 40) * 60);
  
  if (timeMins < 5) return 'Dưới 5 phút';
  if (timeMins <= 15) return '10-15 phút';
  if (timeMins <= 30) return '15-30 phút';
  if (timeMins <= 45) return '30-45 phút';
  if (timeMins <= 60) return '45-60 phút';
  const h = Math.floor(timeMins / 60);
  const m = timeMins % 60;
  return m > 0 ? `${h} giờ ${m} phút` : `${h} giờ`;
}

// ─── Circular Progress Component ─────────────────────────
function CircularProgress({ percentage, size = 56, stroke = 5 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#16a34a"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
}

// ─── Shimmer Skeleton ─────────────────────────────────────
function SkeletonLoader() {
  return (
    <div className="page-container bg-dark-50 dark:bg-slate-900 flex flex-col relative overflow-hidden">
      {/* ── Background Watermark ── */}
      <div className="absolute inset-0 bg-brocade opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />

      {/* ── Top Cover Image ── */}
      <div className="relative h-48 sm:h-56 w-full flex-shrink-0 z-0">
        <img 
          src="/images/bien_ho_tnnung_1782505155088.png" 
          alt="Gia Lai" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-50 via-dark-50/60 to-transparent dark:from-slate-900 dark:via-slate-900/60" />
      </div>

      {/* ── Header Area ── */}
      <div className="px-5 pt-2 pb-4 flex items-center justify-between relative z-10 -mt-16">
        <div className="w-10 h-10 rounded-full skeleton" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-40 skeleton rounded-lg" />
          <div className="h-3 w-56 skeleton rounded-lg" />
        </div>
      </div>

      {/* Summary cards skeleton */}
      <div className="grid grid-cols-3 gap-3 mb-6 px-5">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-card space-y-3 border border-transparent dark:border-slate-700"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div className="h-3 w-12 skeleton rounded" />
            <div className="h-8 w-20 skeleton rounded-lg" />
          </div>
        ))}
      </div>

      {/* Tab skeleton */}
      <div className="flex gap-3 mb-6 px-5">
        <div className="h-10 w-28 skeleton rounded-full" />
        <div className="h-10 w-28 skeleton rounded-full" />
      </div>

      {/* Timeline skeleton */}
      <div className="space-y-4 px-5">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-card border border-transparent dark:border-slate-700"
            style={{ animationDelay: `${(i + 3) * 120}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl skeleton" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 skeleton rounded" />
                <div className="h-3 w-1/2 skeleton rounded" />
                <div className="h-3 w-1/3 skeleton rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shimmer overlay */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
        <div className="text-center animate-pulse-soft bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
            <span className="text-2xl">🌿</span>
          </div>
          <p className="text-dark-600 dark:text-slate-200 font-medium">AI đang tạo lịch trình...</p>
          <p className="text-dark-400 dark:text-slate-400 text-sm mt-1">Đang phân tích sở thích của bạn</p>
        </div>
      </div>
    </div>
  );
}

// ─── Activity Card ────────────────────────────────────────
function ActivityCard({ activity, isLast, index }) {
  const navigate = useNavigate();
  const place = placeById(activity.placeId);

  // Alternate card accent stripe color
  const accentColors = [
    'from-primary-500 to-primary-600',
    'from-accent-500 to-accent-600',
    'from-earth-400 to-earth-500',
    'from-emerald-500 to-teal-600',
  ];
  const accent = accentColors[index % accentColors.length];

  return (
    <div className="relative pl-8">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[11px] top-10 bottom-0 w-[2px] bg-gradient-to-b from-primary-300 to-primary-100" />
      )}

      {/* Timeline dot */}
      <div className="absolute left-0 top-3 w-6 h-6 rounded-full bg-white border-[3px] border-primary-500 shadow-md z-10 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-primary-500" />
      </div>

      {/* Card */}
      <button
        onClick={() => navigate(`/place-detail/${activity.placeId}`)}
        className="w-full text-left card-interactive mb-4 group overflow-hidden"
      >
        {/* Accent stripe */}
        <div className={`h-1 bg-gradient-to-r ${accent}`} />

        <div className="p-4">
          <div className="flex gap-3">
            {/* Thumbnail */}
            {place && (
              <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden shadow-sm relative bg-dark-100 dark:bg-slate-800 flex items-center justify-center">
                {/* Fallback Icon */}
                <div className="absolute inset-0 flex items-center justify-center text-2xl z-0">
                  {place.category[0] === 'Ẩm thực' ? '🍜' : place.category[0] === 'Cà phê' ? '☕' : '🏞️'}
                </div>
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 relative z-10"
                  onError={(e) => {
                    e.target.onerror = null; // prevent infinite loop
                    e.target.src = FALLBACK_IMAGES[place.id % FALLBACK_IMAGES.length];
                  }}
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              {/* Time badge */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-[11px] font-semibold rounded-full">
                  🕐 {activity.timeSlot}
                </span>
                <span className="text-[11px] text-dark-400 dark:text-slate-400 font-medium">{activity.duration}</span>
              </div>

              {/* Place name */}
              <h4 className="font-bold text-dark-900 dark:text-slate-100 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors text-[15px] leading-snug mb-0.5 truncate">
                {activity.name}
              </h4>

              {/* Rating preview inline */}
              {place && (
                <div className="flex items-center gap-1">
                  <span className="text-amber-400 text-xs">★</span>
                  <span className="text-xs font-medium text-dark-500 dark:text-slate-400">{place.rating}</span>
                  <span className="text-xs text-dark-300 dark:text-slate-600">·</span>
                  <span className="text-xs text-dark-400 dark:text-slate-400">{place.reviewCount} đánh giá</span>
                </div>
              )}
            </div>
          </div>

          {/* Note */}
          {activity.note && (
            <p className="text-xs text-dark-400 dark:text-slate-400 leading-relaxed mt-2 line-clamp-2">
              {activity.note}
            </p>
          )}

          {/* Footer: cost + travel time */}
          <div className="flex items-center justify-between pt-2 mt-2 border-t border-dark-100 dark:border-slate-700">
            <span className="text-xs font-semibold text-accent-600 dark:text-accent-400">
              {activity.estimatedCost > 0 ? formatVND(activity.estimatedCost) : 'Miễn phí'}
            </span>
            {!isLast && activity.travelTimeToNext && (
              <span className="inline-flex items-center gap-1 text-xs text-dark-400 dark:text-slate-400">
                🚗 {activity.travelTimeToNext}
              </span>
            )}
          </div>
        </div>
      </button>
    </div>
  );
}

// ─── Day Section ──────────────────────────────────────────
function DaySection({ day, dayIndex }) {
  const bgPatterns = [
    'from-primary-600 to-primary-700',
    'from-earth-600 to-earth-700',
    'from-accent-600 to-accent-700',
  ];
  const bg = bgPatterns[dayIndex % bgPatterns.length];

  return (
    <div
      className="mb-6 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${dayIndex * 200}ms`, animationFillMode: 'forwards' }}
    >
      {/* Day header */}
      <div className={`bg-gradient-to-r ${bg} rounded-2xl px-5 py-4 mb-5 shadow-lg relative overflow-hidden`}>
        {/* Decorative circles */}
        <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full" />
        <div className="absolute -right-2 bottom-0 w-12 h-12 bg-white/5 rounded-full" />

        <div className="relative z-10">
          <span className="inline-block px-2 py-0.5 bg-white/20 text-white/90 rounded-md text-[10px] font-bold uppercase tracking-wider mb-1">
            Ngày {day.dayNumber}
          </span>
          <h3 className="text-white font-bold text-lg leading-tight">{day.title}</h3>
          <p className="text-white/70 text-xs mt-1">
            {day.activities.length} hoạt động
          </p>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="px-5 mb-4 relative z-10">
        {day.activities.map((activity, aIdx) => {
          const isLast = aIdx === day.activities.length - 1;
          
          let computedTravelTime = activity.travelTimeToNext;
          if (!isLast) {
            const nextAct = day.activities[aIdx + 1];
            const p1 = placeById(activity.placeId);
            const p2 = placeById(nextAct.placeId);
            if (p1 && p2) {
              computedTravelTime = calculateTravelTime(p1, p2);
            }
          }

          return (
            <ActivityCard
              key={`${day.dayNumber}-${aIdx}`}
              activity={{ ...activity, travelTimeToNext: computedTravelTime }}
              isLast={isLast}
              index={aIdx}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── Map View ─────────────────────────────────────────────
function ItineraryMap({ itinerary }) {
  const markers = useMemo(() => {
    if (!itinerary?.days) return [];
    const list = [];
    itinerary.days.forEach((day) => {
      day.activities.forEach((act) => {
        const place = placeById(act.placeId);
        if (place) {
          list.push({
            id: place.id,
            name: place.name,
            position: [place.lat, place.lng],
            day: day.dayNumber,
          });
        }
      });
    });
    return list;
  }, [itinerary]);

  const polylinePositions = useMemo(
    () => markers.map((m) => m.position),
    [markers],
  );

  const [routePositions, setRoutePositions] = useState([]);
  const [mapLayer, setMapLayer] = useState('topo');

  const mapOptions = {
    topo: {
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
    },
    street: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  };

  useEffect(() => {
    if (polylinePositions.length < 2) {
      setRoutePositions(polylinePositions);
      return;
    }
    
    let isMounted = true;
    const fetchRoute = async () => {
      try {
        // OSRM expects lng,lat format
        const coordsStr = polylinePositions.map(p => `${p[1]},${p[0]}`).join(';');
        const url = `https://router.project-osrm.org/route/v1/driving/${coordsStr}?overview=full&geometries=geojson`;
        
        const res = await fetch(url);
        const data = await res.json();
        
        if (isMounted && data.routes && data.routes[0]) {
          // Convert returned geojson (lng,lat) back to Leaflet format (lat,lng)
          const mappedRoute = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
          setRoutePositions(mappedRoute);
        } else if (isMounted) {
          setRoutePositions(polylinePositions);
        }
      } catch (err) {
        console.error('OSRM Routing error:', err);
        if (isMounted) setRoutePositions(polylinePositions);
      }
    };

    fetchRoute();
    return () => { isMounted = false; };
  }, [polylinePositions]);

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-card border border-dark-100 animate-fade-in w-full h-full relative"
      style={{ minHeight: 400 }}
    >
      {/* Map Layer Toggle */}
      <div className="absolute top-3 right-3 z-[400] flex bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl shadow-lg p-1 border border-slate-200/50 dark:border-slate-700/50">
        <button
          onClick={() => setMapLayer('topo')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            mapLayer === 'topo'
              ? 'bg-primary-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          🏔️ Địa hình
        </button>
        <button
          onClick={() => setMapLayer('street')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            mapLayer === 'street'
              ? 'bg-primary-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          🛣️ Đường phố
        </button>
      </div>

      <MapContainer
        center={[13.98, 108.01]}
        zoom={11}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution={mapOptions[mapLayer].attribution}
          url={mapOptions[mapLayer].url}
        />

        {markers.map((m) => (
          <Marker key={m.id} position={m.position}>
            <Popup>
              <div className="text-center">
                <p className="font-bold text-sm">{m.name}</p>
                <p className="text-xs text-gray-500">Ngày {m.day}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {routePositions.length > 1 && (
          <Polyline
            positions={routePositions}
            pathOptions={{
              color: '#2563eb', // Blue colored real route
              weight: 4,
              opacity: 0.8,
              lineCap: 'round',
              lineJoin: 'round'
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function ItineraryPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('timeline');

  const {
    itinerary,
    setItinerary,
    selectedPreferences,
    tripInfo,
    itineraryLoading,
    setItineraryLoading,
    setMatchPercentage,
    setTotalCost,
    matchPercentage,
    totalCost,
  } = useTravelStore();

  // Fetch itinerary on mount if not present
  useEffect(() => {
    if (itinerary) return;

    let cancelled = false;

    async function fetchItinerary() {
      setItineraryLoading(true);
      try {
        const result = await generateItinerary(selectedPreferences, tripInfo);
        if (cancelled) return;
        setItinerary(result);
        setMatchPercentage(result.matchPercentage ?? 85);
        setTotalCost(result.totalEstimatedCost ?? 0);
      } catch (err) {
        console.error('Itinerary generation failed:', err);
      } finally {
        if (!cancelled) setItineraryLoading(false);
      }
    }

    fetchItinerary();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Derived
  const numDays = itinerary?.days?.length ?? 0;
  const displayCost = itinerary ? (totalCost || itinerary.totalEstimatedCost || 0) : 0;
  const displayMatch = itinerary ? (matchPercentage || itinerary.matchPercentage || 0) : 0;

  // ── Loading state ──
  if (itineraryLoading || !itinerary) return <SkeletonLoader />;

  // ── Rendered ──
  return (
    <div className="w-full pb-28 bg-dark-50 dark:bg-slate-900 min-h-screen flex flex-col relative">
      {/* ── Background Watermark ── */}
      <div className="absolute inset-0 bg-brocade opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />

      {/* ── Top Cover Image ── */}
      <div className="relative h-56 w-full flex-shrink-0 z-0">
        <img 
          src="/images/chu_dang_ya_volcano_1782505165301.png" 
          alt="Gia Lai" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-50 via-dark-50/60 to-transparent dark:from-slate-900 dark:via-slate-900/60" />
        
        {/* Back Button */}
        <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center transition-colors hover:bg-black/40 z-20"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
      </div>

      {/* ──── Summary Cards ──── */}
      <div className="px-4 pt-5 pb-2 relative z-10 -mt-16">
        <div className="grid grid-cols-3 gap-3">
          {/* Total cost */}
          <div className="card p-3.5 border border-dark-50 dark:border-slate-700 animate-fade-in-up">
            <p className="text-[10px] uppercase tracking-wider text-dark-400 dark:text-slate-400 font-bold mb-1">
              Tổng chi phí
            </p>
            <p className="text-base font-extrabold text-dark-900 dark:text-slate-100 leading-tight">
              {formatVND(displayCost)}
            </p>
          </div>

          {/* Match percentage */}
          <div className="card p-3.5 border border-dark-50 dark:border-slate-700 flex flex-col items-center justify-center animate-fade-in-up delay-100">
            <p className="text-[10px] uppercase tracking-wider text-dark-400 dark:text-slate-400 font-bold mb-1.5">
              Phù hợp
            </p>
            <div className="relative">
              <CircularProgress percentage={displayMatch} size={48} stroke={4} />
              <span className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-primary-700 dark:text-primary-400">
                {displayMatch}%
              </span>
            </div>
          </div>

          {/* Number of days */}
          <div className="card p-3.5 border border-dark-50 dark:border-slate-700 animate-fade-in-up delay-200">
            <p className="text-[10px] uppercase tracking-wider text-dark-400 dark:text-slate-400 font-bold mb-1">
              Số ngày
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-dark-900 dark:text-slate-100">{numDays}</span>
              <span className="text-xs text-dark-400 dark:text-slate-400 font-medium">ngày</span>
            </div>
          </div>
        </div>
      </div>

      {/* ──── Tips banner ──── */}
      {itinerary.tips && itinerary.tips.length > 0 && (
        <div className="px-4 mt-3 animate-fade-in delay-300 relative z-10">
          <div className="bg-accent-50 dark:bg-accent-900/30 border border-accent-200 dark:border-accent-800/50 rounded-2xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-lg flex-shrink-0 mt-0.5">💡</span>
            <p className="text-xs text-accent-800 dark:text-accent-200 leading-relaxed font-medium">
              {itinerary.tips[0]}
            </p>
          </div>
        </div>
      )}

      {/* ──── Mobile Tab Toggle ──── */}
      <div className="px-4 mt-5 mb-4 lg:hidden relative z-10">
        <div className="inline-flex bg-dark-100 dark:bg-slate-800 rounded-full p-1 w-full">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex-1 py-2.5 px-4 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === 'timeline'
                ? 'bg-white dark:bg-slate-700 text-primary-700 dark:text-primary-400 shadow-sm'
                : 'text-dark-500 hover:text-dark-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            📋 Lịch trình
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`flex-1 py-2.5 px-4 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === 'map'
                ? 'bg-white dark:bg-slate-700 text-primary-700 dark:text-primary-400 shadow-sm'
                : 'text-dark-500 hover:text-dark-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            🗺️ Bản đồ
          </button>
        </div>
      </div>

      {/* ──── Content (Mobile & Desktop) ──── */}
      <div className="px-4 lg:px-8 lg:mt-8 relative z-10">
        {/* Mobile View: Tabs */}
        <div className="lg:hidden">
          {activeTab === 'timeline' ? (
            <div className="pb-8">
              {itinerary.days.map((day, idx) => (
                <DaySection key={day.dayNumber} day={day} dayIndex={idx} />
              ))}
            </div>
          ) : (
            <div className="pb-8 h-[70vh] min-h-[500px]">
              <ItineraryMap itinerary={itinerary} />
            </div>
          )}
        </div>

        {/* Desktop View: 2 Columns */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 items-start pb-12">
          {/* Left Column: Timeline */}
          <div className="col-span-5 xl:col-span-4 pr-2">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">
              Chi tiết lịch trình
            </h2>
            <div className="space-y-8">
              {itinerary.days.map((day, idx) => (
                <DaySection key={day.dayNumber} day={day} dayIndex={idx} />
              ))}
            </div>
            {/* Desktop Action Button */}
            <div className="mt-8 pt-6 border-t border-dark-100">
              <button
                onClick={() => navigate('/chatbot')}
                className="w-full btn-primary py-4 rounded-2xl text-base shadow-float group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary-400/0 via-white/20 to-primary-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative flex items-center justify-center gap-2">
                  <span className="text-lg">💬</span>
                  Chat với trợ lý AI
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Sticky Map */}
          <div className="col-span-7 xl:col-span-8 sticky top-24 h-[75vh]">
            <ItineraryMap itinerary={itinerary} />
          </div>
        </div>
      </div>

      {/* ──── Fixed Bottom Action (Mobile Only) ──── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent dark:from-slate-900 dark:via-slate-900 z-30 lg:hidden">
        <div className="max-w-xl mx-auto">
          <button
            onClick={() => navigate('/chatbot')}
            className="w-full btn-primary py-4 rounded-2xl text-base shadow-float group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary-400/0 via-white/20 to-primary-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative flex items-center justify-center gap-2">
              <span className="text-lg">💬</span>
              Chat với trợ lý AI
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
