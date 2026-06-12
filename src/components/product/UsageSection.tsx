'use client';

import { useState } from 'react';

interface UsageSectionProps {
  steps: string[];
  /** فيديو MP4 على الموقع — الزبون ما يخرجش (الأفضل) */
  videoFile?: string;
  /** صورة قبل تشغيل الفيديو */
  videoPoster?: string;
}

export default function UsageSection({ steps, videoFile, videoPoster }: UsageSectionProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const showVideo = videoFile && !videoFailed;

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

        <div className="relative aspect-[9/16] max-h-[480px] mx-auto w-full max-w-[300px] rounded-2xl overflow-hidden border border-gray-200 bg-black shadow-lg">
          {showVideo ? (
            <video
              className="w-full h-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster={videoPoster}
              onError={() => setVideoFailed(true)}
            >
              <source src={videoFile} type="video/mp4" />
            </video>
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-gray-900 to-primary/80"
              style={
                videoPoster
                  ? {
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.75)), url(${videoPoster})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : undefined
              }
            >
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 backdrop-blur-sm">
                <span className="text-3xl text-white">▶</span>
              </div>
              <p className="text-white font-bold text-lg mb-2">فيديو توضيحي</p>
              <p className="text-white/90 text-sm leading-relaxed">
                الفيديو يتشغّل هنا في الموقع — الزبون ما يخرجش لـ TikTok ولا YouTube.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
