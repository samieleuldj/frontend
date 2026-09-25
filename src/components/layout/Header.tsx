import Link from 'next/link';
import { storeBrand } from '@/lib/store-brand';

export default function Header() {
  return (
    <header className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-xl md:text-2xl font-black text-white tracking-tight">
            AUTO <span className="text-amber-400">PLUS</span> DZ
          </span>
          <span className="text-[10px] md:text-xs text-zinc-500 font-bold tracking-widest mt-0.5">
            {storeBrand.taglineAr}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-medium text-zinc-400">
          <Link href="/" className="hover:text-amber-400 transition-colors">الرئيسية</Link>
          <Link href="/product/hood-insulation-mat" className="hover:text-amber-400 transition-colors">
            موكات الكابو
          </Link>
          <Link href="/#reviews" className="hover:text-amber-400 transition-colors">آراء الزبائن</Link>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="/product/hood-insulation-mat#order-form"
            className="bg-amber-400 hover:bg-amber-300 text-zinc-950 px-5 py-2 rounded-full font-black transition-all shadow-md shadow-amber-400/20 text-sm md:text-base"
          >
            أطلب الآن
          </a>
        </div>
      </div>
    </header>
  );
}
