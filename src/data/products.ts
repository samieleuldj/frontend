export type ProductReview = {
  name: string;
  city: string;
  text: string;
  initial: string;
  photo?: string;
  reviewImage?: string;
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
  requiresVehicleInfo?: boolean;
};

export const products: Product[] = [
  {
    id: 'thermal-massage-brace',
    name: 'جهاز تدليك حراري واهتزاز 3 في 1',
    description:
      'ودّع آلام المفاصل والعضلات! دعامة تدفئة + تدليك بالاهتزاز — تصلح للركبة، الكوع والكتف. شاشة رقمية، 3 مستويات حرارة واهتزاز، وشريط Velcro قابل للتعديل. راحة في البيت بدون عيادة.',
    price: 4200,
    oldPrice: 5900,
    badge: 'جديد 🔥',
    rating: 4.8,
    reviewCount: 94,
    images: [
      '/products/thermal-massage-brace/hero.png',
      '/products/thermal-massage-brace/after.png',
      '/products/thermal-massage-brace/before.png',
    ],
    beforeImage: '/products/thermal-massage-brace/before.png',
    afterImage: '/products/thermal-massage-brace/after.png',
    usageSteps: [
      'اختار المنطقة: ركبة، كوع أو كتف — ثبّت الدعامة بالشريط Velcro.',
      'شغّل الجهاز واختار مستوى الحرارة (منخفض في البداية).',
      'فعّل وضع الاهتزاز/التدليك حسب راحتك.',
      'استعمل 15–20 دقيقة في الجلسة — كرّر يومياً للنتيجة الأفضل.',
    ],
    problemText:
      'معاناة يومية مع آلام المفاصل: تصلّب الكتف، الركبة، المرفق أو أسفل الظهر — صعوبة في أبسط الحركات. كل يوم نفس التعب، وكل حركة تولّي ثقيلة.',
    solutionText:
      'راحة شاملة في جهاز واحد! تدفئة مريحة + تدليك ذكي + استعمالات متعددة — للركبة، الكتف، المرفق وأسفل الظهر. حرارة قابلة للتعديل، لاسلكي وقابل للشحن، وسهل الاستعمال في البيت.',
    features: [
      '3 في 1: ركبة + كتف + مرفق + أسفل الظهر',
      'تدفئة سريعة + تدليك بالاهتزاز — يريح العضلات والمفاصل',
      'شاشة LED + أزرار لمس — تحكم سهل في الحرارة والوضع',
      'لاسلكي وقابل للشحن — استعملو في أي بلاصة',
      'Velcro قابل للتعديل — يناسب مختلف المقاسات',
    ],
    reviews: [
      {
        name: 'Nadia H.',
        city: 'الجزائر',
        initial: 'ن',
        text: 'شريتو لركبة راجلي اللي يتألم من السلالم. الحرارة والاهتزاز يريحو بزاف. ساهل في الاستعمال.',
      },
      {
        name: 'Karim D.',
        city: 'وهران',
        initial: 'ك',
        text: 'نستعملو على الكتف بعد الخدمة قدام الحاسوب. فرق واضح من أول أسبوع. السعر معقول.',
      },
      {
        name: 'Salima M.',
        city: 'قسنطينة',
        initial: 'س',
        text: 'وصلني كامل مع الشاحن. جودة مليحة والتغليف محترم. COD يطمّن.',
      },
      {
        name: 'Amine R.',
        city: 'سطيف',
        initial: 'أ',
        text: '3 في 1 — استعملتو للركبة والكوع. خفيف وما ياخذش بلاصة. ننصح بيه.',
      },
    ],
  },
  {
    id: 'cellulite-device',
    name: 'جهاز إزالة السيلوليت والترهلات',
    description:
      'ودّعي السيلوليت والترهلات واسترجعي نعومة البشرة وقواماً مشدوداً بثقة. جهاز تدليك بالضغط السالب الذكي — نتائج ملحوظة مع الاستعمال المنتظم من 7 إلى 10 أيام، في بيتك وبدون عيادة.',
    price: 5900,
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
        name: 'Amel M.',
        city: 'الجزائر العاصمة',
        initial: 'أ',
        reviewImage: '/products/cellulite-device/reviews/review-unbox-green.png',
        text: 'وصلني اليوم والتغليف ياسر مليح. الجهاز أصلي وفيه الشاحن والكتيب وكلش. ما ندمتش على الشراء.',
      },
      {
        name: 'Yasmine K.',
        city: 'وهران',
        initial: 'ي',
        reviewImage: '/products/cellulite-device/reviews/review-usage-green.png',
        text: 'نستعملو كل ليلة 15 دقيقة على الفخذين. من بعد أسبوع لاحظت البشرة أنعم والسيلوليت خفّ. المداومة هي المفتاح.',
      },
      {
        name: 'Salima B.',
        city: 'قسنطينة',
        initial: 'س',
        reviewImage: '/products/cellulite-device/reviews/review-unbox-white.png',
        text: 'شريتو لخيتي، جا كامل مع الشاحن والفلاتر. التوصيل كان سريع واتصلو بيا للتأكيد قبل ما يوصل.',
      },
      {
        name: 'Houda R.',
        city: 'باتنة',
        initial: 'ه',
        reviewImage: '/products/cellulite-device/reviews/review-hand-white.png',
        text: 'خفيف في اليد وساهل الاستعمال في البيت. ما يتعبش وما يحتاجش عيادة. ننصح بيه أي وحدة.',
      },
    ],
  },
  {
    id: 'makeup-organizer-bag',
    name: 'حقيبة تنظيم المكياج الذكية مع مرآة LED',
    description:
      'ودّعي الفوضى كل صباح! حقيبة تنظيم المكياج بمرآة مضيئة LED، فواصل قابلة للتعديل، وحقيبة يد للسفر. الحقيبة تاتي بدون مكياج — المستحضرات في الصور للعرض فقط.',
    price: 5500,
    oldPrice: 6900,
    badge: 'جديد ✨',
    rating: 4.9,
    reviewCount: 64,
    images: [
      '/products/makeup-organizer-bag/hero.png',
      '/products/makeup-organizer-bag/solution.png',
      '/products/makeup-organizer-bag/problem.png',
    ],
    beforeImage: '/products/makeup-organizer-bag/problem.png',
    afterImage: '/products/makeup-organizer-bag/solution.png',
    usageSteps: [
      'افتحي الحقيبة وثبّتي الفواصل حسب حجم مستحضراتك.',
      'شغّلي إضاءة المرآة LED (3 درجات لون) للمكياج في أي وقت.',
      'رتّبي المنتجات في الأقسام — وصول سريع كل صباح.',
      'اغلقي الحقيبة واستعمليها كحقيبة يد للسفر أو في البيت.',
    ],
    problemText:
      'كل صباح نفس الفوضى؟ مكياج مبعثر، وقت ضائع في البحث عن المستحضرات، وتوتر قبل ما تخرجي. بدل ما تستمتعي بيومك، تضيعي وقتك في ترتيب الطاولة.',
    solutionText:
      'حقيبة تنظيم ذكية بمرآة LED مضيئة، فواصل قابلة للتعديل، وسعة كبيرة — كل مستحضراتك في مكان واحد، منظمة وجاهزة. مهم: الحقيبة تاتي بدون مكياج (المستحضرات في الصور للتوضيح فقط).',
    features: [
      'مرآة LED بإضاءة 3 ألوان — مكياج واضح في أي وقت',
      'فواصل قابلة للتعديل — تنظيم حسب حجم منتجاتك',
      'سعة كبيرة + حقيبة يد — مثالية للبيت والسفر',
      'الحقيبة تاتي بدون مكياج — تستلمي الحقيبة فقط',
    ],
    reviews: [
      {
        name: 'Ines M.',
        city: 'الجزائر',
        initial: 'إ',
        text: 'وصلتني منظمة ومرايا LED تخدم مليح. الحقيبة فاضية من المكياج كيما قالو — رتبت مستحضراتي فيها وولات طاولة نقية.',
      },
      {
        name: 'Lina K.',
        city: 'وهران',
        initial: 'ل',
        text: 'كنت نضيع وقت كل صباح. دابا كلش في بلاصتو. التوصيل سريع والتغليف مليح.',
      },
      {
        name: 'Samia R.',
        city: 'قسنطينة',
        initial: 'س',
        text: 'نستعملها للسفر وفي الدار. خفيفة وسهلة الحمل. ننصح بيها أي بنت.',
      },
    ],
  },
  {
    id: 'mini-clima-geant',
    name: 'Mini Clima Geant 3 في 1 — مكيف محمول',
    description:
      'مكيف هواء محمول من Géant Electronics — تبريد، ترطيب وتنقية الهواء في جهاز واحد. يعمل بـ USB، 3 سرعات، إضاءة LED، خزان ماء وانتعاش لساعات. مثالي للغرفة، المكتب والسفر.',
    price: 2900,
    oldPrice: 3900,
    badge: 'جديد ✨',
    rating: 4.8,
    reviewCount: 52,
    images: [
      '/products/mini-clima-geant/hero.png',
      '/products/mini-clima-geant/real-product.png',
      '/products/mini-clima-geant/led-blue.png',
      '/products/mini-clima-geant/led-red.png',
      '/products/mini-clima-geant/led-green.png',
    ],
    beforeImage: '/products/mini-clima-geant/problem.png',
    afterImage: '/products/mini-clima-geant/solution.png',
    usageSteps: [
      'املأ خزان الماء (ماء بارد = تبريد أقوى).',
      'وصّل الجهاز بـ USB (شاحن أو Power Bank).',
      'شغّل واختار السرعة (1، 2 أو 3) + الإضاءة إذا بغيت.',
      'وجّهه نحوك — انتعاش يدوم ساعات.',
    ],
    problemText:
      'الحرارة قاتلة النوم! مروحة عادية تنفخ هواء حار وما تخليكش ترتاح. ليلة صيفية لا تطاق، تعرق وتعب مستمر.',
    solutionText:
      'حل الحرارة في كل وقت! برودة منعشة وراحة تدوم. Mini Clima Geant 3 في 1 يبرد، يرطّب وينقّي الهواء. هواء بارد ومنعش، هادئ جداً، واستهلاك منخفض للطاقة.',
    features: [
      '3 في 1: تبريد + ترطيب + تنقية الهواء',
      '3 سرعات تهوية + إضاءة LED متعددة الألوان',
      'يعمل عبر USB — شاحن أو Power Bank',
      'خزان ماء — انتعاش لساعات',
      'خفيف ومحمول — منزل، مكتب، سفر',
      'Géant Electronics — استهلاك منخفض للطاقة',
    ],
    reviews: [
      {
        name: 'Karim B.',
        city: 'الجزائر',
        initial: 'ك',
        text: 'شريتو للمكتب، يبرد مليح مقارنة بالمروحة العادية. خفيف وما ياخذش بلاصة.',
      },
      {
        name: 'Nadia S.',
        city: 'وهران',
        initial: 'ن',
        text: 'نستعملو في غرفة النوم بالUSB. الهواء أنعم والحر أقل — راضية على السعر.',
      },
      {
        name: 'Omar T.',
        city: 'قسنطينة',
        initial: 'ع',
        text: 'جاني كامل مع الكابل. ساهل الاستعمال، ولادي حبوه في الصيف.',
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
  {
    id: 'hood-insulation-mat',
    name: 'موكا عازل تحت غطاء السيارة (Capot)',
    description:
      'عزل و حماية مثالية لمحرك سيارتك — يقلّل الحرارة في الصيف، يحمي من الصقيع في الشتاء، يخفّض ضجيج المحرك ويحمي الغطاء من الصدأ. طبقات عزل عالية الجودة، شكل أنيق تحت الكابو.',
    price: 3900,
    oldPrice: 5500,
    badge: 'جديد 🚗',
    rating: 4.9,
    reviewCount: 67,
    requiresVehicleInfo: true,
    images: ['/products/hood-insulation-mat/hero.png'],
    problemText:
      'في الصيف الحرارة تدخل للمقصورة، المحرك يتعب، وفي الشتاء السيارة ما تنوضش بسرعة. غطاء السيارة بدون حماية يتعرض للصدأ والتآكل مع الوقت.',
    solutionText:
      'موكا العازل يركّب تحت غطاء السيارة (الكابو) — يقلّل الحرارة، يخفّض الضجيج، يحمي من الصدأ، ويعطي مظهر أنيق. مناسب لأكثر من 20 ماركة سيارة.',
    usageSteps: [
      'اختار ماركة، موديل وسنة سيارتك في الفورم — نجهّزلك القطعة المناسبة.',
      'نظّف السطح الداخلي للغطاء قبل التركيب.',
      'ثبّت الموكا حسب ثقوب التثبيت الأصلية.',
      'تأكد أن الغطاء يغلق بشكل طبيعي بعد التركيب.',
    ],
    features: [
      'يقلّل الحرارة — يحمي المحرك من درجات الحرارة العالية',
      'يخفّض الضجيج — صوت المحرك أقل داخل المقصورة',
      'يحمي الغطاء من التآكل والصدأ — يطيل عمره',
      'لمسة جمالية — مظهر أنيق تحت الكابو',
      'طبقات عزل عالية الجودة — متينة وتدوم',
      'مناسب لـ Renault, Dacia, Peugeot, VW, Hyundai, Toyota وغيرها',
    ],
    reviews: [
      {
        name: 'Karim B.',
        city: 'الجزائر',
        initial: 'ك',
        text: 'تركبتها على Clio، فرق واضح في الحرارة داخل السيارة. جودة الموكا مليحة.',
      },
      {
        name: 'Sofiane M.',
        city: 'وهران',
        initial: 'س',
        text: 'شريتو لـ Dacia Logan، وصلني مقاس مناسب. التركيب ساهل.',
      },
      {
        name: 'Amine K.',
        city: 'قسنطينة',
        initial: 'أ',
        text: 'يخفّض الضجيج شوية ويحمي الكابو. COD يطمّن.',
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
    text: 'منتج أصلي وجودة مليحة. نرجع نشري من فيلورا ديزاد.',
  },
];
