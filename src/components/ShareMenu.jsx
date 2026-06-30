import React, { useState } from 'react';
import { Share2, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ShareMenu({ title, text, url }) {
  const [isOpen, setIsOpen] = useState(false);
  const shareUrl = url || window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Đã sao chép liên kết!');
    setIsOpen(false);
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    setIsOpen(false);
  };

  const handleShareZalo = () => {
    window.open(`https://zalo.me/share?url=${encodeURIComponent(shareUrl)}`, '_blank');
    setIsOpen(false);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'Gia Lai Travel Guide',
          text: text || 'Khám phá địa điểm tuyệt vời này!',
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.log('Error sharing:', err);
        }
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={handleNativeShare}
        className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors"
        title="Chia sẻ"
      >
        <Share2 className="w-5 h-5 text-white" />
      </button>

      {isOpen && !navigator.share && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50 animate-fade-in">
          <button 
            onClick={handleShareFacebook}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-dark-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="w-4 h-4 flex items-center justify-center bg-blue-600 text-white rounded-[4px] text-[10px] font-bold">f</span>
            Chia sẻ Facebook
          </button>
          <button 
            onClick={handleShareZalo}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-dark-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="w-4 h-4 flex items-center justify-center bg-blue-500 text-white rounded-[4px] text-[10px] font-bold">Z</span>
            Chia sẻ Zalo
          </button>
          <button 
            onClick={handleCopyLink}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-dark-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <LinkIcon className="w-4 h-4 text-slate-500" />
            Sao chép liên kết
          </button>
        </div>
      )}
    </div>
  );
}
