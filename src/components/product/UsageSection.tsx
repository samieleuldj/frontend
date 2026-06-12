interface UsageSectionProps {
  steps: string[];
  videoUrl?: string;
}

function getVideoEmbedUrl(url: string): string | null {
  const trimmed = url.trim();

  // TikTok: https://www.tiktok.com/@user/video/1234567890
  const tiktokMatch = trimmed.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
  if (tiktokMatch) {
    return `https://www.tiktok.com/embed/v2/${tiktokMatch[1]}`;
  }

  // YouTube watch: https://www.youtube.com/watch?v=VIDEO_ID
  const youtubeWatchMatch = trimmed.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (youtubeWatchMatch) {
    return `https://www.youtube.com/embed/${youtubeWatchMatch[1]}`;
  }

  // Already an embed URL
  if (trimmed.includes('/embed/')) {
    return trimmed;
  }

  return null;
}

export default function UsageSection({ steps, videoUrl }: UsageSectionProps) {
  const embedUrl = videoUrl ? getVideoEmbedUrl(videoUrl) : null;

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">📋</div>
        <h2 className="text-2xl font-black text-text">طريقة الاستعمال</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white font-black flex items-center justify-center text-sm">
                {index + 1}
              </span>
              <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
            </li>
          ))}
        </ol>

        <div className="relative aspect-[9/16] max-h-[420px] mx-auto w-full max-w-[280px] rounded-2xl overflow-hidden border border-gray-200 bg-gray-900 shadow-inner">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title="فيديو توضيحي"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-gray-900 to-primary/80">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                <span className="text-3xl text-white">▶</span>
              </div>
              <p className="text-white font-bold text-lg mb-2">فيديو TikTok قريباً</p>
              <p className="text-white/80 text-sm leading-relaxed">
                ابعتيلنا رابط الفيديو من TikTok ونزيدوه هنا تلقائياً.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
