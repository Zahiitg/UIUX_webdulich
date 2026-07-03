import { useState } from 'react';
import { Star, ThumbsUp, Camera, Send, ChevronDown, ChevronUp } from 'lucide-react';
import useTravelStore from '../store/useTravelStore';

// ─── Sample review data (will be replaced by DB later) ───
const SAMPLE_REVIEWS = [
  {
    id: 1,
    user: 'Minh Anh',
    avatar: null,
    rating: 5,
    date: '28/06/2026',
    comment: 'Trải nghiệm tuyệt vời! Hướng dẫn viên rất nhiệt tình và am hiểu văn hóa địa phương. Phong cảnh ngoài sức tưởng tượng.',
    photos: [],
    helpful: 12,
    criteria: { clean: 5, location: 5, service: 5, value: 4 },
  },
  {
    id: 2,
    user: 'Thanh Hằng',
    avatar: null,
    rating: 4,
    date: '25/06/2026',
    comment: 'Cảnh đẹp lắm, ăn uống ngon. Chỉ hơi tiếc thời gian di chuyển hơi nhiều nên ở mỗi điểm không được lâu.',
    photos: [],
    helpful: 8,
    criteria: { clean: 4, location: 5, service: 4, value: 4 },
  },
  {
    id: 3,
    user: 'Đức Phong',
    avatar: null,
    rating: 5,
    date: '20/06/2026',
    comment: 'Đây là chuyến đi gia đình đáng nhớ nhất! Các con tôi rất thích. Sẽ quay lại lần nữa.',
    photos: [],
    helpful: 5,
    criteria: { clean: 5, location: 5, service: 5, value: 5 },
  },
];

const CRITERIA_LABELS = {
  clean: 'Sạch sẽ',
  location: 'Vị trí',
  service: 'Phục vụ',
  value: 'Giá trị',
};

// ─── StarRating Interactive ────────────────────────────
function InteractiveStar({ filled, half, onClick, onHover, size = 20 }) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onHover}
      className="focus:outline-none transition-transform hover:scale-110"
    >
      <Star
        size={size}
        className={`transition-colors duration-150 ${
          filled
            ? 'text-amber-400 fill-amber-400'
            : 'text-dark-200 dark:text-slate-600'
        }`}
      />
    </button>
  );
}

// ─── Progress Bar ──────────────────────────────────────
function CriteriaBar({ label, value, maxValue = 5 }) {
  const pct = (value / maxValue) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-dark-500 dark:text-slate-400 font-medium w-16 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-dark-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-bold text-dark-700 dark:text-slate-300 w-6 text-right">{value.toFixed(1)}</span>
    </div>
  );
}

