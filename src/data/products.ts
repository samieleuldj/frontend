export type ProductReview = {
  name: string;
  city: string;
  text: string;
  initial: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  features: string[];
  images?: string[];
  beforeImage?: string;
  afterImage?: string;
  problemText?: string;
  solutionText?: string;
  usageSteps?: string[];
  videoFile?: string;
  videoPoster?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: ProductReview[];
};

export const products: Product[] = [
  {
    id: 'cellulite-device',
    name: 'جهاز إزالة السيلوليت والترهلات',
    description:
      'ودّعي السيلوليت والترهلات واسترجعي نعومة البشرة وقواماً مشدوداً بثقة. جهاز تدليك بالضغط السالب الذكي — نتائج ملحوظة مع الاستعمال المنتظم من 7 إلى 10 أيام، في بيتك وبدون عيادة.',
    price: 6499,
    oldPrice: 7900,
    badge: 'الأكثر طلباً 🔥',
    rating: 4.9,
    reviewCount: 186,
    images: [
      '/products/cellulite-device/hero.png',
      '/products/cellulite-device/product-box.png',
      '/products/cellulite-device/after.png',
    ],
    videoFile: '/products/cellulite-device/usage.mp4',
    videoPoster: '/products/cellulite-device/product-box.png',
    usageSteps: [
      'نظّفي وجفّفي المنطقة (فخذ، مؤخرة، بطن...) قبل الاستعمال.',
      'شغّلي الجهاز واختاري مستوى منخفض في البداية، ثم زيدي تدريجياً.',
      'مرّري الجهاز ببطء على الجلد 15 إلى 20 دقيقة في كل جلسة.',
      'كرّري يومياً لمدة 7 إلى 10 أيام — النتائج تبان مع المداومة.',
    ],
    beforeImage: '/products/cellulite-device/before.png',
    afterImage: '/products/cellulite-device/after.png',
    problemText:
      'السيلوليت والترهلات في الفخذين والمؤخرة والبطن... تخلّيكي ما ترتاحيش في ملابسك وتخسر الثقة في جسمك. الكريمات وحدها ما تكفيش — تحتاجي حل ينشّط الدورة الدموية ويشدّ الجلد من الداخل.',
    solutionText:
      'جهاز التدليك بالضغط السالب الذكي يكسر تراكم الدهون الموضعية، يحسّن ملمس السيلوليت، ويشدّ الجلد مع تحفيز الكولاجين. استعمليه 15–20 دقيقة يومياً ولاحظي الفرق خلال أسبوع إلى 10 أيام من المداومة.',
    features: [
      'نتائج ملحوظة مع المداومة من 7 إلى 10 أيام',
      'تدليك بالضغط السالب يحفّز الدورة الدموية والكولاجين',
      'يشدّ الجلد ويحسّن مظهر السيلوليت تدريجياً',
      'سهل الاستعمال في البيت — شاشة رقمية ومستويات متعددة',
    ],
    reviews: [
      {
        name: 'ندى ك.',
        city: 'الجزائر العاصمة',
        initial: 'ن',
        text: 'من بعد 10 أيام استعمال لاحظت الفخذين وليمتيهم أنعم بزاف. الجهاز ساهل وما يتعبش، والتوصيل كان سريع.',
      },
      {
        name: 'Karima B.',
        city: 'وهران',
        initial: 'ك',
        text: 'كنت خايفة نضيع فلوسي، لكن صراحة عجبني. البشرة تحسنات وترهلات خفّت. ننصح بيه أي وحدة.',
      },
      {
        name: 'Samira L.',
        city: 'قسنطينة',
        initial: 'س',
        text: 'شريتو لخيتي، جربتو في البيت كل يوم 15 دقيقة. النتيجة تبان تدريجياً، المهم المداومة.',
      },
    ],
  },
  {
    id: 'lumbar-belt',
    name: 'حزام شد الظهر القابل للنفخ',
    description:
      'تخلص من آلام أسفل الظهر مع تقنية الشد الهوائي المبتكرة. يوفر دعماً مثالياً لفقرات الظهر ويخفف الضغط على الغضاريف.',
    price: 6500,
    oldPrice: 8500,
    badge: 'الأكثر مبيعاً 🔥',
    rating: 4.8,
    reviewCount: 142,
    features: [
      'يخفف الضغط على الغضاريف القطنية',
      'مقاس قابل للتعديل يناسب الجميع',
      'يمكن ارتداؤه تحت الملابس',
      'مرفق بمضخة هواء يدوية سهلة الاستخدام',
    ],
    reviews: [
      {
        name: 'Amine B.',
        city: 'الجزائر العاصمة',
        initial: 'أ',
        text: 'المنتج وصلني في يومين، الجودة تاعو خير ملي كنت متوقع. ريحني بزاف في الخدمة كي نطول في القعاد.',
      },
      {
        name: 'Youcef M.',
        city: 'باتنة',
        initial: 'ي',
        text: 'كان عندي ألم في أسفل الظهر من السياقة. الحزام يشد مليح ويتحمل تحت القميص.',
      },
      {
        name: 'Rachid K.',
        city: 'سطيف',
        initial: 'ر',
        text: 'خدمة زبائن ممتازة، اتصلو بيا للتأكيد. المنتج أصلي ويعطي دعم حقيقي للظهر.',
      },
    ],
  },
  {
    id: 'car-cushion',
    name: 'وسادة الرقبة والظهر للسيارة',
    description:
      'سياقة مريحة بدون آلام. طقم وسائد ميموري فوم طبي يدعم الرقبة وأسفل الظهر خلال المسافات الطويلة.',
    price: 4900,
    oldPrice: 6500,
    badge: 'جديد ✨',
    rating: 4.7,
    reviewCount: 98,
    features: [
      'مصنوعة من الميموري فوم عالي الكثافة',
      'غطاء قابل للغسل ومضاد للتعرق',
      'تصميم طبي يدعم الانحناء الطبيعي',
      'سهلة التركيب في أي سيارة',
    ],
    reviews: [
      {
        name: 'Said H.',
        city: 'البليدة',
        initial: 'س',
        text: 'كنت نتعب بزاف كي نسوق من Blida للعاصمة. الوسادة بدّلاتلي السياقة، ما عنديش ألم في الرقبة.',
      },
      {
        name: 'Samira M.',
        city: 'وهران',
        initial: 'س',
        text: 'شريتو لراجلي كان يعاني من سطر الظهر كي يسوق مسافات طويلة. الحمد لله عجبو من النهار الأول.',
      },
      {
        name: 'Farid A.',
        city: 'عنابة',
        initial: 'ف',
        text: 'ميموري فوم حقيقي، ما يتflattenش بعد استعمال. التركيب ساهل في أي سيارة.',
      },
    ],
  },
  {
    id: 'orthopedic-pillow',
    name: 'وسادة النوم الطبية المريحة',
    description:
      'نوم عميق واستيقاظ بدون آلام رقبة. تصميم هندسي يدعم الانحناء الطبيعي للعمود الفقري.',
    price: 4800,
    oldPrice: 5200,
    rating: 4.8,
    reviewCount: 74,
    features: [
      'تصميم مريح يمنع الشخير',
      'ميموري فوم يتشكل مع الرأس والرقبة',
      'غطاء قطني ناعم ومريح',
      'مناسبة للنوم على الظهر أو الجنب',
    ],
    reviews: [
      {
        name: 'Leila T.',
        city: 'تيزي وزو',
        initial: 'ل',
        text: 'من نهار شريتها نومي تحسن بزاف. كنت نصحى بألم في الرقبة، دابا راحت.',
      },
      {
        name: 'Houda S.',
        city: 'المدية',
        initial: 'ه',
        text: 'وسادة ثقيلة وثابتة، ما تتحركش في الليل. الغطاء ناعم وقابل للغسل.',
      },
      {
        name: 'Meriem A.',
        city: 'بومرداس',
        initial: 'م',
        text: 'راجلي كان يشخر، من بعد الوسادة خف الشخير. ننصح بيها للنوم على الجنب.',
      },
    ],
  },
];

export const DEFAULT_REVIEWS: ProductReview[] = [
  {
    name: 'زبون مؤكد',
    city: 'الجزائر',
    initial: 'ز',
    text: 'خدمة ما شاء الله، التوصيل كان سريع والمنتج كيما في التصويرة.',
  },
  {
    name: 'زبون مؤكد',
    city: 'الجزائر',
    initial: 'ز',
    text: 'الدفع عند الاستلام يطمّن، اتصلو بيا للتأكيد بسرعة.',
  },
  {
    name: 'زبون مؤكد',
    city: 'الجزائر',
    initial: 'ز',
    text: 'منتج أصلي وجودة مليحة. نرجع نشري من كونفور ديزاد.',
  },
];
