'use client';

import { POPULAR_VEHICLE_SHORTCUTS } from '@/data/car-brands';

type Props = {
  brandId: string;
  modelId: string;
  onSelect: (brandId: string, modelId: string) => void;
};

export default function PopularVehicleShortcuts({ brandId, modelId, onSelect }: Props) {
  return (
    <div>
      <p className="text-xs font-bold text-gray-600 mb-2">اختصارات — اضغط على سيارتك:</p>
      <div className="flex flex-wrap gap-2">
        {POPULAR_VEHICLE_SHORTCUTS.map((item) => {
          const selected = brandId === item.brandId && modelId === item.modelId;
          return (
            <button
              key={`${item.brandId}-${item.modelId}`}
              type="button"
              onClick={() => onSelect(item.brandId, item.modelId)}
              className={`px-3 py-1.5 rounded-full text-xs font-black border transition-colors ${
                selected
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-800 border-gray-300 hover:border-primary'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
