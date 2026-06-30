import React from 'react';
import useTravelStore from '../store/useTravelStore';
import { X, Scale } from 'lucide-react';
import toursData from '../data/toursData';

export default function CompareFloatingBar() {
  const compareList = useTravelStore((state) => state.compareList);
  const clearCompare = useTravelStore((state) => state.clearCompare);
  const setCompareModalOpen = useTravelStore((state) => state.setCompareModalOpen);
  const toggleCompare = useTravelStore((state) => state.toggleCompare);

  if (compareList.length === 0) return null;

  const comparedTours = compareList.map(id => toursData.find(t => t.id === id)).filter(Boolean);

  return (
    <div 
      className="fixed bottom-8 left-0 right-0 mx-auto md:left-auto md:right-8 md:mx-0 z-50 animate-fade-in-up w-[90%] md:w-auto max-w-md print:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-dark-200/50 dark:border-slate-700/50 shadow-2xl rounded-2xl p-4 flex flex-col gap-3">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-dark-100 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary-500" />
            <h3 className="font-bold text-dark-900 dark:text-white">
              So sánh ({compareList.length}/3)
            </h3>
          </div>
          <button 
            onClick={clearCompare}
            className="text-xs text-red-500 hover:text-red-600 font-medium px-2 py-1 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
          >
            Xóa tất cả
          </button>
        </div>

        {/* Selected Tours List (Mini) */}
        <div className="flex gap-2">
          {comparedTours.map(tour => (
            <div key={tour.id} className="relative w-16 h-16 rounded-xl overflow-hidden group shadow-sm border border-dark-100 dark:border-slate-800 flex-shrink-0">
              <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
              <button 
                onClick={() => toggleCompare(tour.id)}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {/* Empty slots placeholders */}
          {[...Array(3 - comparedTours.length)].map((_, i) => (
            <div key={`empty-${i}`} className="w-16 h-16 rounded-xl border-2 border-dashed border-dark-200 dark:border-slate-700 bg-dark-50/50 dark:bg-slate-800/50 flex items-center justify-center">
              <span className="text-dark-300 dark:text-slate-600 text-xl">+</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={() => setCompareModalOpen(true)}
          disabled={compareList.length < 2}
          className={`w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            compareList.length < 2 
            ? 'bg-dark-100 dark:bg-slate-800 text-dark-400 dark:text-slate-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg shadow-primary-500/30'
          }`}
        >
          <Scale className="w-4 h-4" />
          {compareList.length < 2 ? 'Chọn thêm để so sánh' : 'So sánh ngay'}
        </button>

      </div>
    </div>
  );
}
