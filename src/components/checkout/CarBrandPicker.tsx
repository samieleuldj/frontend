'use client';

import Image from 'next/image';
import { CAR_CATALOG } from '@/data/car-brands';

type Props = {
  value: string;
  onChange: (brandId: string) => void;
};

export default function CarBrandPicker({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
      {CAR_CATALOG.map((brand) => {
        const selected = value === brand.id;
        return (
          <button
            key={brand.id}
            type="button"
            onClick={() => onChange(brand.id)}
            className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-2.5 transition-all ${
              selected
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                : 'border-gray-200 bg-white hover:border-primary/40'
            }`}
            aria-pressed={selected}
            aria-label={brand.label}
          >
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-50">
              <Image
                src={brand.logoUrl}
                alt={brand.label}
                fill
                className="object-contain p-1"
                sizes="40px"
              />
            </div>
            <span className={`text-[10px] sm:text-xs font-bold leading-tight text-center ${
              selected ? 'text-primary' : 'text-gray-700'
            }`}>
              {brand.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
