type Props = {
  reviewCount?: number;
  rating?: number;
};

export default function ProductSocialProof({ reviewCount = 120, rating = 4.8 }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="inline-flex items-center gap-1 text-xs font-bold text-green-800 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full">
        ✅ <strong>{reviewCount}+</strong> زبون راضي
      </span>
      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full">
        ⭐ <strong>{rating}/5</strong> تقييم
      </span>
      <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-800 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
        🚚 توصيل لـ <strong>58 ولاية</strong>
      </span>
    </div>
  );
}
