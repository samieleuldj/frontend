export type CarModelOption = {
  id: string;
  label: string;
  /** نفس المقاس في المخزون — id موديل مرجعي */
  stockModelId?: string;
  /** كلمات بحث إضافية (عربي/فرنسي) */
  searchTerms?: string;
};

export type CarBrandOption = {
  id: string;
  label: string;
  logoUrl: string;
  models: CarModelOption[];
};

/** Marques + modèles disponibles pour les موكات isolantes capot (AUTO PLUS DZ). */
export const CAR_CATALOG: CarBrandOption[] = [
  {
    id: 'volkswagen',
    label: 'Volkswagen',
    logoUrl: '/brands/volkswagen.svg',
    models: [
      { id: 'vw-golf-4', label: 'Golf 4' },
      { id: 'vw-golf-5', label: 'Golf 5' },
      { id: 'vw-golf-6', label: 'Golf 6' },
      { id: 'vw-jetta-5', label: 'Jetta (2005–2010)', stockModelId: 'vw-golf-5', searchTerms: 'jetta' },
      { id: 'vw-polo', label: 'Polo (2010–2016)' },
      { id: 'vw-caddy', label: 'Caddy (2006–2015)' },
    ],
  },
  {
    id: 'renault',
    label: 'Renault',
    logoUrl: '/brands/renault.svg',
    models: [
      { id: 'rn-symbol-09', label: 'Symbol (2009–2012)', searchTerms: 'thalia سيمبول' },
      { id: 'rn-symbol-13', label: 'Symbol (2013–2020)', searchTerms: 'سيمبول thalia' },
      { id: 'rn-laguna-1', label: 'Laguna 1 (1995–2001)' },
      { id: 'rn-laguna-2', label: 'Laguna 2 (2002–2007)' },
      { id: 'rn-megane-1', label: 'Mégane 1 (1995–2003)' },
      { id: 'rn-megane-2', label: 'Mégane 2 (2001–2008)' },
      { id: 'rn-clio-jap', label: 'Clio japonais (1993–2000)', searchTerms: 'كليو japonaise' },
      { id: 'rn-clio-debza', label: 'Clio debza (1998–2001)' },
      { id: 'rn-clio-4', label: 'Clio 4 (2013–2019)', searchTerms: 'كليو 4' },
    ],
  },
  {
    id: 'peugeot',
    label: 'Peugeot',
    logoUrl: '/brands/peugeot.svg',
    models: [
      { id: 'pg-207', label: '207 (2006–2013)' },
      { id: 'pg-208', label: '208 (2012–2020)' },
      { id: 'pg-308-t7', label: '308 T7 (2008–2014)' },
      { id: 'pg-308-t9', label: '308 T9 (2014–2020)' },
      { id: 'pg-tp-b9', label: 'Partner Tepee / B9 (2008–2016)', searchTerms: 'tepee tp partner' },
      { id: 'pg-301', label: '301 (2012–2020)' },
      { id: 'pg-307-an', label: '307 ancienne (1999–2005)' },
      { id: 'pg-307-nv', label: '307 nouvelle (2006–2007)' },
      {
        id: 'pg-partner-orig',
        label: 'Partner II (2008–2018)',
        searchTerms: 'partner origine berlingo',
      },
      { id: 'pg-partner-an', label: 'Partner I (1996–2002)', searchTerms: 'partner ancien' },
      { id: 'pg-expert', label: 'Expert (1995–2006)', searchTerms: 'jumpy scudo' },
      { id: 'pg-206', label: '206 (1999–2008)' },
      { id: 'pg-306', label: '306 (1995–2002)' },
      { id: 'pg-406', label: '406 (1995–2004)' },
    ],
  },
  {
    id: 'chery',
    label: 'Chery',
    logoUrl: '/brands/chery.svg',
    models: [
      { id: 'ch-qq', label: 'QQ (2007–2016)' },
      {
        id: 'ch-spark',
        label: 'Spark / Matiz (نفس QQ)',
        stockModelId: 'ch-qq',
        searchTerms: 'chevrolet daewoo matiz spark',
      },
    ],
  },
  {
    id: 'toyota',
    label: 'Toyota',
    logoUrl: '/brands/toyota.svg',
    models: [
      { id: 'ty-corolla', label: 'Corolla (2003–2007)' },
      { id: 'ty-yaris', label: 'Yaris (2012–2016)', searchTerms: 'yaris vitz' },
    ],
  },
  {
    id: 'hyundai',
    label: 'Hyundai',
    logoUrl: '/brands/hyundai.svg',
    models: [
      { id: 'hy-accent-mc', label: 'Accent (2006–2010)' },
      { id: 'hy-accent-rb', label: 'Accent (2011–2016)' },
    ],
  },
  {
    id: 'citroen',
    label: 'Citroën',
    logoUrl: '/brands/citroen.svg',
    models: [
      { id: 'ct-saxo', label: 'Saxo (1998–2002)' },
      { id: 'ct-xsara', label: 'Xsara (1995–2002)' },
      { id: 'ct-c4-picasso', label: 'C4 Picasso (2010–2014)', searchTerms: 'picasso xsara' },
      {
        id: 'ct-c-elysee',
        label: 'C-Elysée (نفس 301)',
        stockModelId: 'pg-301',
        searchTerms: 'elysee elysee',
      },
      {
        id: 'ct-berlingo-2',
        label: 'Berlingo II (2008–2018)',
        stockModelId: 'pg-partner-orig',
        searchTerms: 'berlingo partner',
      },
      {
        id: 'ct-berlingo-1',
        label: 'Berlingo I (1996–2008)',
        stockModelId: 'pg-partner-an',
        searchTerms: 'berlingo ancien',
      },
    ],
  },
  {
    id: 'dacia',
    label: 'Dacia',
    logoUrl: '/brands/dacia.svg',
    models: [
      { id: 'dc-logan-nv', label: 'Logan II (2012–2020)', searchTerms: 'logan nouvelle' },
      {
        id: 'dc-logan-mcv',
        label: 'Logan MCV II',
        stockModelId: 'dc-logan-nv',
        searchTerms: 'mcv break',
      },
      {
        id: 'dc-sandero',
        label: 'Sandero / Stepway II (2012–2020)',
        stockModelId: 'dc-logan-nv',
        searchTerms: 'sandero stepway',
      },
    ],
  },
  {
    id: 'fiat',
    label: 'Fiat',
    logoUrl: '/brands/fiat.svg',
    models: [{ id: 'ft-doblo', label: 'Doblo III / Partner 2018+ (2022–)', searchTerms: 'doblo combo berlingo' }],
  },
];

