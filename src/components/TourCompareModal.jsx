import React from 'react';
import useTravelStore from '../store/useTravelStore';
import toursData from '../data/toursData';

export default function TourCompareModal({ onClose }) {
  const compareList = useTravelStore((state) => state.compareList);
  const toggleCompare = useTravelStore((state) => state.toggleCompare);
  const clearCompare = useTravelStore((state) => state.clearCompare);

  const tours = compareList.map(id => toursData.find(t => t.id === id)).filter(Boolean);

  if (tours.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-dark-100 dark:border-slate-800">
          <h3 className="text-xl sm:text-2xl font-bold dark:text-white flex items-center gap-2">
            📊 So sánh Tour
          </h3>
          <div className="flex items-center gap-3">
            <button onClick={clearCompare} className="text-sm text-red-500 hover:text-red-600 font-medium hidden sm:block">
              Xóa tất cả
            </button>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-dark-50 dark:bg-slate-800 flex items-center justify-center hover:bg-dark-100 dark:hover:bg-slate-700 text-dark-500 dark:text-slate-400">
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-4 sm:p-6">
          <div className="min-w-[600px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-3 w-1/4"></th>
                  {tours.map(tour => (
                    <th key={tour.id} className="p-3 w-1/4 align-top relative group">
                      <button 
                        onClick={() => toggleCompare(tour.id)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        title="Xóa khỏi so sánh"
                      >✕</button>
                      <div className="aspect-video rounded-lg overflow-hidden mb-3">
                        <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-bold text-dark-900 dark:text-white line-clamp-2">{tour.name}</h4>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-100 dark:divide-slate-800">
                <tr>
                  <td className="p-3 font-medium text-dark-500 dark:text-slate-400">Giá</td>
                  {tours.map(tour => (
                    <td key={tour.id} className="p-3 font-bold text-primary-600 dark:text-primary-400">
                      {tour.price > 0 ? `${tour.price.toLocaleString('vi-VN')}đ` : 'Miễn phí'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-dark-500 dark:text-slate-400">Thời gian</td>
                  {tours.map(tour => (
                    <td key={tour.id} className="p-3 text-dark-800 dark:text-slate-200">
                      {tour.duration}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-dark-500 dark:text-slate-400">Đánh giá</td>
                  {tours.map(tour => (
                    <td key={tour.id} className="p-3 text-dark-800 dark:text-slate-200">
                      <span className="text-amber-500">★</span> {tour.rating} ({tour.reviewCount})
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-dark-500 dark:text-slate-400">Thể loại</td>
                  {tours.map(tour => (
                    <td key={tour.id} className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {tour.category.map(c => (
                          <span key={c} className="text-[10px] px-2 py-1 rounded bg-primary-50 dark:bg-slate-800 text-primary-700 dark:text-primary-400">{c}</span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-dark-500 dark:text-slate-400">Điểm nổi bật</td>
                  {tours.map(tour => (
                    <td key={tour.id} className="p-3 align-top">
                      <ul className="list-disc pl-4 space-y-1 text-sm text-dark-700 dark:text-slate-300">
                        {tour.highlights?.map((h, i) => <li key={i}>{h}</li>)}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
