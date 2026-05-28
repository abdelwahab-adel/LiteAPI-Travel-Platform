/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Premium Luxury Hotels Static Database - Standalone Version
const hotelsData = [
  {
    id: 'hotel-royal-atlantis',
    name: 'أتلانتس ذا رويال دبي (Atlantis The Royal)',
    stars: 5,
    rating: 4.9,
    description: 'أعجوبة معمارية تقدم تجارب فائقة الفخامة على هلال نخلة جميرا. تحتوي على مسابح معلقة فوق الأفق ومطاعم حائزة على نجوم ميشلان وواحدة من كبرى قاعات السبا المائي الفاخر بقارة آسيا.',
    address: 'طريق الهلال، نخلة جميرا، دبي',
    city: 'دبي',
    country: 'الإمارات',
    countryCode: 'AE',
    coordinates: { lat: 25.1381, lng: 55.1278 },
    images: [
      'https://images.unsplash.com/photo-1542314831-236800d1c5d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['مركز عافية وسبا ملكي', 'مسابح إنفينيتي معلقة', 'إطلالة نخلة جميرا', 'إنترنت فائق السرعة', 'خدمة الطيار الخاص', 'شاطئ خاص بالكامل', 'ردهة كبار الشخصيات'],
    minPrice: 650,
    category: 'luxury',
    featured: true,
    availableUnits: 12,
    reviews: [
      { author: 'عبد الوهاب عادل', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', rating: 5, comment: 'تجربة فوق الخيال السبا مذهل والخدمة البلاتينية تشعرك كالملوك.', date: '21-05-2026' },
      { author: 'سارة الأحمد', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', rating: 4.9, comment: 'الإطلالة البانورامية للمسبح المعلق رائعة جداً، طاقم عمل ودود.', date: '18-05-2026' }
    ]
  },
  {
    id: 'hotel-palace-downtown',
    name: 'فندق ذا بالاس داون تاون دبي',
    stars: 5,
    rating: 4.8,
    description: 'يقع في قلب وسط مدينة دبي الكلاسيكي بإطلالة مباشرة على نافورة دبي وبرج خليفة. صُمم بأسلوب ريادي يمزج سحر القصور العربية التراثية مع الأناقة المستقبلية العصرية.',
    address: 'بوليفارد الشيخ محمد بن راشد، وسط مدينة دبي',
    city: 'دبي',
    country: 'الإمارات',
    countryCode: 'AE',
    coordinates: { lat: 25.1952, lng: 55.2755 },
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['إطلالة برج خليفة', 'بحيرة خاصة وحوض دافئ', 'سبا بأسلوب ملكي عربي', 'فطور بوفيه فرنسي', 'خدمة صف السيارات مجاناً'],
    minPrice: 380,
    category: 'most_booked',
    featured: true,
    availableUnits: 8,
    reviews: [
      { author: 'أحمد محمود', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80', rating: 4.8, comment: 'الموقع مذهل وحفلات الشاي والحلويات الشرقية ممتازة جداً.', date: '10-05-2026' }
    ]
  },
  {
    id: 'hotel-plaza-athenee',
    name: 'بلازا أثيني باريس (Hôtel Plaza Athénée)',
    stars: 5,
    rating: 4.9,
    description: 'صرح الضيافة الأسطوري يقع في جادة مونتين الراقية بباريس. يتميز بمظلاته الحمراء الشهيرة الموشحة بالأزهار وإطلالات حالمة ومباشرة على برج إيفل وتجهيزات الحمامات المطلية بالذهب الوردي.',
    address: '25 جادة مونتين، 75008 باريس',
    city: 'باريس',
    country: 'فرنسا',
    countryCode: 'FR',
    coordinates: { lat: 48.8667, lng: 2.3025 },
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['مركز عافية ديور هيلث سبا', 'إطلالة برج إيفل المفتوحة', 'مطعم حائز على 3 نجوم ميشلان', 'سائق خاص مجاني لوسط باريس', 'خدمة الخادم الشخصي'],
    minPrice: 790,
    category: 'luxury',
    featured: true,
    availableUnits: 5,
    reviews: [
      { author: 'إيفا مونتيل', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', rating: 5, comment: 'صرح باريسي حقيقي، السبا من ديور يبعث الطمأنينة الكاملة والوصول ميسر.', date: '14-05-2026' }
    ]
  },
  {
    id: 'hotel-mena-house',
    name: 'ماريوت مينا هاوس القاهرة',
    stars: 5,
    rating: 4.8,
    description: 'منتجع ملكي فخم يمتد على مساحة 40 فداناً من الحدائق الأندلسية الغناء تحت ظلال أهرامات الجيزة الخالدة مباشرة. يمزج التصميم العربي العتيق وأثاث القصور التاريخية بلمسات القرن الحادي والعشرين.',
    address: 'شارع الهرم، الجيزة، القاهرة',
    city: 'القاهرة',
    country: 'مصر',
    countryCode: 'EG',
    coordinates: { lat: 29.9856, lng: 31.1272 },
    images: [
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1585983224974-084a8e065e76?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['إطلالة بانوراميه للأهرامات', 'ملاعب غولف دولية', 'مسبح مدفأ في الهواء الطلق', 'نادي صحي وسبا فرعوني', 'بوفيه طعام شرقي وغربي فخم'],
    minPrice: 290,
    category: 'most_booked',
    featured: true,
    availableUnits: 15,
    reviews: [
      { author: 'ياسر الغامدي', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', rating: 4.8, comment: 'الاستيقاظ على منظر الهرم المعيب هو تجربة لا تنسى على الإطلاق.', date: '04-05-2026' }
    ]
  },
  {
    id: 'hotel-aman-tokyo',
    name: 'أمان طوكيو زِن (Aman Tokyo)',
    stars: 5,
    rating: 4.9,
    description: 'يحتل الطوابق العليا من برج أوتيماتشي بوسط العاصمة الإمبراطورية. صُمم بطراز زِد الياباني البسيط المعتمد على خشب الأرز والحجر الرمادي الداكن ليكون رئة للاسترخاء النفسي والنظرة الهادئة.',
    address: 'طوكيو، تشيودا-كو، أوتيماتشي',
    city: 'طوكيو',
    country: 'اليابان',
    countryCode: 'JP',
    coordinates: { lat: 35.6845, lng: 139.7645 },
    images: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['حمام أونسبن ياباني دافئ', 'حديقة زِن داخلية معلقة', 'مسبح لا نهائي بطول 30 متر وبانوراما مذهلة', 'تذوق أفخر الساكي والشاي الإمبراطوري', 'كبائن تدليك ملكية'],
    minPrice: 850,
    category: 'luxury',
    featured: true,
    availableUnits: 3,
    reviews: [
      { author: 'كوجي ناكامورا', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', rating: 5, comment: 'أرقى مكان لقضاء عزلة هادئة بطوكيو. المظهر الخارجي كالجبال المعبدة بالضباب.', date: '29-04-2026' }
    ]
  },
  {
    id: 'hotel-ritz-cairo',
    name: 'فندق ريتز كارلتون النيل القاهرة',
    stars: 5,
    rating: 4.7,
    description: 'موقع فريد في قلب وسط مدينة القاهرة يطل مباشرة على نهر النيل الخالد وعلى بعد خطوات من المتحف المصري القديم والتحرير. صرح فاخر يقصده الملوك ورؤساء الدول الزائرون.',
    address: '1113 كورنيش النيل، وسط البلد، القاهرة',
    city: 'القاهرة',
    country: 'مصر',
    countryCode: 'EG',
    coordinates: { lat: 30.0467, lng: 31.2312 },
    images: [
      'https://images.unsplash.com/photo-1549294413-26f195afcbdb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['إطلالات مباشرة لنهر النيل', 'صالة ألعاب كبرى وكازينو ريادي', 'سبا عالمي بمستخلصات طبيعية يدوية', 'صالة جلوس علوية بانورامية', 'سوق تبادل عملات ودليلي سياحي خاص'],
    minPrice: 320,
    category: 'trending',
    featured: false,
    availableUnits: 9,
    reviews: [
      { author: 'حامد الشمري', avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=100&q=80', rating: 4.6, comment: 'بوفيه العشاء على النيل لا يوصف والغرف مريحة وواسعة جداً.', date: '11-04-2026' }
    ]
  },
  {
    id: 'hotel-savoy-london',
    name: 'فندق ذا سافوي لندن (The Savoy)',
    stars: 5,
    rating: 4.8,
    description: 'يقع على الضفة الشمالية لنهر التايمز الشهير. يعتبر أحد أبرز قلاع البرستيج والضيافة التاريخية بالعاصمة البريطانية. شهد حفلات رسمية لكبار الساسة وشخصيات النخبة عبر مئة عام.',
    address: 'ستراند، لندن، WC2R 0EU',
    city: 'لندن',
    country: 'المملكة المتحدة',
    countryCode: 'GB',
    coordinates: { lat: 51.5101, lng: -0.1204 },
    images: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['إطلالات نهر التايمز الساحرة', 'مطعم سافوي غريل بإدارة غوردون رامزي', 'الحانة التاريخية الأمريكية الرسمية بالنخبة', 'خدمة النزهات النهرية الفخمة', 'دليل لندن للمتاحف والمسارح المكتمل'],
    minPrice: 520,
    category: 'trending',
    featured: true,
    availableUnits: 7,
    reviews: [
      { author: 'تشارلز دينس', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80', rating: 4.8, comment: 'عظمة واضحة في كل تفصيل، الفراش فخم وخدمة الشاي الإنجليزي الأفضل.', date: '12-05-2026' }
    ]
  },
  {
    id: 'hotel-oneandonly-maldives',
    name: 'منتجع ون آند أونلي المالديف (One&Only)',
    stars: 5,
    rating: 4.9,
    description: 'مجموعة من الفيلات الشاطئية الفاخرة الموزعة على جزر مرجانية خلابة بالمحيط الهندي. تقدم مستوى غير مسبوق من الخصوصية المطلقة مع مسابح لا متناهية خاصة تلامس مياه البحر الكريستالية مباشرة.',
    address: 'شمال مالي أتول، المالديف',
    city: 'المالديف',
    country: 'المالديف',
    countryCode: 'MV',
    coordinates: { lat: 4.7331, lng: 73.3644 },
    images: [
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['فيلات معلقة فوق سطح الماء', 'خدمة طهاة خاصين يعملون على مدار الساعة', 'مركز غوص واكتشاف شعاب تحت إرشاد خبراء', 'نقل بالطائرة البحرية أو الكروز الفاخر', 'تجارب طعام خاصة على الشواطئ البكر'],
    minPrice: 980,
    category: 'special_offer',
    featured: true,
    availableUnits: 4,
    reviews: [
      { author: 'ناصر بن حمد', avatar: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=100&q=80', rating: 5, comment: 'الجنة الاستوائية على الأرض. الخصوصية هنا 100% وتناسق الطبيعة ساحر.', date: '21-05-2026' }
    ]
  },
  {
    id: 'hotel-marina-hotel',
    name: 'فندق مارينا مارينا دبي',
    stars: 4,
    rating: 4.3,
    description: 'يقع بقلب مرسى دبي النابض بالصخب والنشاط. يوفر لضيوفه إطلالات بانورامية خلابة للمراسي وممرات العبور البحرية وجولات القوارب، مع غرف ذكية مواكبة لأحدث تقنيات المعيشة العصرية الراقية.',
    address: 'شارع المرصى، مرسى دبي، دبي',
    city: 'دبي',
    country: 'الإمارات',
    countryCode: 'AE',
    coordinates: { lat: 25.0768, lng: 55.1372 },
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1205&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1205&q=80'
    ],
    amenities: ['إطلالة كاملة لمرسى دبي', 'مسبح خارجي فسيح ودافئ', 'وصول مباشر للترام ومحطات المترو', 'شاشة تلفزيونية تفاعلية بالكامل', 'ردهة ترفيهية لرجال الأعمال'],
    minPrice: 160,
    category: 'budget',
    featured: false,
    availableUnits: 18,
    reviews: [
      { author: 'رامي منصور', avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=100&q=80', rating: 4, comment: 'موقع مثالي جداً لراغبي التسوق والرحلات الشاطئية، مناسب من حيث السعر الفخم.', date: '01-05-2026' }
    ]
  },
  {
    id: 'hotel-paris-jardins',
    name: 'فندق ليس جاردان دو لا تور بباريس',
    stars: 3,
    rating: 4.1,
    description: 'فندق بوتيكي وادع يتميز بأسلوبه الباريسي الدافئ، يقع في زوايا حي هادئ على بعد خطوات معدودة من برج إيفل وحدائق الشان دي مارس. يشتهر برائحة الكرواسان الفرنسي والمخبوزات البكر صباح كل يوم.',
    address: '12 شارع ليكسبوزيتون، 75007 باريس',
    city: 'باريس',
    country: 'فرنسا',
    countryCode: 'FR',
    coordinates: { lat: 48.8575, lng: 2.3033 },
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['المشي لبرج إيفل بدقائق معدودة', 'فطور كرواسان ومخبوزات باريس مجاناً', 'دعم الحفاظ البيئي الصديق للطبيعة', 'مستودع أمتعة آمن بالكامل', 'مكتبة كلاسيكية للمطالعة بالقاعة الرئيسية'],
    minPrice: 110,
    category: 'budget',
    featured: false,
    availableUnits: 20,
    reviews: [
      { author: 'ميشيل دوبونت', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', rating: 4.2, comment: 'جودة متميزة مقابل الكلفة وسرعة تفاعل الفريق باللغة الفرنسية والإنجليزية مذهلة.', date: '15-05-2026' }
    ]
  },
  {
    id: 'hotel-plaza-nyc',
    name: 'فندق بلازا نيويورك الأسطوري (The Plaza)',
    stars: 5,
    rating: 4.8,
    description: 'يقع في ناصية الجادة الخامسة البارزة وإطلالة كاملة على الحديقة المركزية "سنترال بارك". يعتبر مزاراً بحد ذاته لرفاهية الإقامة وسند باد غرف النوم ذات التفاصيل المذهبة وصالات الشامبانيا التاريخية.',
    address: '768 الجادة الخامسة، سنترال بارك، مانهاتن، نيويورك',
    city: 'نيويورك',
    country: 'أمريكا',
    countryCode: 'US',
    coordinates: { lat: 40.7644, lng: -73.9744 },
    images: [
      'https://images.unsplash.com/photo-1554009975-d74653b879f1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549046030-be001f70fb67?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['إطلالة مانهاتن والسنترال بارك المباشرة', 'صالون سبا غيرلان السويسري والفرنسية', 'صالون تدليل وغرف شاي كلاسيكية', 'خدمة السير والسيارات البلاتينية للجزيرة', 'بوفيه عشاء كافيار ومأكولات بحرية'],
    minPrice: 580,
    category: 'luxury',
    featured: true,
    availableUnits: 6,
    reviews: [
      { author: 'جون سميث', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80', rating: 4.7, comment: 'صرح يحمل برستيج لا يضاهى في نيويورك. تعامل الموظفين فائق اللياقة والسرعة.', date: '11-05-2026' }
    ]
  },
  {
    id: 'hotel-bali-ubud',
    name: 'فندق هانجينج جاردنز بالي (Hanging Gardens Ubud)',
    stars: 5,
    rating: 4.9,
    description: 'منتجع استوائي خيالي يتربع بوسط غابات أوبود المطيرة ببالي. يشتهر عالمياً بامتلاكه حوض سباحة لا متناهي مدرج مكون من مستويين بارتفاع شاهق فوق الغابات ليعطيك طاقة الاندماج الطبيعي الساحر.',
    address: 'حدائق بالي المعلقة، أوبود، بالي',
    city: 'بالي',
    country: 'إندونيسيا',
    countryCode: 'ID',
    coordinates: { lat: -8.4522, lng: 115.2233 },
    images: [
      'https://images.unsplash.com/photo-1542314831-236800d1c5d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['المسبح المدرج الأكثر شهرة عالمياً', 'مركز يوغا وتطهير روحي يومي', 'فيلات معلقة مع جاكوزي خاص دافئ', 'طعام عضوي بري من حصاد غابات بالي', 'استشارات وعافية صحية بنظام هولستي'],
    minPrice: 390,
    category: 'special_offer',
    featured: true,
    availableUnits: 8,
    reviews: [
      { author: 'رهف السديري', avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=100&q=80', rating: 5, comment: 'المسبح المدرج يجعلك تسبح كأنك طائر معلق فوق الغابات. طاقة المكان تجدد خلايا الروح.', date: '21-05-2026' }
    ]
  }
];

// Generate rates dynamically for any hotel in local storage / session simulated calculations
function generateRatesForPureHotel(hotelId, startDateStr, endDateStr, guestsNum) {
  const hotel = hotelsData.find(h => h.id === hotelId);
  if (!hotel) return [];

  const baseP = hotel.minPrice;
  const multiplier = guestsNum > 2 ? 1.25 : 1.0;

  return [
    {
      id: `${hotel.id}-rate-standard`,
      roomType: 'جناح ديلوكس كينج فاخر (Deluxe Royal King)',
      boardType: 'إقامة فقط بالصرح',
      cancellationPolicy: {
        type: 'free_cancellation',
        deadline: 'قبل 48 ساعة من الوصول مجاناً',
        penalty: 0
      },
      price: Math.round(baseP * multiplier),
      currency: 'USD',
      available: true
    },
    {
      id: `${hotel.id}-rate-suite`,
      roomType: 'جناح بانورامي رئوي كبار الشخصيات (Signature Executive Suite)',
      boardType: 'إقامة شامل فطور فرنسي فاخر',
      cancellationPolicy: {
        type: 'refundable',
        deadline: 'قبل 7 أيام مع رسوم مستردة مرجعية',
        penalty: 100
      },
      price: Math.round(baseP * 1.45 * multiplier),
      currency: 'USD',
      available: true
    },
    {
      id: `${hotel.id}-rate-presidential`,
      roomType: 'فيلا رئاسية خاصة مع معالجة مائية (Imperial Overwater Palace)',
      boardType: 'إقامة شامل فطور وغداء فاخر طازج (Half Board)',
      cancellationPolicy: {
        type: 'non_refundable',
        deadline: 'غير قابلة للإلغاء بعد الدفع للمخزون الحصري',
        penalty: 250
      },
      price: Math.round(baseP * 2.65 * multiplier),
      currency: 'USD',
      available: true
    }
  ];
}

// Global countries for fast mapping
const countriesData = [
  { code: 'AE', name: 'الإمارات' },
  { code: 'FR', name: 'فرنسا' },
  { code: 'EG', name: 'مصر' },
  { code: 'JP', name: 'اليابان' },
  { code: 'GB', name: 'المملكة المتحدة' },
  { code: 'US', name: 'أمريكا' },
  { code: 'MV', name: 'المالديف' },
  { code: 'ID', name: 'إندونيسيا' }
];

// Global cities with country mapping
const citiesData = [
  { id: 'AE-DXB', name: 'دبي', countryCode: 'AE' },
  { id: 'FR-PAR', name: 'باريس', countryCode: 'FR' },
  { id: 'EG-CAI', name: 'القاهرة', countryCode: 'EG' },
  { id: 'JP-TYO', name: 'طوكيو', countryCode: 'JP' },
  { id: 'GB-LON', name: 'لندن', countryCode: 'GB' },
  { id: 'US-NYC', name: 'نيويورك', countryCode: 'US' },
  { id: 'MV-MAL', name: 'المالديف', countryCode: 'MV' },
  { id: 'ID-BAL', name: 'بالي', countryCode: 'ID' }
];

// Exporting to browser window for index.html client access or other scripts
if (typeof window !== 'undefined') {
  window.hotelsData = hotelsData;
  window.countriesData = countriesData;
  window.citiesData = citiesData;
  window.generateRatesForPureHotel = generateRatesForPureHotel;
}
