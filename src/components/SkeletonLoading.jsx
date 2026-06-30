import React from 'react';

export function TourSkeleton() {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-white/10 dark:border-white/5 shadow-card">
      {/* Image skeleton */}
      <div className="relative h-52 sm:h-56 bg-dark-200 dark:bg-slate-800 animate-pulse">
        {/* Badges skeleton */}
        <div className="absolute top-3 right-3 flex gap-2">
          <div className="w-8 h-8 rounded-full bg-dark-300 dark:bg-slate-700 animate-pulse" />
          <div className="w-20 h-8 rounded-full bg-dark-300 dark:bg-slate-700 animate-pulse" />
        </div>
        <div className="absolute top-3 left-3 w-24 h-8 rounded-full bg-dark-300 dark:bg-slate-700 animate-pulse" />
      </div>

      {/* Body skeleton */}
      <div className="p-4 space-y-3">
        {/* Rating row */}
        <div className="flex items-center gap-2">
          <div className="w-24 h-4 bg-dark-200 dark:bg-slate-800 rounded animate-pulse" />
          <div className="w-16 h-4 bg-dark-200 dark:bg-slate-800 rounded animate-pulse" />
        </div>

        {/* Title */}
        <div className="w-full h-6 bg-dark-200 dark:bg-slate-800 rounded animate-pulse" />
        <div className="w-3/4 h-6 bg-dark-200 dark:bg-slate-800 rounded animate-pulse" />

        {/* Categories */}
        <div className="flex gap-2">
          <div className="w-16 h-6 bg-dark-200 dark:bg-slate-800 rounded-full animate-pulse" />
          <div className="w-20 h-6 bg-dark-200 dark:bg-slate-800 rounded-full animate-pulse" />
        </div>

        {/* Address */}
        <div className="w-full h-4 bg-dark-200 dark:bg-slate-800 rounded animate-pulse mt-2" />
      </div>
    </div>
  );
}

export function PlaceSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-white/10 dark:border-white/5">
      {/* Image skeleton */}
      <div className="h-48 bg-dark-200 dark:bg-slate-800 animate-pulse relative">
        <div className="absolute top-3 right-3 w-16 h-6 rounded-full bg-dark-300 dark:bg-slate-700 animate-pulse" />
      </div>

      {/* Content skeleton */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        <div className="w-3/4 h-5 bg-dark-200 dark:bg-slate-800 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="w-16 h-4 bg-dark-200 dark:bg-slate-800 rounded-md animate-pulse" />
          <div className="w-16 h-4 bg-dark-200 dark:bg-slate-800 rounded-md animate-pulse" />
        </div>
        <div className="w-full h-4 bg-dark-200 dark:bg-slate-800 rounded animate-pulse" />
        <div className="w-full h-4 bg-dark-200 dark:bg-slate-800 rounded animate-pulse" />
        <div className="w-1/2 h-3 bg-dark-200 dark:bg-slate-800 rounded animate-pulse mt-auto pt-2" />
      </div>
    </div>
  );
}