// ─── Single Review Card ────────────────────────────────
function ReviewCard({ review, onHelpful }) {
  const initials = review.user
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const colors = [
    'from-teal-400 to-cyan-500',
    'from-violet-400 to-purple-500',
    'from-rose-400 to-pink-500',
    'from-amber-400 to-orange-500',
    'from-emerald-400 to-green-500',
  ];
  const colorClass = colors[review.id % colors.length];

  return (
    <div className="bg-white dark:bg-slate-800 border border-dark-100 dark:border-slate-700 rounded-2xl p-5 transition-all hover:shadow-md">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm`}>
          {review.avatar ? (
            <img src={review.avatar} alt={review.user} className="w-full h-full rounded-full object-cover" />
          ) : (
            initials
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-sm text-dark-800 dark:text-white truncate">{review.user}</span>
            <span className="text-[11px] text-dark-400 dark:text-slate-500 shrink-0">{review.date}</span>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={14}
                className={s <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-dark-200 dark:text-slate-600'}
              />
            ))}
          </div>

          {/* Comment */}
          <p className="text-sm text-dark-600 dark:text-slate-300 mt-2.5 leading-relaxed">{review.comment}</p>

          {/* Photos */}
          {review.photos && review.photos.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {review.photos.map((photo, i) => (
                <div key={i} className="w-16 h-16 rounded-lg overflow-hidden border border-dark-100 dark:border-slate-700">
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Helpful */}
          <button
            onClick={() => onHelpful(review.id)}
            className="mt-3 flex items-center gap-1.5 text-xs text-dark-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
          >
            <ThumbsUp size={14} className="group-hover:fill-primary-500/20" />
            <span>Hữu ích ({review.helpful})</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════
export default function ReviewSection({ itemId, itemType = 'tour', rating = 4.5, reviewCount = 120 }) {
  const user = useTravelStore((state) => state.user);
  const [reviews, setReviews] = useState(SAMPLE_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Calculate averages for criteria bars
  const criteriaAvg = Object.keys(CRITERIA_LABELS).reduce((acc, key) => {
    const vals = reviews.filter((r) => r.criteria && r.criteria[key]).map((r) => r.criteria[key]);
    acc[key] = vals.length > 0 ? vals.reduce((s, v) => s + v, 0) / vals.length : 0;
    return acc;
  }, {});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim() || newRating === 0) return;
    setSubmitting(true);

    setTimeout(() => {
      const review = {
        id: Date.now(),
        user: user?.displayName || 'Khách',
        avatar: user?.photoURL || null,
        rating: newRating,
        date: new Date().toLocaleDateString('vi-VN'),
        comment: comment.trim(),
        photos: [],
        helpful: 0,
        criteria: { clean: newRating, location: newRating, service: newRating, value: newRating },
      };

      setReviews((prev) => [review, ...prev]);
      setComment('');
      setNewRating(0);
      setHoverRating(0);
      setShowForm(false);
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }, 800);
  };

  const handleHelpful = (id) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpful: r.helpful + 1 } : r))
    );
  };

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div className="mt-10">
      {/* ──── Section Title ──── */}
      <h2 className="section-title text-lg mb-6 flex items-center gap-2 dark:text-white">
        <span className="w-1 h-6 bg-amber-500 rounded-full" />
        Đánh giá từ khách hàng
      </h2>

      {/* ──── Overview Card ──── */}
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-5 md:p-6 mb-6 border border-primary-100 dark:border-slate-700">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Left: Score */}
          <div className="flex flex-col items-center justify-center md:border-r md:border-primary-200 md:dark:border-slate-700 md:pr-10">
            <span className="text-5xl font-black text-primary-700 dark:text-primary-400 leading-none">{rating}</span>
            <div className="flex items-center gap-0.5 mt-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={16}
                  className={s <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-dark-200 dark:text-slate-600'}
                />
              ))}
            </div>
            <span className="text-xs text-dark-500 dark:text-slate-400 mt-1.5 font-medium">
              {reviewCount} đánh giá
            </span>
          </div>

          {/* Right: Criteria bars */}
          <div className="flex-1 space-y-3">
            {Object.entries(CRITERIA_LABELS).map(([key, label]) => (
              <CriteriaBar key={key} label={label} value={criteriaAvg[key] || 0} />
            ))}
          </div>
        </div>
      </div>

      {/* ──── Write Review Button ──── */}
      {submitted && (
        <div className="mb-4 p-3 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm rounded-xl border border-primary-200 dark:border-primary-800 flex items-center gap-2 animate-fade-in">
          <span className="text-lg">✅</span> Cảm ơn bạn đã gửi đánh giá!
        </div>
      )}

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full mb-6 py-3.5 px-5 bg-white dark:bg-slate-800 border-2 border-dashed border-primary-300 dark:border-primary-700 text-primary-600 dark:text-primary-400 rounded-2xl font-semibold text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all flex items-center justify-center gap-2"
        >
          <Star size={18} className="fill-primary-400 text-primary-400" />
          Viết đánh giá của bạn
        </button>
      )}

      {/* ──── Review Form ──── */}
      {showForm && (
        <div className="bg-white dark:bg-slate-800 border border-dark-100 dark:border-slate-700 rounded-2xl p-5 mb-6 animate-fade-in-up shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-dark-900 dark:text-white text-sm">Viết đánh giá</h4>
            <button onClick={() => setShowForm(false)} className="text-dark-400 hover:text-dark-600 dark:hover:text-slate-300 text-sm">
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Star picker */}
            <div>
              <label className="text-xs text-dark-500 dark:text-slate-400 font-medium mb-2 block">Đánh giá của bạn</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <InteractiveStar
                    key={s}
                    size={28}
                    filled={s <= (hoverRating || newRating)}
                    onClick={() => setNewRating(s)}
                    onHover={() => setHoverRating(s)}
                  />
                ))}
                <span className="ml-3 text-sm text-dark-500 dark:text-slate-400">
                  {(hoverRating || newRating) > 0
                    ? ['', 'Tệ', 'Tạm được', 'Bình thường', 'Tốt', 'Tuyệt vời'][hoverRating || newRating]
                    : 'Chọn số sao'}
                </span>
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="text-xs text-dark-500 dark:text-slate-400 font-medium mb-2 block">Nhận xét</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onMouseLeave={() => setHoverRating(0)}
                rows={3}
                className="w-full bg-dark-50 dark:bg-slate-900 border border-dark-200 dark:border-slate-700 rounded-xl p-3.5 text-sm text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all resize-none placeholder-dark-400"
                placeholder="Chia sẻ trải nghiệm của bạn về chuyến đi này..."
              />
            </div>

            {/* Photo upload placeholder */}
            <button
              type="button"
              className="inline-flex items-center gap-2 text-xs text-dark-400 dark:text-slate-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              <Camera size={16} />
              Thêm ảnh (tùy chọn)
            </button>

            {/* Submit */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 text-sm text-dark-500 dark:text-slate-400 hover:bg-dark-50 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={!comment.trim() || newRating === 0 || submitting}
                className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send size={14} />
                )}
                {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ──── Review List ──── */}
      <div className="space-y-3">
        {displayedReviews.map((review) => (
          <ReviewCard key={review.id} review={review} onHelpful={handleHelpful} />
        ))}
      </div>

      {/* ──── Show More ──── */}
      {reviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 py-3 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          {showAll ? (
            <>
              Thu gọn <ChevronUp size={16} />
            </>
          ) : (
            <>
              Xem tất cả {reviews.length} đánh giá <ChevronDown size={16} />
            </>
          )}
        </button>
      )}
    </div>
  );
}
