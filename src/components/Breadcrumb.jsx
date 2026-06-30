import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-dark-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Trang chủ
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index}>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />
                {isLast || !item.path ? (
                  <span className="ms-1 text-sm font-medium text-dark-800 dark:text-slate-200 md:ms-2">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="ms-1 text-sm font-medium text-dark-500 hover:text-emerald-600 md:ms-2 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