/** اختصارات سريعة — أكثر موديلات يطلبها الزبائن في الجزائر */
export const POPULAR_VEHICLE_SHORTCUTS: Array<{
  label: string;
  brandId: string;
  modelId: string;
}> = [
  { label: 'Symbol', brandId: 'renault', modelId: 'rn-symbol-13' },
  { label: 'Partner', brandId: 'peugeot', modelId: 'pg-partner-orig' },
  { label: '206', brandId: 'peugeot', modelId: 'pg-206' },
  { label: 'Logan', brandId: 'dacia', modelId: 'dc-logan-nv' },
  { label: 'Clio 4', brandId: 'renault', modelId: 'rn-clio-4' },
  { label: '301', brandId: 'peugeot', modelId: 'pg-301' },
];

function findModel(modelId: string): { brand: CarBrandOption; model: CarModelOption } | null {
  for (const brand of CAR_CATALOG) {
    const model = brand.models.find((m) => m.id === modelId);
    if (model) return { brand, model };
  }
  return null;
}

export function getModelsForBrand(brandId: string): CarModelOption[] {
  return CAR_CATALOG.find((b) => b.id === brandId)?.models ?? [];
}

export function formatVehicleSelection(brandId: string, modelId: string): string {
  const brand = CAR_CATALOG.find((b) => b.id === brandId);
  const model = brand?.models.find((m) => m.id === modelId);
  if (!brand || !model) return '';
  return `${brand.label} — ${model.label}`;
}

/** نص الطلب — يبيّن المقاس المرجعي في المخزون إذا alias */
export function formatVehicleOrderNote(brandId: string, modelId: string): string {
  const display = formatVehicleSelection(brandId, modelId);
  if (!display) return '';

  const brand = CAR_CATALOG.find((b) => b.id === brandId);
  const model = brand?.models.find((m) => m.id === modelId);
  if (!model?.stockModelId) return display;

  const stock = findModel(model.stockModelId);
  if (!stock) return display;

  const stockLabel = formatVehicleSelection(stock.brand.id, stock.model.id);
  return `${display} → مخزون: ${stockLabel}`;
}

export function filterModelsForBrand(brandId: string, query: string): CarModelOption[] {
  const models = getModelsForBrand(brandId);
  const q = query.trim().toLowerCase();
  if (!q) return models;

  return models.filter((m) => {
    const haystack = `${m.label} ${m.searchTerms ?? ''}`.toLowerCase();
    return haystack.includes(q);
  });
}
