/**
 * LITEAPI.TRAVEL ELITE - Core Application Engine
 * Pure Vanilla JS, HTML5, CSS3, Tailwind CSS & Lucide Icons
 */

// Global State
const state = {
    currentTab: 'portal', // 'portal' | 'member'
    isDarkMode: true,
    language: 'ar', // 'ar' | 'en'
    countries: [],
    cities: [],
    allHotels: [],
    hotels: [],
    wishedHotelIds: JSON.parse(localStorage.getItem('liteapi_wishlist') || '[]'),
    comparedHotels: [],
    bookings: [],
    activeCategory: 'all',
    
    // Search params
    selectedCountry: 'AE',
    selectedCity: '',
    startDate: '2026-06-15',
    endDate: '2026-06-20',
    guests: 2,
    currency: 'USD',

    // UI tracking state
    loadingStatic: false,
    loadingRates: false,
    hotelRates: {},
    activeHotelDetails: null,
    bookingRate: null,
    passenger: { firstName: '', lastName: '', email: '', phone: '' },
    cardDetails: { number: '', expiry: '', cvv: '', nameOnCard: '' },
    isSubmittingBooking: false,

    // Chatbot AI state
    chatMessages: [],
    isChatOpen: false,
    promoTimeLeft: { hours: 8, minutes: 45, seconds: 12 },

    // Tracking image sliders on grids
    hotelImageIndices: {}
};

// High-fidelity fallback Database (Offline mode)
const fallbackDatabase = {
    countries: [
        { code: 'AE', name: 'United Arab Emirates' },
        { code: 'EG', name: 'Egypt' },
        { code: 'JP', name: 'Japan' },
        { code: 'US', name: 'United States' },
        { code: 'FR', name: 'France' },
        { code: 'GB', name: 'United Kingdom' },
        { code: 'IT', name: 'Italy' }
    ],
    cities: [
        { id: 'US-NYC', name: 'New York', countryCode: 'US' },
        { id: 'FR-PAR', name: 'Paris', countryCode: 'FR' },
        { id: 'AE-DXB', name: 'Dubai', countryCode: 'AE' },
        { id: 'JP-TYO', name: 'Tokyo', countryCode: 'JP' },
        { id: 'GB-LON', name: 'London', countryCode: 'GB' },
        { id: 'EG-CAI', name: 'Cairo', countryCode: 'EG' }
    ],
    hotels: [
        {
            id: 'HOTEL-DXB-001',
            name: 'The Palace Downtown Dubai',
            stars: 5,
            rating: 4.8,
            description: 'Set in a traditional palatial residence, this luxury hotel overlooks Dubai Fountain and Burj Khalifa. It features a private lake, outdoor pool, Arabian-style spa and world-class dining.',
            address: 'Sheikh Mohammed bin Rashid Blvd, Downtown Dubai',
            city: 'Dubai',
            countryCode: 'AE',
            coordinates: { lat: 25.1952, lng: 55.2755 },
            images: [
                'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
            ],
            amenities: ['Spa & Wellness', 'Infinity Pool', 'Burj Khalifa View', 'Free WiFi', 'Fitness Center', 'Valet Parking', 'Fine Dining'],
            minPrice: 380
        },
        {
            id: 'HOTEL-DXB-002',
            name: 'Atlantis The Royal',
            stars: 5,
            rating: 4.9,
            description: 'An architectural masterpiece offering ultra-luxury experiences on the Palm Jumeirah. Boasting sky pools, multi-Michelin-starred restaurants, a massive aquarium, and standard-setting room design.',
            address: 'Crescent Rd, Palm Jumeirah, Dubai',
            city: 'Dubai',
            countryCode: 'AE',
            coordinates: { lat: 25.1381, lng: 55.1278 },
            images: [
                'https://images.unsplash.com/photo-1542314831-236800d1c5d8?auto=format&fit=crop&w=800&q=80'
            ],
            amenities: ['Waterpark Access', 'Michelin Restaurants', 'Rooftop Lounge', 'Helicopter Transfer', 'Private Beach', 'Hydrotherapy Spa'],
            minPrice: 650
        },
        {
            id: 'HOTEL-CAI-001',
            name: 'Marriott Mena House Cairo',
            stars: 5,
            rating: 4.8,
            description: 'Steeped in royal history, this premium hotel is set amidst 40 acres of lush gardens under the direct shadow of the Great Pyramids of Giza. It features luxurious oriental decor, custom pool, and history-rich halls.',
            address: '6 Pyramids Road, Giza, Cairo',
            city: 'Cairo',
            countryCode: 'EG',
            coordinates: { lat: 29.9856, lng: 31.1272 },
            images: [
                'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1585983224974-084a8e065e76?auto=format&fit=crop&w=800&q=80'
            ],
            amenities: ['Pyramid View', 'Historic Gardens', 'Golf Course', 'Heated Pool', 'Oriental Spa', 'Tennis Courts'],
            minPrice: 290
        },
        {
            id: 'HOTEL-TYO-001',
            name: 'Aman Tokyo',
            stars: 5,
            rating: 4.9,
            description: 'Occupying the top six floors of the Otemachi Tower, this urban sanctuary blends modern zen minimalism with historic Japanese design principles, and offers sweeping Imperial Garden vistas.',
            address: '1-5-6 Otemachi, Chiyoda-ku, Tokyo',
            city: 'Tokyo',
            countryCode: 'JP',
            coordinates: { lat: 35.6845, lng: 139.7645 },
            images: [
                'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80'
            ],
            amenities: ['Imperial Garden View', 'Traditional Onsen Bath', 'Indoor lap pool', 'Zen Garden Atrium', 'Sake Lounge'],
            minPrice: 850
        },
        {
            id: 'HOTEL-NYC-001',
            name: 'The Plaza Hotel New York',
            stars: 5,
            rating: 4.8,
            description: 'At the corner of Fifth Avenue and Central Park South, this world-renowned luxury landmark provides absolute elegance, butler service, Champagne Room, and golden bath fixtures.',
            address: '768 5th Ave, New York, NY 10019',
            city: 'New York',
            countryCode: 'US',
            coordinates: { lat: 40.7644, lng: -73.9744 },
            images: [
                'https://images.unsplash.com/photo-1554009975-d74653b879f1?auto=format&fit=crop&w=800&q=80'
            ],
            amenities: ['Central Park View', 'Guerlain Spa', 'Champagne Bar', 'Butler Service', 'Historic Palm Court'],
            minPrice: 580
        },
        {
            id: 'HOTEL-PAR-001',
            name: 'Hôtel Plaza Athénée',
            stars: 5,
            rating: 4.9,
            description: 'Located on the prestigious Avenue Montaigne, the hotel features a Dior Institution Spa, iconic red awnings, Eiffel Tower views, and stunning classic French master suites.',
            address: '25 Avenue Montaigne, 75008 Paris',
            city: 'Paris',
            countryCode: 'FR',
            coordinates: { lat: 48.8667, lng: 2.3025 },
            images: [
                'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80'
            ],
            amenities: ['Eiffel Tower View', 'Dior Spa', 'Courtyard Garden', 'Michelin Restaurant', 'Chauffeur Service'],
            minPrice: 790
        }
    ]
};

// Initial simulated bookings representation 
const initialMockBookings = [
    {
        id: 'BK-2026-9901',
        hotelId: 'HOTEL-DXB-002',
        hotelName: 'Atlantis The Royal',
        hotelStars: 5,
        hotelImage: 'https://images.unsplash.com/photo-1542314831-236800d1c5d8?auto=format&fit=crop&w=600&q=80',
        hotelAddress: 'Crescent Rd, Palm Jumeirah, Dubai',
        rateId: 'rt_hotel-dxb-002_suite_bb',
        roomType: 'Signature Panoramic Suite',
        boardType: 'Bed & Breakfast',
        checkIn: '2026-06-15',
        checkOut: '2026-06-20',
        amount: 3250,
        currency: 'USD',
        status: 'confirmed',
        guestDetails: {
            firstName: 'Abdelwahab',
            lastName: 'Adel',
            email: 'abdelwahabadel777@gmail.com',
            phone: '+971 50 123 4567'
        },
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
    }
];

// Translations dictionary
const translations = {
    ar: {
        tickerText: "بوابة النخبة للضيافة الملكية الفاخرة المعتمدة",
        tickerPromo: "خصم فوري 20% لكود العضوية البلاتينية: ELITE20",
        tickerStatus: "مزامنة مباشرة كاملة مع بروتوكول LiteAPI",
        portalTab: "البوابة العامة",
        memberTab: "لوحة العضو",
        gatewayText: "بوابة خوادم لايت إيه بي آي",
        stableSecure: "مستقر ومؤمن 100%",
        vipBadge: "العضوية الممتازة",
        heroTag: "بوابة الضيافة الملكية الاستثنائية",
        heroTitle: "احجز رحلتك الفاخرة بلمسة ذهبية بالغة الرقي",
        heroDesc: "بوابة فندقية ملكية مستقلة متزامنة مباشرة مع بروتوكولات LiteAPI Travel الفورية، مصممة بتجربة زجاجية غنية مستوحاة من Booking و Airbnb لتأمين حجز أسطوري مضمون بالملي ثانية.",
        sticker1: "حجوزات معتمدة فوراً",
        sticker2: "حماية استرداد مضمونة",
        sticker3: "مستويات 5 نجوم ملكية",
        searchTitle: "استكشاف الغرف المتوفرة والأسعار المباشرة",
        searchSub: "أدخل تواريخك المفضلة للمزامنة الفورية مع خوادم LiteAPI الفعالة.",
        labelCountry: "الدولة الشريكة",
        labelCity: "المدينة المستهدفة",
        labelCheckin: "موعد النزول",
        labelCheckout: "موعد المغادرة",
        searchBtn: "الأسعار الفورية",
        geoTitle: "الوجهات الملكية الموصى بها للتصفح السريع",
        geoSub: "اضغط على أي رمز جغرافي أدناه لمزامنة خريطة الـ API وتحميل صروحها فوراً.",
        wishlistShowroomTitle: "المفضلة الملكية الفاخرة النشطة",
        wishlistShowroomDesc: "لقد حفظت صروح الإقامة هذه في رصيد المعاينة. جاهزة للمقارنة أو الحجز الفوري في أي ليلة.",
        wishlistShowroomBtn: "عرض المفضلة الملكية",
        hotelsCount: "0 فندق شريك يطابق شروط الفلترة",
        availHotelsTitle: "صروح الضيافة والمنتجعات الاستثنائية المتاحة",
        availHotelsSub: "غرف شاغرة مدعومة مباشرة، مرتبة ومجهزة بخصومات بلاتينية خاصة.",
        mapLabelTitle: "الرصد الجغرافي وخارطة الصروح الذكية",
        mapLabelDesc: "تخطيط فوري لجميع فنادق دبي، طوكيو، والقاهرة على إحداثيات محددة. اضغط على الدوائر للمعاينة.",
        emptyTitle: "لا توجد فنادق شاغرة مطابقة حالياً",
        emptySub: "لم نجد صروح متوافقة. يرجى إعادة تعيين خيار الفلترة أو التواريخ أو اختيار إحدى الوجهات الموصى بها بالأعلى للاستكشاف.",
        shieldBoxTitle: "ضمان قسائم الحجز الآمن",
        shieldBoxDesc: "جميع العمليات مؤمنة بالتشفير البنكي الكامل ومحمية بالدخول المشفر لضمان غرفك الفندقية بملايين المعاملات بالتكامل مع LiteAPI Travel.",
        compareWorkspaceBtn: "تصغير الجدول",
        compareTableTitle: "منظومة وتفريد مقارنة الفنادق والصروح الفاخرة المضافة",
        compareHeaderFeature: "الميزة / الصرح",
        nightsSuffix: " ليالٍ",
        tripsSuffix: " رحلة",
        loyaltyTagText: "الملكية النخبة",
        loyaltyCardNoAr: "رقم العضوية: 5501 2291 9904",
        fidelityPointsAr: "12,400 نقطة فندقية",
        fidelityTargetAr: "متبقي 2,600 نقطة فقط للترقية الفورية لمستوى الماسي النخبة",
        statsTagAr: "إحصاءات الإقامة والنشاط",
        totalTripsAr: "إجمالي الرحلات",
        totalNightsAr: "الليالي المحجوزة",
        loyaltyNoteAr: "تدرج وتضاف نقاط العضوية ومكافآت الاسترداد فوراً عند إجراء Check-In في الفندق المعتمد.",
        savedTitleLabelAr: "الوجهات المفضلة المحفوظة",
        recordsTitleAr: "سجل ومعاينة تذاكر الحجوزات",
        recordsSubAr: "عرض وطباعة سند الحجز الفوري، الاستردادات، وإصدار فواتير القيمة المضافة لجميع الفنادق.",
        refreshBtnAr: "تحديث السجل من القنوات",
        noBookingsTitleAr: "لا توجد حركات حجز مسجلة بنزعك",
        noBookingsSubAr: "تصفح البوابة الفندقية العامة لتفعيل مسارات الفنادق واستعلام المعروض المباشر وتجربة إطلاق معاملة حجز حقيقية.",
        philosophyLabel: "رؤية المنصة الفلسفية للصرح الفندقي",
        amenitiesLabel: "الامتيازات والمرافق المشمولة بالمنتجع الملكي",
        liveVacanciesLabel: "خيارات الأجنحة والغرف الشاغرة المتوفرة حالياً بالمنصة",
        ratesPendingTitle: "أسعار التواريخ معلقة",
        ratesPendingSub: "يرجى الضغط على زر الاستعلام بالأعلى لتشغيل Endpoints ومزامنة الغرف والأسعار حالياً.",
        ratesPendingBtn: "تفعيل التسعير الفوري بالمنصة",
        exclusiveScore: "نقاط الجودة الحصرية",
        latCoords: "الإحداثي الشمالي Lat",
        lngCoords: "الإحداثي الشرقي Lng",
        sealTitle: "ضمان الامتياز السيادي",
        sealDesc: "تضمن لك المنصة أفضل عروض الأسعار المسحوبة من نظام الحجز الفوري مع ميزات حجز آمنة تلغي هامش الأخطاء الفنية التقليدية.",
        fullscreenGalleryLabel: "المعرض الغامر للشاشة",
        closeGalleryBtn: "إغلاق المعرض",
        shareDialogTitle: "مشاركة ركن الضيافة هذا",
        shareDialogSub: "انشر هذا الجناح مع عائلتك أو الـ VIP لترتيبات النزول المشترك.",
        labelShareLink: "الرابط التفاعلي المؤقت للمشهد",
        btnCopyShareLink: "نسخ الرابط",
        wizardTitle: "توثيق بيانات النزلاء وتأمين الحجز السريع",
        wizardSub: "أدخل الهوية والتفاصيل المالية لإجراء الحجز اللحظي عبر خوادم LiteAPI.",
        guestProfileTitle: "1. تفاصيل النزيل ومسؤول الاتصال",
        labelFirstname: "الاسم الأول (إنجليزية كما بجواز السفر)",
        labelLastname: "الاسم الأخير للعائلة (إنجليزية)",
        labelEmail: "البريد الإلكتروني المعتمد لتسليم القسيمة",
        labelPhone: "رقم هاتف الجوال الموثق",
        billingTitle: "2. تفويض الائتمان والتمويل المضمون",
        labelCardNumber: "رقم بطاقة الائتمان (أمان معتمد)",
        labelCardExpiry: "تاريخ انتهاء البطاقة (MM/YY)",
        labelCardCvv: "رمز الضمان CVV",
        btnConfirmBooking: "تأكيد تفويض الحجز المضمون بالمنصة",
        digitalVoucherTitle: "سند قيد وإثبات حجز الغرفة الفندقية - VOUCHER",
        certifiedVoucherStatus: "مدفوع ومؤكد كلياً بمخزون LiteAPI المباشر",
        voucherContactName: "المسافر والنزيل الأساسي:",
        voucherContactEmail: "البريد الإلكتروني للنزيل:",
        voucherContactPhone: "الهاتف:",
        voucherEstate: "صرح الضيافة والفندق:",
        voucherRoom: "جناح وغرفة الإقامة:",
        voucherBoard: "الوجبة والامتياز:",
        voucherPeriod: "فترة الحجز المعتمدة:",
        voucherSum: "مجموع المستخلص المالي المدفوع:",
        captionSign: "تمت صياغتها بعناية بتصميم عصري فخم وسرد دقيق للمسارات وسرعة جلب فائقة لبيانات الضيافة.",
        notificationWished: "تمت إضافة الصرح إلى قائمة المفضلة الملكية الخاصة بك بنجاح!",
        notificationUnwished: "تمت إزالة الفندق من قائمة المفضلة لديك.",
        notificationBookingOk: "قد تم الحجز والمصادقة اللحظية بنجاح! تم إصدار قسيمة التذكرة.",
        notificationCompareFull: "عذراً، يمكنك مقارنة حد أقصى 3 فنادق معاً."
    },
    en: {
        tickerText: "Noble Elite Sovereign Hospitality Portal Certified",
        tickerPromo: "Exclusive 20% off for Platinum Members using Promo Code: ELITE20",
        tickerStatus: "Instantly synchronized with LiteAPI Travel standard servers",
        portalTab: "Public Portal",
        memberTab: "Member Board",
        gatewayText: "LiteAPI Gateway Link",
        stableSecure: "Stable & Secure 100%",
        vipBadge: "Platinum VIP Status",
        heroTag: "Sovereign Elite Premium Hospitality",
        heroTitle: "Reserve Your Premium Room With Golden High Elegance",
        heroDesc: "An independent hotel sanctuary dynamically connected to LiteAPI Travel API, meticulously engineered with standard glassy frames to lock down immediate bookings.",
        sticker1: "Certified Immediate Bookings",
        sticker2: "Sovereign Cashback Shielded",
        sticker3: "Perfect 5-Star Nobility Standards",
        searchTitle: "Request Live Availability Rates & Rooms",
        searchSub: "Provide dates to instant-fetch rates from direct LiteAPI networks.",
        labelCountry: "Partner Enterprise Country",
        labelCity: "Destination District",
        labelCheckin: "Check-in Schedule",
        labelCheckout: "Check-out Schedule",
        searchBtn: "Check Live Rates",
        geoTitle: "Royal Recommendation Destination Nodes",
        geoSub: "Click any geographic preset node below to lock map focus and search.",
        wishlistShowroomTitle: "Active Sovereign Guest Wishlist",
        wishlistShowroomDesc: "Your pinned premium destinations are safely locked here. Easily checkout any booking below.",
        wishlistShowroomBtn: "View Royal Wishlist",
        hotelsCount: "0 hospitality estates match search",
        availHotelsTitle: "Available Lodgings & Verified Estates",
        availHotelsSub: "Live open rooms with complimentary Platinum loyalty deductions.",
        mapLabelTitle: "Spatial Tracker & Interactive Hotel Map",
        mapLabelDesc: "Visualizes hotels in Dubai, Cairo, Paris, Tokyo, and London. Tap pins to preview.",
        emptyTitle: "No Hospitality Estates Found Match Criteria",
        emptySub: "We couldn't locate matching estates. Reset date formats, search options or select recommended nodes above to browse.",
        shieldBoxTitle: "PCI Compliant Transaction Gateways",
        shieldBoxDesc: "All transactions are fully shielded under absolute encryption standards aligned with direct LiteAPI architectures.",
        compareWorkspaceBtn: "Close Table",
        compareTableTitle: "Luxury Escape Comparison Matrix",
        compareHeaderFeature: "Quality Metric / Estate",
        nightsSuffix: " nights",
        tripsSuffix: " escapes",
        loyaltyTagText: "Elite Monarch",
        loyaltyCardNoAr: "Sovereign Member ID: 5501 2291 9904",
        fidelityPointsAr: "12,400 Loyalty Points Balance",
        fidelityTargetAr: "Just 2,600 loyalty points to upgrade to Royal Diamond Tier",
        statsTagAr: "Historic Activity & Booking Logs",
        totalTripsAr: "Escapes Registered",
        totalNightsAr: "Nights Certified",
        loyaltyNoteAr: "Fidelity points and rewards automatically compile upon checking in to verified accommodations.",
        savedTitleLabelAr: "Saved Private Escapes",
        recordsTitleAr: "Booking Ticket Registry & Invoices",
        recordsSubAr: "Instantly print digital vouchers, view historic room invoices, and trace cancellation statuses.",
        refreshBtnAr: "Sync Server Records",
        noBookingsTitleAr: "No Registered Living Contracts Spotted",
        noBookingsSubAr: "Browse our public portal directory to create your primary room check-in voucher.",
        philosophyLabel: "Curator's Sovereign Vision",
        amenitiesLabel: "Highlighted Amenities & Included Utilities",
        liveVacanciesLabel: "Live Available Room Vacancies & Tarifs",
        ratesPendingTitle: "Availability query pending",
        ratesPendingSub: "Please click dates check search above to unlock rates dynamically.",
        ratesPendingBtn: "Activate Direct Live Pricing",
        exclusiveScore: "Lounge Quality Score",
        latCoords: "North Lat Coordinate",
        lngCoords: "East Lng Coordinate",
        sealTitle: "Monarch Certified Guarantee",
        sealDesc: "Ensures the absolute lowest rates processed directly from LiteAPI live server networks.",
        fullscreenGalleryLabel: "Immersive Fullscreen Slide",
        closeGalleryBtn: "Close Showcase",
        shareDialogTitle: "Share This Property",
        shareDialogSub: "Send this suite's particulars to family or business partners.",
        labelShareLink: "Encrypted Share Link Header",
        btnCopyShareLink: "Copy Workspace Url",
        wizardTitle: "Primary Guest Identification & Funding",
        wizardSub: "Specify guest passports and credit details to lock down room acquisitions.",
        guestProfileTitle: "1. Guest Information",
        labelFirstname: "First Name (matching passport details)",
        labelLastname: "Last Name (Family / Surname)",
        labelEmail: "Confirm Email for Digital Pass",
        labelPhone: "Mobile Contact Code",
        billingTitle: "2. Authorized Security Card Settlement",
        labelCardNumber: "Secured Credit Card (Authorized Auth)",
        labelCardExpiry: "Card Expiry Date (MM/YY)",
        labelCardCvv: "CVV Security Code",
        btnConfirmBooking: "Confirm Suite Allocation Securely",
        digitalVoucherTitle: "Certified Room Acquisition Voucher - VIP PASS",
        certifiedVoucherStatus: "✓ Paid & Guaranteed via direct LiteAPI servers",
        voucherContactName: "Primary Sovereign Traveler:",
        voucherContactEmail: "Allocated email handle:",
        voucherContactPhone: "Contact phone:",
        voucherEstate: "Host Hospitality Estate:",
        voucherRoom: "Suite specification room:",
        voucherBoard: "Included cuisine plan:",
        voucherPeriod: "Approved check-in schedule:",
        voucherSum: "Gross Payment Certified:",
        captionSign: "Crafted meticulously with modular layouts, responsive structures, and rapid static API response channels.",
        notificationWished: "Estates pinned to your elite favorites index successfully!",
        notificationUnwished: "Estates removed from your pins.",
        notificationBookingOk: "Booking contract successfully signed! Certificate has been generated.",
        notificationCompareFull: "You can compare up to 3 hotels maximum simultaneously."
    }
};

// Log logger array
const systemLogs = [];

// Logger utility helper
function logAction(method, endpoint, status, duration, detail = "") {
    const timestamp = new Date().toISOString();
    const logItem = `[${timestamp}] ${method} ${endpoint} - Status: ${status} in ${duration}ms. ${detail}`;
    systemLogs.unshift(logItem);
    
    // Render logs
    const container = document.getElementById('platform-logs-container');
    if (container) {
        container.innerHTML = systemLogs.map(l => `<div class="py-1 border-b border-slate-900/40 font-mono text-[10.5px]">${l}</div>`).join('');
    }
}

// Global UI Language helpers
function t(key) {
    const activeDict = translations[state.language];
    return activeDict[key] || key;
}

// -------------------------------------------------------------
// Core Initialization & API integrations
// -------------------------------------------------------------
window.addEventListener('DOMContentLoaded', async () => {
    // 1. Initial Local Bookings setups
    const localBookings = localStorage.getItem('liteapi_bookings');
    if (localBookings) {
        state.bookings = JSON.parse(localBookings);
    } else {
        state.bookings = [...initialMockBookings];
        localStorage.setItem('liteapi_bookings', JSON.stringify(state.bookings));
    }

    // 2. Load API static configuration or Fallback immediately
    await initializeData();
    
    // 3. Set up event bindings
    setUpListeners();

    // 4. Set default date ranges (starting in 2026 as per setup)
    document.getElementById('search-checkin').value = state.startDate;
    document.getElementById('search-checkout').value = state.endDate;

    // 5. Build components
    syncView();
    updateThemeUI();
    
    // Turn off cinema loader
    setTimeout(() => {
        const loader = document.getElementById('booting-loader');
        if (loader) loader.classList.add('opacity-0', 'pointer-events-none');
        showToast(state.language === 'ar' ? 'تم تأمين الاتصال بنجاح مع خوادم لايت إيه بي آي' : 'Encrypted direct LiteAPI pipelines established successfully', 'info');
    }, 600);

    // Initial countdown tick
    startCountdown();
});

// Load static dictionaries
async function initializeData() {
    state.loadingStatic = true;
    const startTime = Date.now();
    try {
        logAction('GET', '/api/liteapi/static/countries', 200, 10, 'Fetching countries list...');
        // Let's call our fallback instantly but try server proxy
        const countriesRes = await fetch('/api/liteapi/static/countries').then(r => r.json()).catch(() => fallbackDatabase);
        
        state.countries = countriesRes.countries || fallbackDatabase.countries;
        
        // Load default UAE cities
        const citiesRes = await fetch(`/api/liteapi/static/countries/AE/cities`).then(r => r.json()).catch(() => {
            return { cities: fallbackDatabase.cities.filter(c => c.countryCode === 'AE') };
        });
        state.cities = citiesRes.cities || fallbackDatabase.cities.filter(c => c.countryCode === 'AE');

        // Load all hotels list
        const hotelsRes = await fetch('/api/liteapi/static/hotels?countryCode=AE').then(r => r.json()).catch(() => {
            return { hotels: fallbackDatabase.hotels.filter(h => h.countryCode === 'AE') };
        });
        state.allHotels = hotelsRes.hotels || fallbackDatabase.hotels;
        state.hotels = [...state.allHotels];

        logAction('GET', '/api/liteapi/static/hotels', 200, Date.now() - startTime, `Loaded ${state.hotels.length} luxury hotel nodes over proxy.`);
    } catch (err) {
        console.warn('Backend proxy offline, engaging absolute standalone client simulator.');
        state.countries = [...fallbackDatabase.countries];
        state.cities = fallbackDatabase.cities.filter(c => c.countryCode === 'AE');
        state.allHotels = fallbackDatabase.hotels.filter(h => h.countryCode === 'AE');
        state.hotels = [...state.allHotels];
        logAction('CLIENT', 'LOCAL_FALLBACK', 200, 5, 'Standalone sandbox dataset mounted.');
    } finally {
        state.loadingStatic = false;
        renderCitiesDropdown();
    }
}

// Dynamically populate city selectors on state variations
function renderCitiesDropdown() {
    const citySelect = document.getElementById('search-city');
    citySelect.innerHTML = `<option value="">${state.language === 'ar' ? 'جميع المدن المستهدفة' : 'All Regional Districts'}</option>`;
    state.cities.forEach(city => {
        citySelect.innerHTML += `<option value="${city.name}">${city.name}</option>`;
    });
}

// -------------------------------------------------------------
// Interactive Events Handlers
// -------------------------------------------------------------
function setUpListeners() {
    // Nav links
    document.getElementById('nav-tab-portal').addEventListener('click', () => switchTab('portal'));
    document.getElementById('nav-tab-member').addEventListener('click', () => switchTab('member'));
    document.getElementById('nav-logo').addEventListener('click', () => switchTab('portal'));

    // Toggles
    document.getElementById('btn-language-switcher').addEventListener('click', toggleLanguage);
    document.getElementById('btn-theme-toggler').addEventListener('click', toggleTheme);
    document.getElementById('btn-login-trigger').addEventListener('click', openLoginModal);

    // Search handles
    document.getElementById('search-country').addEventListener('change', async (e) => {
        const countryCode = e.target.value;
        state.selectedCountry = countryCode;
        const startTime = Date.now();
        // Dynamic fetch cities
        try {
            const citiesRes = await fetch(`/api/liteapi/static/countries/${countryCode}/cities`).then(r => r.json()).catch(() => {
                return { cities: fallbackDatabase.cities.filter(c => c.countryCode === countryCode) };
            });
            state.cities = citiesRes.cities || [];
            
            // fetch regional list of hotels
            const hotelsRes = await fetch(`/api/liteapi/static/hotels?countryCode=${countryCode}`).then(r => r.json()).catch(() => {
                return { hotels: fallbackDatabase.hotels.filter(h => h.countryCode === countryCode) };
            });
            state.allHotels = hotelsRes.hotels || [];
            state.hotels = [...state.allHotels];
            
            logAction('GET', `/api/liteapi/static/hotels?countryCode=${countryCode}`, 200, Date.now() - startTime, `Refreshed country ${countryCode}.`);
        } catch (err) {
            state.cities = fallbackDatabase.cities.filter(c => c.countryCode === countryCode);
            state.allHotels = fallbackDatabase.hotels.filter(h => h.countryCode === countryCode);
            state.hotels = [...state.allHotels];
        }
        renderCitiesDropdown();
        filterHotels();
    });

    document.getElementById('search-city').addEventListener('change', (e) => {
        state.selectedCity = e.target.value;
        filterHotels();
    });

    // Date handles
    document.getElementById('search-checkin').addEventListener('change', (e) => {
        state.startDate = e.target.value;
        validateDates();
    });
    document.getElementById('search-checkout').addEventListener('change', (e) => {
        state.endDate = e.target.value;
        validateDates();
    });

    // Preset location buttons
    document.querySelectorAll('[data-city-preset]').forEach(el => {
        el.addEventListener('click', async () => {
            const city = el.getAttribute('data-city-preset');
            const country = el.getAttribute('data-country-preset');
            
            document.getElementById('search-country').value = country;
            state.selectedCountry = country;
            
            const eventTrigger = new Event('change');
            document.getElementById('search-country').dispatchEvent(eventTrigger);
            
            setTimeout(() => {
                document.getElementById('search-city').value = city;
                state.selectedCity = city;
                filterHotels();
                showToast(state.language === 'ar' ? `جاري الانتقال لمركز: ${city}` : `Navigating coordinates index to: ${city}`, 'info');
            }, 500);
        });
    });

    // Filter categories tabs
    document.querySelectorAll('#filter-tabs-container button').forEach(el => {
        el.addEventListener('click', () => {
            state.activeCategory = el.getAttribute('data-cat');
            document.querySelectorAll('#filter-tabs-container button').forEach(b => {
                b.className = "px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer border border-transparent text-slate-400 hover:text-slate-200";
            });
            el.className = "px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer border border-amber-500/10 bg-slate-900 text-amber-400";
            filterHotels();
        });
    });

    // Shortcut wishlist showroom
    document.getElementById('btn-wishlist-filter-shortcut').addEventListener('click', () => {
        const wishTab = document.querySelector('[data-cat="wishlist"]');
        if (wishTab) wishTab.click();
    });

    // Search submit trigger
    document.getElementById('search-form').addEventListener('submit', (e) => {
        e.preventDefault();
        fetchLiveRoomRates();
    });

    // Compare widget closure
    document.getElementById('compare-workspace-close').addEventListener('click', () => {
        document.getElementById('compare-workspace').classList.add('scale-0');
    });

    // Detail modal closures
    document.getElementById('btn-close-details').addEventListener('click', () => {
        document.getElementById('hotel-details-modal').classList.add('hidden');
    });

    // Absolute detail triggered live query
    document.getElementById('btn-details-trigger-ratesearch').addEventListener('click', () => {
        fetchLiveRoomRates();
    });

    // Booking modals handles
    document.getElementById('btn-close-booking-modal').addEventListener('click', () => {
        document.getElementById('booking-modal').classList.add('hidden');
    });

    document.getElementById('booking-payment-form').addEventListener('submit', handlePaymentSubmit);

    // Luhn credit details visual updates on formats
    document.getElementById('booking-cardnumber').addEventListener('input', (e) => {
        let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formatted = '';
        for (let i = 0; i < val.length; i++) {
            if (i > 0 && i % 4 === 0) formatted += ' ';
            formatted += val[i];
        }
        e.target.value = formatted.substring(0, 19);
        document.getElementById('cc-visual-number').innerText = e.target.value || '•••• •••• •••• ••••';
        
        // Luhn validator output
        const cleanNo = val.substring(0, 16);
        const feedback = document.getElementById('cc-validation-feedback');
        if (cleanNo.length === 16) {
            if (checkLuhn(cleanNo)) {
                feedback.classList.add('hidden');
                document.getElementById('btn-submit-booking').removeAttribute('disabled');
            } else {
                feedback.innerText = state.language === 'ar' ? 'رقم البطاقة غير صحيح (Luhn Fail)' : 'Invalid credit card algorithm (Luhn Fail)';
                feedback.classList.remove('hidden');
                document.getElementById('btn-submit-booking').setAttribute('disabled', 'true');
            }
        } else {
            feedback.classList.add('hidden');
        }
    });

    document.getElementById('booking-cardexpiry').addEventListener('input', (e) => {
        let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (val.length > 2) {
            e.target.value = val.substring(0, 2) + '/' + val.substring(2, 4);
        } else {
            e.target.value = val;
        }
        document.getElementById('cc-visual-expiry').innerText = e.target.value || '••/••';
    });

    document.getElementById('booking-cardcvv').addEventListener('input', (e) => {
        let val = e.target.value.replace(/[^0-9]/gi, '');
        e.target.value = val.substring(0, 4);
        document.getElementById('cc-visual-cvv').innerText = ''.padStart(val.length, '•');
    });

    document.getElementById('booking-firstname').addEventListener('input', (e) => {
        updateCCName();
    });
    document.getElementById('booking-lastname').addEventListener('input', (e) => {
        updateCCName();
    });

    function updateCCName() {
        const fn = document.getElementById('booking-firstname').value;
        const ln = document.getElementById('booking-lastname').value;
        document.getElementById('cc-visual-name').innerText = `${fn} ${ln}`.trim() || 'Guest Noble Name';
    }

    // Email live validator
    document.getElementById('booking-email').addEventListener('input', (e) => {
        const val = e.target.value;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        const feedback = document.getElementById('email-validation-feedback');
        if (val && !isEmailValid) {
            feedback.classList.remove('hidden');
            document.getElementById('btn-submit-booking').setAttribute('disabled', 'true');
        } else {
            feedback.classList.add('hidden');
            document.getElementById('btn-submit-booking').removeAttribute('disabled');
        }
    });

    // Closures for vouchers
    document.getElementById('btn-close-voucher').addEventListener('click', () => {
        document.getElementById('voucher-modal').classList.add('hidden');
    });

    document.getElementById('btn-print-voucher').addEventListener('click', () => {
        window.print();
    });

    // Galleries slideshow
    document.getElementById('btn-close-gallery').addEventListener('click', () => {
        document.getElementById('gallery-overlay').classList.add('hidden');
    });

    document.getElementById('btn-gallery-prev').addEventListener('click', () => moveGalleryIndex(-1));
    document.getElementById('btn-gallery-next').addEventListener('click', () => moveGalleryIndex(1));

    // Share triggers
    document.getElementById('btn-close-share').addEventListener('click', () => {
        document.getElementById('sharing-dialog').classList.add('hidden');
    });
    document.getElementById('btn-copy-share-link').addEventListener('click', copyShareLinkToClipboard);

    // Login authentications
    document.getElementById('btn-close-login').addEventListener('click', () => {
        document.getElementById('login-modal').classList.add('hidden');
    });
    document.getElementById('login-tab-signin').addEventListener('click', () => toggleLoginTab(true));
    document.getElementById('login-tab-signup').addEventListener('click', () => toggleLoginTab(false));
    document.getElementById('login-auth-form').addEventListener('submit', handleLoginSubmit);

    // Chatbot controllers
    document.getElementById('chatbot-toggle-btn').addEventListener('click', () => {
        state.isChatOpen = !state.isChatOpen;
        const panel = document.getElementById('chatbot-main-panel');
        if (state.isChatOpen) {
            panel.classList.remove('scale-0');
            panel.classList.add('scale-100');
            // Lazy load first message if empty
            if (state.chatMessages.length === 0) {
                state.chatMessages = [
                    { sender: 'layla', text: state.language === 'ar' ? 'مرحباً بك في خدمة الضيافة الملكية الفاخرة لمنصة النخبة. كيف يمكنني إرشادك لحجز أجنحتك الفاخرة المعتمدة اليوم بالتنسيق المباشر؟' : 'Welcome to the sovereign hospitality services of Elite Portal. How may I guide you through reserving your luxury verified suites today?' }
                ];
                renderChat();
            }
        } else {
            panel.classList.add('scale-0');
            panel.classList.remove('scale-100');
        }
    });

    document.getElementById('chatbot-panel-close').addEventListener('click', () => {
        document.getElementById('chatbot-toggle-btn').click();
    });

    document.getElementById('chatbot-send-form').addEventListener('submit', handleChatSubmit);

    // Sync records database
    document.getElementById('btn-sync-bookings').addEventListener('click', async () => {
        const btn = document.getElementById('btn-sync-bookings');
        btn.querySelector('i').classList.add('animate-spin');
        const startTime = Date.now();
        try {
            const serverBookings = await fetch('/api/internal/bookings').then(r => r.json());
            if (serverBookings && Array.isArray(serverBookings)) {
                state.bookings = serverBookings;
                localStorage.setItem('liteapi_bookings', JSON.stringify(state.bookings));
                showToast(state.language === 'ar' ? 'تم جلب وتأكيد الحجوزات من خادوم لايت إيه بي آي' : 'Sovereign database entries synchronized seamlessly', 'success');
            }
        } catch (err) {
            // Local fallback
            state.bookings = JSON.parse(localStorage.getItem('liteapi_bookings') || '[]');
        }
        btn.querySelector('i').classList.remove('animate-spin');
        logAction('GET', '/api/internal/bookings', 200, Date.now() - startTime, 'Full record log synced.');
        syncView();
    });

    // Scroll to top
    document.getElementById('btn-scrolltop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        const btn = document.getElementById('btn-scrolltop');
        if (window.scrollY > 300) {
            btn.classList.remove('scale-0');
            btn.classList.add('scale-100');
        } else {
            btn.classList.add('scale-0');
            btn.classList.remove('scale-100');
        }
    });

    // Footer links
    document.getElementById('footer-lnk-portal').addEventListener('click', () => switchTab('portal'));
    document.getElementById('footer-lnk-member').addEventListener('click', () => switchTab('member'));

    // Popover inside map close handler
    document.getElementById('map-popover-close').addEventListener('click', () => {
        document.getElementById('map-popover').classList.add('scale-0');
    });
}

function validateDates() {
    const cin = new Date(state.startDate);
    const cout = new Date(state.endDate);
    if (cout <= cin) {
        state.endDate = new Date(cin.getTime() + 86400000 * 2).toISOString().split('T')[0];
        document.getElementById('search-checkout').value = state.endDate;
        showToast(state.language === 'ar' ? 'تنبيه: يجب أن يكون تاريخ المغادرة لاحقاً للوصول' : 'Alert: Check-out must exceed Check-in dates formats', 'info');
    }
}

// -------------------------------------------------------------
// Interactive Data Processing (Rates & Bookings)
// -------------------------------------------------------------
async function fetchLiveRoomRates() {
    state.loadingRates = true;
    const searchBtn = document.getElementById('search-submit-btn');
    if (searchBtn) searchBtn.setAttribute('disabled', 'true');
    showToast(state.language === 'ar' ? 'جاري جلب الأسعار الفورية المتطابقة...' : 'Calling endpoint rate grids over proxy...', 'info');

    const rateQuery = {
        hotelIds: state.hotels.map(h => h.id),
        startDate: state.startDate,
        endDate: state.endDate,
        guests: state.guests,
        currency: state.currency
    };

    const startTime = Date.now();
    try {
        const ratesRes = await fetch('/api/liteapi/rates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rateQuery)
        }).then(r => r.json()).catch(() => {
            // Standalone Fallback
            const localRates = {};
            state.hotels.forEach(hotel => {
                localRates[hotel.id] = [
                    {
                        id: `${hotel.id}-RATE-001`,
                        roomType: 'Deluxe Courtyard King',
                        boardType: 'Room Only',
                        cancellationPolicy: { type: 'free_cancellation', deadline: '2026-06-14', penaltyFee: 0 },
                        price: hotel.minPrice,
                        currency: 'USD',
                        available: true,
                        rateId: `rt_${hotel.id.toLowerCase()}_deluxe_ro`
                    },
                    {
                        id: `${hotel.id}-RATE-002`,
                        roomType: 'Signature Panoramic Suite',
                        boardType: 'Bed & Breakfast',
                        cancellationPolicy: { type: 'refundable', deadline: '2026-06-12', penaltyFee: 150 },
                        price: Math.round(hotel.minPrice * 1.5),
                        currency: 'USD',
                        available: true,
                        rateId: `rt_${hotel.id.toLowerCase()}_suite_bb`
                    },
                    {
                        id: `${hotel.id}-RATE-003`,
                        roomType: 'Imperial Master Penthouse',
                        boardType: 'Half Board (Breakfast Included)',
                        cancellationPolicy: { type: 'non_refundable' },
                        price: Math.round(hotel.minPrice * 2.8),
                        currency: 'USD',
                        available: true,
                        rateId: `rt_${hotel.id.toLowerCase()}_penth_hb`
                    }
                ];
            });
            return { rates: localRates, currency: 'USD' };
        });

        state.hotelRates = ratesRes.rates || {};
        logAction('POST', '/api/liteapi/rates', 200, Date.now() - startTime, `Retrieved detailed rates for ${Object.keys(state.hotelRates).length} hotel IDs.`);
        showToast(state.language === 'ar' ? 'تم جلب وتحديث الأسعار بنجاح!' : 'Accommodations rates listings updated.', 'success');
    } catch (err) {
        console.error(err);
    } finally {
        state.loadingRates = false;
        if (searchBtn) searchBtn.removeAttribute('disabled');
        // Update display
        syncView();
        
        // If details modal active, update inside it
        if (state.activeHotelDetails) {
            renderDetailedRates(state.activeHotelDetails.id);
        }
    }
}

// High Fidelity credit card algorithm (Luhn)
function checkLuhn(cardNo) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNo.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNo.charAt(i));
        if (isNaN(digit)) continue;
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}

// Submission final checkout booking
async function handlePaymentSubmit(e) {
    e.preventDefault();
    if (state.isSubmittingBooking) return;

    state.isSubmittingBooking = true;
    const submitBtn = document.getElementById('btn-submit-booking');
    submitBtn.setAttribute('disabled', 'true');
    const labelOriginal = submitBtn.querySelector('span').innerText;
    submitBtn.querySelector('span').innerText = state.language === 'ar' ? 'جاري تأمين الحجز الفوري...' : 'Directly locking room via LiteAPI...';

    const pFirst = document.getElementById('booking-firstname').value;
    const pLast = document.getElementById('booking-lastname').value;
    const pEmail = document.getElementById('booking-email').value;
    const pPhone = document.getElementById('booking-phone').value;

    const bookingPayload = {
        rateId: state.bookingRate.rate.rateId,
        hotelId: state.bookingRate.hotel.id,
        checkIn: state.startDate,
        checkOut: state.endDate,
        amount: state.bookingRate.rate.price,
        currency: state.bookingRate.rate.currency,
        roomType: state.bookingRate.rate.roomType,
        boardType: state.bookingRate.rate.boardType,
        guestDetails: {
            firstName: pFirst,
            lastName: pLast,
            email: pEmail,
            phone: pPhone
        }
    };

    const startTime = Date.now();
    try {
        const finalBookingRes = await fetch('/api/internal/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingPayload)
        }).then(r => r.json()).catch(() => {
            // Sandbox client fallback
            const fallbackBooking = {
                id: `BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
                hotelId: state.bookingRate.hotel.id,
                hotelName: state.bookingRate.hotel.name,
                hotelStars: state.bookingRate.hotel.stars,
                hotelImage: state.bookingRate.hotel.images[0],
                hotelAddress: state.bookingRate.hotel.address,
                rateId: state.bookingRate.rate.rateId,
                roomType: state.bookingRate.rate.roomType,
                boardType: state.bookingRate.rate.boardType,
                checkIn: state.startDate,
                checkOut: state.endDate,
                amount: state.bookingRate.rate.price,
                currency: state.bookingRate.rate.currency,
                status: 'confirmed',
                guestDetails: { firstName: pFirst, lastName: pLast, email: pEmail, phone: pPhone },
                createdAt: new Date().toISOString()
            };
            return fallbackBooking;
        });

        // Add to state and save
        state.bookings.unshift(finalBookingRes);
        localStorage.setItem('liteapi_bookings', JSON.stringify(state.bookings));

        logAction('POST', '/api/internal/bookings', 201, Date.now() - startTime, `Booking ${finalBookingRes.id} successfully generated.`);
        showToast(t('notificationBookingOk'), 'success');
        
        // Hide details & Booking drawer
        document.getElementById('booking-modal').classList.add('hidden');
        document.getElementById('hotel-details-modal').classList.add('hidden');

        // Instantly display ticket
        openVoucherModal(finalBookingRes);
    } catch (err) {
        console.error(err);
    } finally {
        state.isSubmittingBooking = false;
        submitBtn.removeAttribute('disabled');
        submitBtn.querySelector('span').innerText = labelOriginal;
        syncView();
    }
}

// Cancel Booking
async function cancelBooking(id) {
    const confirmation = confirm(state.language === 'ar' ? 'هل أنت متأكد من رغبتك في إلغاء هذا الصرح واستعادة كامل المبلغ؟' : 'Are you absolutely sure you wish to cancel this hotel contract?');
    if (!confirmation) return;

    const startTime = Date.now();
    try {
        const res = await fetch(`/api/internal/bookings/${id}/cancel`, { method: 'POST' }).then(r => r.json()).catch(() => {
            // Client mockup side cancellation
            const index = state.bookings.findIndex(b => b.id === id);
            if (index !== -1) {
                state.bookings[index].status = 'cancelled';
                return { success: true, booking: state.bookings[index] };
            }
            return { success: false };
        });

        if (res.success) {
            // Update UI list
            const index = state.bookings.findIndex(b => b.id === id);
            if (index !== -1) {
                state.bookings[index] = res.booking;
                localStorage.setItem('liteapi_bookings', JSON.stringify(state.bookings));
            }
            showToast(state.language === 'ar' ? 'تم إلغاء الحجز بنجاح ومصادقة الاسترداد!' : 'Room contract cancelled. Instant digital refund processed.', 'success');
            logAction('POST', `/api/internal/bookings/${id}/cancel`, 200, Date.now() - startTime, `Booking card ${id} status set to cancelled.`);
        }
    } catch (err) {
        console.error(err);
    } finally {
        syncView();
    }
}

// -------------------------------------------------------------
// UI Synchers, DOM structures & Builders
// -------------------------------------------------------------
function syncView() {
    // Label translations set
    translateUI();

    // Toggle active classes on tabs bar elements
    if (state.currentTab === 'portal') {
        document.getElementById('view-portal').classList.remove('hidden');
        document.getElementById('view-member').classList.add('hidden');
        
        // Swap colors active
        document.getElementById('nav-tab-portal').className = "flex items-center space-x-1.5 space-x-reverse px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-extrabold shadow-lg shadow-amber-500/10";
        document.getElementById('nav-tab-member').className = "flex items-center space-x-1.5 space-x-reverse px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer text-slate-400 hover:text-slate-200";
        
        renderHotelsGrid();
        renderMap();
    } else {
        document.getElementById('view-portal').classList.add('hidden');
        document.getElementById('view-member').classList.remove('hidden');

        document.getElementById('nav-tab-portal').className = "flex items-center space-x-1.5 space-x-reverse px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer text-slate-400 hover:text-slate-200";
        document.getElementById('nav-tab-member').className = "flex items-center space-x-1.5 space-x-reverse px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-extrabold shadow-lg shadow-amber-500/10";
        
        renderBookingsHistory();
        renderFavoritesFavoritesSidebar();
    }
}

function translateUI() {
    // Main HTML directional setup
    const isAr = state.language === 'ar';
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = state.language;

    // Safe setters preventing Cannot set properties of null
    const safeSetText = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.innerText = val;
    };
    const safeSetQueryText = (id, selector, val) => {
        const parent = document.getElementById(id);
        if (parent) {
            const child = parent.querySelector(selector);
            if (child) child.innerText = val;
        }
    };

    // Static layouts translated
    safeSetText('ticker-brand-text', t('tickerText'));
    safeSetText('ticker-promo-text', t('tickerPromo'));
    safeSetText('ticker-status-text', t('tickerStatus'));

    safeSetText('nav-portal-label', t('portalTab'));
    safeSetText('nav-member-label', t('memberTab'));
    safeSetText('label-liteapi-gateway', t('gatewayText'));
    safeSetQueryText('label-gateway-stable', 'span', t('stableSecure'));
    safeSetQueryText('label-profile-badge', 'span', t('vipBadge'));

    // Portal
    safeSetText('hero-tag', t('heroTag'));
    safeSetText('hero-title', t('heroTitle'));
    safeSetText('hero-desc', t('heroDesc'));
    safeSetText('hero-sticker-1', t('sticker1'));
    safeSetText('hero-sticker-2', t('sticker2'));
    safeSetText('hero-sticker-3', t('sticker3'));

    safeSetText('search-title', t('searchTitle'));
    safeSetText('search-sub', t('searchSub'));
    safeSetText('label-country', t('labelCountry'));
    safeSetText('label-city', t('labelCity'));
    safeSetText('label-checkin', t('labelCheckin'));
    safeSetText('label-checkout', t('labelCheckout'));
    safeSetText('search-submit-label', t('searchBtn'));
    
    safeSetText('geo-title', t('geoTitle'));
    safeSetText('geo-sub', t('geoSub'));

    safeSetText('wishline-title', t('wishlistShowroomTitle'));
    safeSetText('wishline-desc', t('wishlistShowroomDesc'));
    safeSetText('btn-wishlist-filter-shortcut', t('wishlistShowroomBtn'));

    safeSetText('avail-hotels-title', t('availHotelsTitle'));
    safeSetText('avail-hotels-sub', t('availHotelsSub'));
    safeSetText('map-label-title', t('mapLabelTitle'));
    safeSetText('map-label-desc', t('mapLabelDesc'));

    safeSetText('empty-title', t('emptyTitle'));
    safeSetText('empty-sub', t('emptySub'));

    safeSetText('shield-box-title', t('shieldBoxTitle'));
    safeSetText('shield-box-desc', t('shieldBoxDesc'));

    // Detail modal descriptors
    safeSetText('label-philosophy-curator', t('philosophyLabel'));
    safeSetText('details-amenities-label', t('amenitiesLabel'));
    safeSetText('label-live-vacancies-period', t('liveVacanciesLabel'));
    safeSetText('label-rates-unlocked-title', t('ratesPendingTitle'));
    safeSetText('label-rates-unlocked-sub', t('ratesPendingSub'));
    safeSetText('btn-details-trigger-ratesearch', t('ratesPendingBtn'));

    safeSetText('label-exclusive-score', t('exclusiveScore'));
    safeSetText('label-lat-coords', t('latCoords'));
    safeSetText('label-lng-coords', t('lngCoords'));
    safeSetText('label-privilege-seal-title', t('sealTitle'));
    safeSetText('label-privilege-seal-desc', t('sealDesc'));
    safeSetText('label-fsgallery-trigger', t('fullscreenGalleryLabel'));

    // Booking modal
    safeSetText('wizard-title', t('wizardTitle'));
    safeSetText('wizard-sub', t('wizardSub'));
    safeSetText('label-guest-profile-title', t('guestProfileTitle'));
    safeSetText('label-firstname', t('labelFirstname'));
    safeSetText('label-lastname', t('labelLastname'));
    safeSetText('label-booking-email', t('labelEmail'));
    safeSetText('label-booking-phone', t('labelPhone'));
    
    safeSetText('label-billing-profile-title', t('billingTitle'));
    safeSetText('label-cardnumber', t('labelCardNumber'));
    safeSetText('label-cardexpiry', t('labelCardExpiry'));
    safeSetText('label-cardcvv', t('labelCardCvv'));
    safeSetText('booking-btn-submit-label', t('btnConfirmBooking'));

    // Vouchers translations
    safeSetText('voucher-document-title', t('digitalVoucherTitle'));
    safeSetText('voucher-paid-status', t('certifiedVoucherStatus'));
    safeSetText('label-voucher-contact-name', t('voucherContactName'));
    safeSetText('label-voucher-contact-email', t('voucherContactEmail'));
    safeSetText('label-voucher-contact-phone', t('voucherContactPhone'));
    safeSetText('label-voucher-estate', t('voucherEstate'));
    safeSetText('label-voucher-room', t('voucherRoom'));
    safeSetText('label-voucher-board', t('voucherBoard'));
    safeSetText('label-voucher-period', t('voucherPeriod'));
    safeSetText('label-voucher-sum', t('voucherSum'));
    safeSetText('footer-seal-text', t('captionSign'));

    // Member
    safeSetText('loyalty-tag', t('loyaltyTagText'));
    safeSetText('loyalty-card-no', t('loyaltyCardNoAr'));
    safeSetText('fidelity-points', t('fidelityPointsAr'));
    safeSetText('fidelity-target', t('fidelityTargetAr'));
    safeSetText('stats-tag', t('statsTagAr'));
    safeSetText('saved-title-label', t('savedTitleLabelAr'));
    safeSetText('records-title', t('recordsTitleAr'));
    safeSetText('records-sub', t('recordsSubAr'));
    safeSetText('label-refresh-records', t('refreshBtnAr'));
    safeSetText('no-bookings-title', t('noBookingsTitleAr'));
    safeSetText('no-bookings-sub', t('noBookingsSubAr'));
    safeSetText('label-num-trips', t('totalTripsAr'));
    safeSetText('label-num-nights', t('totalNightsAr'));
    safeSetText('loyalty-note', t('loyaltyNoteAr'));

    // Category Buttons Translate text
    const buttons = document.querySelectorAll('#filter-tabs-container button');
    if (buttons.length >= 6) {
        buttons[0].childNodes[0].nodeValue = isAr ? "جميع الصروح" : "All Estates ";
        buttons[1].childNodes[0].nodeValue = isAr ? "صروح برستيج" : "Prestige ";
        buttons[2].childNodes[0].nodeValue = isAr ? "الأعلى تصفية" : "Top Scoring ";
        buttons[3].childNodes[0].nodeValue = isAr ? "الأقل قيمة" : "Best Values ";
        buttons[4].childNodes[0].nodeValue = isAr ? "الأكثر حجزاً" : "Noble Choices ";
        buttons[5].childNodes[1].nodeValue = isAr ? "المفضلة" : " Wishlist";
    }

    // Toggle RTL elements margins
    const visualCards = document.querySelectorAll('.card-visual-info-row');
    visualCards.forEach(c => {
        if (isAr) {
            c.classList.add('flex-row');
            c.classList.remove('flex-row-reverse');
        } else {
            c.classList.add('flex-row-reverse');
            c.classList.remove('flex-row');
        }
    });
}

function filterHotels() {
    let list = [...state.allHotels];

    // Country/city selector variables
    if (state.selectedCity) {
        list = list.filter(h => h.city.toLowerCase() === state.selectedCity.toLowerCase());
    }

    // Wishlist selector checker
    const wishActiveCount = state.wishedHotelIds.length;
    const wishShowroom = document.getElementById('wishlist-showroom-section');
    if (wishActiveCount > 0) {
        wishShowroom.classList.remove('hidden');
    } else {
        wishShowroom.classList.add('hidden');
    }

    // Categories
    if (state.activeCategory === 'luxury') {
        list = list.filter(h => h.stars === 5);
    } else if (state.activeCategory === 'top_rated') {
        list = list.filter(h => h.rating >= 4.8);
    } else if (state.activeCategory === 'best_price') {
        list = list.filter(h => h.minPrice < 400);
    } else if (state.activeCategory === 'most_booked') {
        list = list.filter(h => h.rating >= 4.7 && h.minPrice > 300);
    } else if (state.activeCategory === 'wishlist') {
        list = list.filter(h => state.wishedHotelIds.includes(h.id));
    }

    state.hotels = list;

    // Build lists
    renderHotelsGrid();
    renderMap();

    // Hotel count label update
    const hotelsCountLabel = document.getElementById('hotels-count-label');
    if (state.language === 'ar') {
        hotelsCountLabel.innerText = `${state.hotels.length} فندق شريك يطابق شروط الفلترة`;
    } else {
        hotelsCountLabel.innerText = `${state.hotels.length} hospitality estates match search`;
    }
}

// Render dynamic hotel grids
function renderHotelsGrid() {
    const grid = document.getElementById('hotels-grid');
    const emptyState = document.getElementById('hotels-empty-state');
    grid.innerHTML = '';

    if (state.hotels.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }
    emptyState.classList.add('hidden');

    state.hotels.forEach(hotel => {
        const isWished = state.wishedHotelIds.includes(hotel.id);
        const activeImgIndex = state.hotelImageIndices[hotel.id] || 0;
        const currentImg = hotel.images[activeImgIndex] || hotel.images[0];
        const ratingMetric = state.language === 'ar' ? 'ممتاز' : 'Superb';

        // Compared status
        const isCompared = state.comparedHotels.some(h => h.id === hotel.id);
        const compareBtnLabel = isCompared 
            ? (state.language === 'ar' ? 'مضاف للمقارنة' : 'Compared')
            : (state.language === 'ar' ? 'المقارنة الفورية' : 'Compare');

        const cardHtml = `
            <div class="rounded-3xl border border-slate-800 bg-[#0f172a]/30 overflow-hidden text-right group select-none transition duration-500 hover:border-amber-500/15 shadow-lg flex flex-col h-full hover:shadow-2xl">
                <!-- Image Slider -->
                <div class="relative aspect-[4/3] overflow-hidden bg-slate-950 shrink-0">
                    <img src="${currentImg}" alt="${hotel.name}" class="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105">
                    
                    <!-- Linear cinematic fade shades -->
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>

                    <!-- Heart visual button -->
                    <button class="absolute top-4 right-4 p-2 rounded-full border border-white/10 bg-black/45 text-white hover:text-rose-500 hover:scale-110 active:scale-95 transition cursor-pointer" onclick="toggleWish('${hotel.id}')">
                        <i data-lucide="heart" class="w-4 h-4 ${isWished ? 'fill-rose-500 text-rose-500' : ''}"></i>
                    </button>

                    <!-- Image slideshow quick controls -->
                    ${hotel.images.length > 1 ? `
                        <div class="absolute inset-y-0 inset-x-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition duration-300">
                            <button class="p-1.5 rounded-full bg-black/55 text-white border border-white/5 active:scale-90" onclick="sliderMove('${hotel.id}', -1)"><i data-lucide="chevron-left" class="w-3.5 h-3.5"></i></button>
                            <button class="p-1.5 rounded-full bg-black/55 text-white border border-white/5 active:scale-90" onclick="sliderMove('${hotel.id}', 1)"><i data-lucide="chevron-right" class="w-3.5 h-3.5"></i></button>
                        </div>
                    ` : ''}

                    <!-- Destination star score details tag -->
                    <div class="absolute bottom-4 left-4 bg-[#0f172a]/80 backdrop-blur border border-amber-500/20 py-1 px-3 rounded-xl text-[10px] font-bold text-amber-400 font-mono shadow">
                        ${hotel.rating.toFixed(1)} <i data-lucide="star" class="w-3 h-3 text-amber-500 fill-amber-500 inline shrink-0 -mt-0.5"></i>
                    </div>

                    <!-- Location indicator label -->
                    <div class="absolute bottom-4 right-4 text-xs font-bold text-white tracking-wide">
                        <i data-lucide="map-pin" class="w-3.5 h-3.5 text-amber-500 inline shrink-0"></i> ${hotel.city}
                    </div>
                </div>

                <!-- Info description parameters block -->
                <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div class="space-y-1.5 text-right">
                        <div class="flex flex-row-reverse justify-between items-start gap-2">
                            <h4 class="font-sans font-black text-sm text-white group-hover:text-amber-405 transition line-clamp-1">${hotel.name}</h4>
                            <div class="flex shrink-0">
                                ${Array(hotel.stars).fill(`<i data-lucide="star" class="w-3 h-3 text-amber-500 fill-amber-500 shrink-0"></i>`).join('')}
                            </div>
                        </div>
                        <p class="text-[11.5px] leading-relaxed text-slate-400 line-clamp-2">${hotel.description}</p>
                    </div>

                    <div class="border-t border-slate-900/40 pt-4 flex items-center justify-between">
                        <div class="text-right">
                            <span class="text-[9px] text-slate-500 block leading-none font-bold">${state.language === 'ar' ? 'تبدأ من ليلة' : 'Starting from'}</span>
                            <span class="text-amber-500 font-black text-lg block mt-1 leading-none font-mono">$${hotel.minPrice} USD</span>
                        </div>

                        <div class="flex gap-1.5 shrink-0">
                            <!-- Compare button launcher -->
                            <button class="px-3 py-2 border rounded-xl text-[10px] font-black tracking-wide transition cursor-pointer active:scale-95 ${
                                isCompared 
                                ? 'bg-amber-550/15 border-amber-505/30 text-amber-400' 
                                : 'bg-slate-950 border-slate-850 hover:border-amber-500/20 text-slate-400'
                            }" onclick="toggleCompare('${hotel.id}')">
                                ${compareBtnLabel}
                            </button>

                            <!-- Explore button rate -->
                            <button class="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-[10px] py-2 px-4 rounded-xl cursor-pointer active:scale-95 transition shadow" onclick="openDetails('${hotel.id}')">
                                ${state.language === 'ar' ? 'عروض واستعلام الجناح' : 'Explore Suite Rates'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += cardHtml;
    });

    // Refresh icons inside dynamically mounted card elements
    lucide.createIcons();
}

// Image grids slider adjustments
window.sliderMove = (hotelId, step) => {
    const hotel = state.allHotels.find(h => h.id === hotelId);
    if (!hotel) return;
    const currentIdx = state.hotelImageIndices[hotelId] || 0;
    
    // safe cycles offsets
    let index = currentIdx + step;
    if (index >= hotel.images.length) index = 0;
    if (index < 0) index = hotel.images.length - 1;

    state.hotelImageIndices[hotelId] = index;
    renderHotelsGrid();
};

window.toggleWish = (hotelId) => {
    const wishes = [...state.wishedHotelIds];
    const idx = wishes.indexOf(hotelId);
    if (idx !== -1) {
        wishes.splice(idx, 1);
        showToast(t('notificationUnwished'), 'info');
    } else {
        wishes.push(hotelId);
        showToast(t('notificationWished'), 'success');
    }
    state.wishedHotelIds = wishes;
    localStorage.setItem('liteapi_wishlist', JSON.stringify(wishes));
    
    // Reload items on lists dynamically
    filterHotels();
};

// -------------------------------------------------------------
// Interactive SVG Map Coordination projection engine
// -------------------------------------------------------------
function renderMap() {
    const svg = document.getElementById('interactive-map-svg');
    svg.innerHTML = '';
    
    if (state.hotels.length === 0) return;

    // Projection calculation parameters
    let minLat = Math.min(...state.hotels.map(h => h.coordinates.lat));
    let maxLat = Math.max(...state.hotels.map(h => h.coordinates.lat));
    let minLng = Math.min(...state.hotels.map(h => h.coordinates.lng));
    let maxLng = Math.max(...state.hotels.map(h => h.coordinates.lng));

    let latRange = maxLat - minLat || 1;
    let lngRange = maxLng - minLng || 1;

    const padding = 50;
    const width = 400 - padding * 2;
    const height = 400 - padding * 2;

    const project = (lat, lng) => {
        if (state.hotels.length === 1) return { x: 200, y: 200 };
        let x = padding + ((lng - minLng) / lngRange) * width;
        let y = padding + (1 - (lat - minLat) / latRange) * height;
        return { x, y };
    };

    // Draw reference grids lines inside geographic trackers
    for (let i = 1; i < 4; i++) {
        const offset = 100 * i;
        svg.innerHTML += `<line x1="${offset}" y1="0" x2="${offset}" y2="400" stroke="#1e293b" stroke-dasharray="2,4" opacity="0.3"></line>`;
        svg.innerHTML += `<line x1="0" y1="${offset}" x2="400" y2="${offset}" stroke="#1e293b" stroke-dasharray="2,4" opacity="0.3"></line>`;
    }

    // Dynamic map path drawing linking consecutive nodes
    if (state.hotels.length > 1) {
        let pathString = '';
        state.hotels.forEach((hotel, idx) => {
            const pt = project(hotel.coordinates.lat, hotel.coordinates.lng);
            if (idx === 0) pathString += `M ${pt.x} ${pt.y}`;
            else pathString += ` L ${pt.x} ${pt.y}`;
        });
        svg.innerHTML += `<path d="${pathString}" fill="none" stroke="rgba(245, 158, 11, 0.2)" stroke-width="2" stroke-dasharray="4,6"></path>`;
    }

    // Populate circle elements represent hotels
    state.hotels.forEach(hotel => {
        const pt = project(hotel.coordinates.lat, hotel.coordinates.lng);
        const circleGroup = `
            <g class="cursor-pointer group select-all" onclick="openMapPopover('${hotel.id}', ${pt.x}, ${pt.y})">
                <!-- Glowing radiant circles -->
                <circle cx="${pt.x}" cy="${pt.y}" r="12" fill="rgba(245, 158, 11, 0.15)" class="animate-ping" style="animation-duration: 3s;"></circle>
                <circle cx="${pt.x}" cy="${pt.y}" r="6.5" fill="#f59e0b" stroke="#090d16" stroke-width="1.5" class="transition group-hover:fill-amber-400 group-hover:scale-125 duration-300"></circle>
            </g>
        `;
        svg.innerHTML += circleGroup;
    });
}

// Active popover details overlays
window.openMapPopover = (hotelId, x, y) => {
    const hotel = state.allHotels.find(h => h.id === hotelId);
    if (!hotel) return;

    const overlay = document.getElementById('map-popover');
    document.getElementById('map-popover-name').innerText = hotel.name;
    document.getElementById('map-popover-desc').innerText = hotel.address;
    document.getElementById('map-popover-price').innerText = `$${hotel.minPrice} / ${state.language === 'ar' ? 'ليلة' : 'night'}`;

    // Anchor click btn details
    document.getElementById('map-popover-btn').onclick = () => {
        openDetails(hotel.id);
        overlay.classList.add('scale-0');
    };

    // Calculate alignment relative to layout box size
    overlay.style.bottom = 'auto';
    overlay.style.top = `${y > 220 ? y - 160 : y + 20}px`;
    overlay.style.left = `${x > 200 ? x - 180 : x + 20}px`;

    overlay.classList.remove('scale-0');
};

// -------------------------------------------------------------
// Interactive Comparison Matrix
// -------------------------------------------------------------
window.toggleCompare = (hotelId) => {
    const hotel = state.allHotels.find(h => h.id === hotelId);
    if (!hotel) return;

    const currentCompares = [...state.comparedHotels];
    const existsIdx = currentCompares.findIndex(c => c.id === hotelId);

    if (existsIdx !== -1) {
        currentCompares.splice(existsIdx, 1);
    } else {
        if (currentCompares.length >= 3) {
            showToast(t('notificationCompareFull'), 'error');
            return;
        }
        currentCompares.push(hotel);
    }

    state.comparedHotels = currentCompares;

    // Reload grids details
    renderHotelsGrid();

    // Redraw table comparison drawer
    const drawer = document.getElementById('compare-workspace');
    if (state.comparedHotels.length > 0) {
        renderCompareMatrix();
        drawer.classList.remove('scale-0');
    } else {
        drawer.classList.add('scale-0');
    }
};

function renderCompareMatrix() {
    const table = document.getElementById('compare-table');
    const isAr = state.language === 'ar';

    // Headers mapping
    const headersHtml = `
        <tr class="border-b border-slate-800 text-amber-500 text-right">
            <th class="py-3 px-4 text-slate-450">${t('compareHeaderFeature')}</th>
            ${state.comparedHotels.map(h => `<th class="py-3 px-4 font-black">${h.name}</th>`).join('')}
        </tr>
    `;

    // Metrix variables rows mapping
    const rowStars = `
        <tr class="border-b border-slate-900/40 hover:bg-slate-900/10">
            <td class="py-3 px-4 text-slate-400 font-bold">${isAr ? 'التصنيف' : 'Hotel Grade'}</td>
            ${state.comparedHotels.map(h => `
                <td class="py-3 px-4">
                    <div class="flex">${Array(h.stars).fill(`<i data-lucide="star" class="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0"></i>`).join('')}</div>
                </td>
            `).join('')}
        </tr>
    `;

    const rowScore = `
        <tr class="border-b border-slate-900/40 hover:bg-slate-900/10">
            <td class="py-3 px-4 text-slate-400 font-bold">${isAr ? 'تقييم النزلاء' : 'Review Score'}</td>
            ${state.comparedHotels.map(h => `<td class="py-3 px-4 font-black text-amber-420 font-mono">${h.rating.toFixed(1)} / 5.0</td>`).join('')}
        </tr>
    `;

    const rowPrice = `
        <tr class="border-b border-slate-900/40 hover:bg-slate-900/10">
            <td class="py-3 px-4 text-slate-400 font-bold">${isAr ? 'نت العروض وبداية السعر' : 'Best Suite Price'}</td>
            ${state.comparedHotels.map(h => `<td class="py-3 px-4 font-semibold text-white font-mono">$${h.minPrice} USD</td>`).join('')}
        </tr>
    `;

    const rowAmenities = `
        <tr class="border-b border-slate-900/40 hover:bg-slate-900/10">
            <td class="py-3 px-4 text-slate-400 font-bold">${isAr ? 'الامتيازات البارزة' : 'Highlighted Perks'}</td>
            ${state.comparedHotels.map(h => `<td class="py-3 px-4 text-[10px] text-slate-300 leading-relaxed">${h.amenities.slice(0, 4).join(', ')}</td>`).join('')}
        </tr>
    `;

    const rowCheckoutBtn = `
        <tr class="hover:bg-slate-900/10">
            <td class="py-3.5 px-4"></td>
            ${state.comparedHotels.map(h => `
                <td class="py-3.5 px-4 text-center">
                    <button class="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 text-[10px] font-black py-2 px-5 rounded-lg active:scale-95 transition" onclick="openDetails('${h.id}')">
                        ${isAr ? 'فتح الصرح الفندقي' : 'Explore Estate'}
                    </button>
                </td>
            `).join('')}
        </tr>
    `;

    table.innerHTML = `
        <thead>${headersHtml}</thead>
        <tbody>
            ${rowStars}
            ${rowScore}
            ${rowPrice}
            ${rowAmenities}
            ${rowCheckoutBtn}
        </tbody>
    `;
    lucide.createIcons();
}

// -------------------------------------------------------------
// Immersive Detailed Hotel modal layouts
// -------------------------------------------------------------
window.openDetails = (hotelId) => {
    const hotel = state.allHotels.find(h => h.id === hotelId);
    if (!hotel) return;

    state.activeHotelDetails = hotel;

    const modal = document.getElementById('hotel-details-modal');
    document.getElementById('details-hero-img').src = hotel.images[0];
    document.getElementById('details-hotel-name-h3').innerText = hotel.name;
    document.getElementById('details-city-country-badge').querySelector('span:nth-child(2)').innerText = `${hotel.city}, ${hotel.countryCode}`;
    document.getElementById('details-description').innerText = hotel.description;

    document.getElementById('details-stars-rating').innerText = `${hotel.rating.toFixed(1)} / 5.0`;
    document.getElementById('details-lat').innerText = hotel.coordinates.lat.toFixed(4);
    document.getElementById('details-lng').innerText = hotel.coordinates.lng.toFixed(4);

    // Dynamic rendering of utilities list
    const amenitiesGrid = document.getElementById('details-amenities-grid');
    amenitiesGrid.innerHTML = '';
    hotel.amenities.forEach(amenity => {
        amenitiesGrid.innerHTML += `
            <div class="p-3.5 rounded-xl border border-slate-850 bg-slate-950/45 text-right flex flex-row-reverse items-center gap-2.5 font-bold text-slate-300 text-xs">
                <i data-lucide="check-circle" class="w-4 h-4 text-amber-500 shrink-0"></i>
                <span>${amenity}</span>
            </div>
        `;
    });

    // Slideshow configurations
    document.getElementById('btn-fullscreen-gallery').onclick = () => {
        state.fullscreenGalleryIndex = { hotel, activeIndex: 0 };
        openFullscreenGallery();
    };

    // Social share configuration link inside modals
    document.getElementById('btn-share-trigger').onclick = () => {
        state.sharingHotel = hotel;
        openSocialShareModal();
    };

    // Render rates in detail modal
    renderDetailedRates(hotelId);

    // Make modal visible
    modal.classList.remove('hidden');
    lucide.createIcons();
};

function renderDetailedRates(hotelId) {
    const ratesBox = document.getElementById('details-room-rates-list');
    const pendingBox = document.getElementById('details-rates-pending');
    ratesBox.innerHTML = '';

    const rates = state.hotelRates[hotelId];

    if (!rates || rates.length === 0) {
        pendingBox.classList.remove('hidden');
        return;
    }
    pendingBox.classList.add('hidden');

    rates.forEach(rate => {
        const policyLabel = rate.cancellationPolicy.type === 'free_cancellation' 
            ? (state.language === 'ar' ? `إلغاء مجاني حتى: ${rate.cancellationPolicy.deadline}` : `Cancellation Free until: ${rate.cancellationPolicy.deadline}`)
            : (rate.cancellationPolicy.type === 'refundable' 
                ? (state.language === 'ar' ? `مسترد مقابل خصم رسوم: $${rate.cancellationPolicy.penaltyFee}` : `Refundable minus penalty: $${rate.cancellationPolicy.penaltyFee}`)
                : (state.language === 'ar' ? 'غير مسترد كلياً نهائياً' : 'Completely Non-refundable'));

        const rateHtml = `
            <div class="p-5 sm:p-6 rounded-2xl border border-slate-850 bg-slate-950/45 text-right flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition hover:border-amber-500/10">
                <div class="space-y-2">
                    <span class="text-[9px] font-mono tracking-widest text-amber-550 uppercase leading-none block font-black">CERTIFIED ACCOMMODATION SLOT</span>
                    <h5 class="font-sans font-black text-sm text-slate-100 leading-tight">${rate.roomType}</h5>
                    <p class="text-xs text-slate-400 font-semibold flex items-center justify-end gap-1.5 leading-none">
                        <span>${rate.boardType}</span> <i data-lucide="coffee" class="w-4 h-4 text-yellow-500/80 shrink-0"></i>
                    </p>
                    <p class="text-[10px] text-amber-500 font-bold leading-none select-none">${policyLabel}</p>
                </div>

                <div class="sm:border-r border-slate-850 sm:pr-6 flex items-center gap-4 justify-between w-full sm:w-auto shrink-0">
                    <div class="text-right">
                        <span class="text-[9px] text-slate-500 block leading-none font-bold">${state.language === 'ar' ? 'التكلفة الإجمالية' : 'Net Inclusive Cost'}</span>
                        <span class="text-white font-black text-base sm:text-lg block mt-1 leading-none font-mono">$${rate.price} USD</span>
                        <span class="text-[8px] text-slate-600 block mt-1 select-none leading-none">Net total</span>
                    </div>

                    <button class="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 text-xs font-black py-2.5 px-6 rounded-xl cursor-pointer active:scale-95 transition" onclick="openBookingWizard('${hotelId}', '${rate.id}')">
                        ${state.language === 'ar' ? 'تأكيد وحجز الغرفة' : 'Confirm Suite'}
                    </button>
                </div>
            </div>
        `;
        ratesBox.innerHTML += rateHtml;
    });
    lucide.createIcons();
}

// Full-screen Slide show overlay modal controllers
function openFullscreenGallery() {
    const gallery = document.getElementById('gallery-overlay');
    const image = document.getElementById('gallery-active-img');
    const nameLabel = document.getElementById('gallery-hotel-title');
    const counter = document.getElementById('gallery-counter-tag');

    nameLabel.innerText = state.fullscreenGalleryIndex.hotel.name;
    image.src = state.fullscreenGalleryIndex.hotel.images[state.fullscreenGalleryIndex.activeIndex];
    counter.innerText = `Image ${state.fullscreenGalleryIndex.activeIndex + 1} of ${state.fullscreenGalleryIndex.hotel.images.length}`;

    // Build dots indicator indices
    const dotsContainer = document.getElementById('gallery-dots-container');
    dotsContainer.innerHTML = '';
    state.fullscreenGalleryIndex.hotel.images.forEach((_, idx) => {
        dotsContainer.innerHTML += `
            <span class="w-1.5 h-1.5 rounded-full ${idx === state.fullscreenGalleryIndex.activeIndex ? 'bg-amber-500 scale-125 saturate-150' : 'bg-slate-600'} transition duration-300"></span>
        `;
    });

    gallery.classList.remove('hidden');
}

function moveGalleryIndex(direction) {
    if (!state.fullscreenGalleryIndex) return;
    const hotel = state.fullscreenGalleryIndex.hotel;
    let idx = state.fullscreenGalleryIndex.activeIndex + direction;

    if (idx >= hotel.images.length) idx = 0;
    if (idx < 0) idx = hotel.images.length - 1;

    state.fullscreenGalleryIndex.activeIndex = idx;
    openFullscreenGallery();
}

// Social share links modal layouts
function openSocialShareModal() {
    const dialog = document.getElementById('sharing-dialog');
    const linkInput = document.getElementById('share-link-input');

    const simulatedUrl = `${window.location.protocol}//${window.location.host}/index.html?hotel=${state.sharingHotel.id}`;
    linkInput.value = simulatedUrl;

    dialog.classList.remove('hidden');
}

function copyShareLinkToClipboard() {
    const input = document.getElementById('share-link-input');
    input.select();
    input.setSelectionRange(0, 99999); // support old mobile screens

    try {
        navigator.clipboard.writeText(input.value);
    } catch (err) {
        document.execCommand('copy');
    }

    showToast(state.language === 'ar' ? 'تم نسخ رابط المشاركة للحافظة بنجاح!' : 'Encrypted share link copied to clipboard successfully!', 'success');
    document.getElementById('sharing-dialog').classList.add('hidden');
}

// -------------------------------------------------------------
// Interactive Passenger booking Wizard forms setup
// -------------------------------------------------------------
window.openBookingWizard = (hotelId, rateId) => {
    const hotel = state.allHotels.find(h => h.id === hotelId);
    if (!hotel) return;

    const rates = state.hotelRates[hotelId] || [];
    const activeRate = rates.find(r => r.id === rateId);
    if (!activeRate) return;

    state.bookingRate = { hotel, rate: activeRate };

    // Fill visuals
    document.getElementById('booking-summary-hotel-tag').innerText = `${state.language === 'ar' ? 'جاري حجز:' : 'Acquiring:'} ${hotel.name}`;
    document.getElementById('booking-summary-room-type').innerText = activeRate.roomType;
    document.getElementById('booking-summary-dates').innerText = `${state.language === 'ar' ? 'وصول:' : 'Check-in:'} ${state.startDate} ${state.language === 'ar' ? 'إلي مغادرة:' : 'to checkout:'} ${state.endDate}`;
    
    // Total price calculations
    const checkin = new Date(state.startDate);
    const checkout = new Date(state.endDate);
    const nightsCount = Math.ceil((checkout - checkin) / 86450000 || 1);
    const costTotal = activeRate.price * nightsCount;
    document.getElementById('booking-summary-total-cost').innerText = `$${costTotal} ${activeRate.currency}`;

    // Show modal
    document.getElementById('booking-modal').classList.remove('hidden');
};

// Open detailed certified printable ticket modal elements
function openVoucherModal(booking) {
    const modal = document.getElementById('voucher-modal');

    document.getElementById('voucher-id-val').innerText = booking.id;
    document.getElementById('voucher-createdat-val').innerText = booking.createdAt;
    document.getElementById('voucher-guest-name').innerText = `${booking.guestDetails.firstName} ${booking.guestDetails.lastName}`;
    document.getElementById('voucher-guest-email').innerText = booking.guestDetails.email;
    document.getElementById('voucher-guest-phone').innerText = booking.guestDetails.phone;

    document.getElementById('voucher-hotel-name').innerText = booking.hotelName;
    document.getElementById('voucher-hotel-address').innerText = booking.hotelAddress;
    document.getElementById('voucher-room-type').innerText = booking.roomType;
    document.getElementById('voucher-board-type').innerText = booking.boardType;
    document.getElementById('voucher-booking-dates').innerText = `${booking.checkIn} to ${booking.checkOut}`;

    document.getElementById('voucher-total-amount').innerText = `$${booking.amount} ${booking.currency}`;
    document.getElementById('voucher-barcode-label').innerText = `${booking.id}-PASS`;

    // Visual indicators state cancel
    const statusLabel = document.getElementById('invoice-status-badge');
    if (booking.status === 'confirmed') {
        statusLabel.className = "inline-flex bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] px-3 py-1 rounded-full font-bold select-none leading-none items-center gap-1";
        document.getElementById('voucher-paid-status').innerText = state.language === 'ar' ? 'مدفوع ومؤكد كلياً بمخزون LiteAPI المباشر' : '✓ Paid & Guaranteed via direct LiteAPI servers';
    } else {
        statusLabel.className = "inline-flex bg-rose-500/10 border border-rose-50s/20 text-rose-600 text-[10px] px-3 py-1 rounded-full font-bold select-none leading-none items-center gap-1";
        document.getElementById('voucher-paid-status').innerText = state.language === 'ar' ? 'ملغي ومسترد بالكامل لبطاقتكم' : '✗ Cancelled & Fully Refunded through safe card routing';
    }

    modal.classList.remove('hidden');
    lucide.createIcons();
}

window.openVoucherFromRow = (id) => {
    const booking = state.bookings.find(b => b.id === id);
    if (booking) openVoucherModal(booking);
};

// -------------------------------------------------------------
// Member dashboard panel loops
// -------------------------------------------------------------
function renderBookingsHistory() {
    const list = document.getElementById('bookings-history-list');
    const empty = document.getElementById('bookings-empty-state');
    list.innerHTML = '';

    if (state.bookings.length === 0) {
        empty.classList.remove('hidden');
        return;
    }
    empty.classList.add('hidden');

    state.bookings.forEach(booking => {
        const isConfirmed = booking.status === 'confirmed';
        const badgeClass = isConfirmed 
            ? "inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[10px] px-3 py-1 rounded-full font-bold border border-emerald-500/20"
            : "inline-flex items-center gap-1 bg-rose-550/10 text-rose-400 text-[10px] px-3 py-1 rounded-full font-bold border border-rose-500/20";
        const badgeText = isConfirmed 
            ? (state.language === 'ar' ? 'مؤكد ونشط بالمنصة' : 'Confirmed & Live')
            : (state.language === 'ar' ? 'ملغي ومسترد' : 'Cancelled & Refunded');

        bookingCardHtml = `
            <div class="p-5 sm:p-6 rounded-3xl border border-slate-800 bg-[#0f172a]/30 mb-4 hover:border-amber-500/10 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-right">
                
                <div class="flex items-center gap-4 text-right flex-row-reverse w-full sm:w-auto">
                    <img src="${booking.hotelImage}" alt="Reserved hotel thumbnail" class="w-14 h-14 rounded-2xl object-cover shrink-0 select-none">
                    <div class="space-y-1">
                        <div class="flex items-center gap-2 flex-row-reverse">
                            <h4 class="font-sans font-black text-xs text-white leading-tight">${booking.hotelName}</h4>
                            <span class="${badgeClass}">${badgeText}</span>
                        </div>
                        <p class="text-[10px] text-slate-400 font-bold leading-none">${state.language === 'ar' ? 'جناح الإقامة' : 'Suite room category'}: ${booking.roomType}</p>
                        <p class="text-[9.5px] text-slate-500 leading-none">فترة الإقامة: ${booking.checkIn} إلى ${booking.checkOut}</p>
                    </div>
                </div>

                <div class="sm:border-r border-slate-850 sm:pr-6 flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto shrink-0 flex-row-reverse sm:flex-row">
                    <div class="text-right">
                        <span class="text-[8px] text-slate-505 block leading-none font-bold uppercase">${state.language === 'ar' ? 'التكلفة المدفوعة' : 'Net Cost Allocated'}</span>
                        <span class="text-white font-mono text-sm block mt-1 font-black leading-none">$${booking.amount} ${booking.currency}</span>
                    </div>

                    <div class="flex gap-2">
                        <!-- Invoice viewing -->
                        <button class="px-4 py-2 border rounded-xl text-[10px] font-black tracking-wide border-slate-850 hover:border-amber-500/25 text-slate-350 cursor-pointer active:scale-95 transition" onclick="openVoucherFromRow('${booking.id}')">
                            ${state.language === 'ar' ? 'معاينة القسيمة والدفع' : 'View Invoice Voucher'}
                        </button>
                        
                        <!-- Cancellation -->
                        ${isConfirmed ? `
                        <button class="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-[10px] font-black tracking-wide cursor-pointer active:scale-95 transition" onclick="cancelBooking('${booking.id}')">
                            ${state.language === 'ar' ? 'إلغاء الحجز الفندقي' : 'Cancel Contract'}
                        </button>
                        ` : ''}
                    </div>
                </div>

            </div>
        `;
        list.innerHTML += bookingCardHtml;
    });

    // Update loyalty statistics cards
    const confirmedCount = state.bookings.filter(b => b.status === 'confirmed').length;
    const confirmedNights = state.bookings.filter(b => b.status === 'confirmed').reduce((acc, booking) => {
        const cin = new Date(booking.checkIn);
        const cout = new Date(booking.checkOut);
        return acc + Math.ceil((cout - cin) / 86450000 || 1);
    }, 0);

    // Render stats counts inside member cards elements
    document.getElementById('stats-trips-count').innerText = `${confirmedCount} ${state.language === 'ar' ? 'رحلة' : 'escapes'}`;
    document.getElementById('stats-nights-count').innerText = `${confirmedNights} ${state.language === 'ar' ? 'ليالٍ' : 'nights'}`;
}

function renderFavoritesFavoritesSidebar() {
    const list = document.getElementById('saved-favorites-sidebar-list');
    list.innerHTML = '';

    const wishListHotels = state.allHotels.filter(h => state.wishedHotelIds.includes(h.id));

    if (wishListHotels.length === 0) {
        list.innerHTML = `<p class="text-[11px] text-slate-500 leading-normal text-right mt-2">${state.language === 'ar' ? 'قائمتك خالية حالياً، علم بقلب ذهبي فنادقك المفضلة!' : 'Your favorites list is empty.'}</p>`;
        return;
    }

    wishListHotels.slice(0, 4).forEach(fav => {
        list.innerHTML += `
            <div class="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-850 flex items-center gap-3 text-right flex-row-reverse hover:border-amber-550/15 cursor-pointer" onclick="openDetails('${fav.id}')">
                <img src="${fav.images[0]}" alt="Fav hotel image" class="w-10 h-10 rounded-xl object-cover shrink-0 select-none">
                <div class="flex-1 space-y-0.5 max-w-[170px]">
                    <h5 class="font-sans font-black text-[11px] text-white truncate leading-tight">${fav.name}</h5>
                    <span class="text-[8.5px] text-amber-500 font-mono block leading-none">$${fav.minPrice} USD</span>
                </div>
            </div>
        `;
    });
}

// -------------------------------------------------------------
// Interactive Chatbot AI Engine layouts
// -------------------------------------------------------------
function renderChat() {
    const box = document.getElementById('chatbot-messages-box');
    box.innerHTML = '';
    
    state.chatMessages.forEach(msg => {
        const isLayla = msg.sender === 'layla';
        const msgStyle = isLayla 
            ? "bg-slate-950/45 border border-slate-850/80 text-slate-300 rounded-2xl p-3.5 space-y-1 max-w-[85%] self-end"
            : "bg-amber-500 text-slate-950 font-black rounded-2xl p-3 max-w-[80%] self-start";
        const alignment = isLayla ? "items-start" : "items-end";
        const messageHtml = `
            <div class="flex flex-col ${alignment} text-right">
                <div class="${msgStyle}">
                    <p class="text-[11px] sm:text-xs leading-relaxed font-bold">${msg.text}</p>
                </div>
            </div>
        `;
        box.innerHTML += messageHtml;
    });

    // Instantly scroll bottom message list
    box.scrollTop = box.scrollHeight;
}

async function handleChatSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('chatbot-input-txt');
    const txt = input.value.trim();
    if (!txt) return;

    state.chatMessages.push({ sender: 'user', text: txt });
    input.value = '';
    renderChat();

    // typing bubble loader trigger simulator
    const typing = document.getElementById('chatbot-typing-bubble');
    typing.classList.remove('hidden');
    typing.classList.add('flex');

    const assistantAnswer = getAIResponse(txt);

    // delay response
    setTimeout(() => {
        typing.classList.add('hidden');
        typing.classList.remove('flex');
        state.chatMessages.push({ sender: 'layla', text: assistantAnswer });
        renderChat();
    }, 1200);
}

// Interactive prompt response solver
function getAIResponse(prompt) {
    const q = prompt.toLowerCase();
    const isAr = state.language === 'ar';

    if (q.includes('cancellation') || q.includes('إلغاء') || q.includes('الغاء')) {
        return isAr 
            ? 'تلتزم المنصة بتعليمات الإلغاء الشفافة بالكامل. تختلف الحدود من ليلة إلى أخرى بحسب الفندق والوصول. يرجى مراجعة تفاصيل العروض للاستكشاف!'
            : 'Elite members benefit from complimentary cancellation up to 48 hours before check-in on most premium reservations. Penalty criteria depend on selected rate plans.';
    }
    if (q.includes('tokyo') || q.includes('طوكيو') || q.includes('اليابان')) {
        return isAr 
            ? 'صروح طوكيو (Aman Tokyo، Hoshinoya Tokyo) تتوفر بخصومات بلاتينية مغرية للغاية. هل تريد السفر لليالي القادمة؟'
            : 'Tokyo houses our most serene zen-inspired suites like Aman Tokyo and Hoshinoya skyscraper ryokan, fully certified with direct custom high fidelity onsen pools.';
    }
    if (q.includes('discount') || q.includes('خصم') || q.includes('كود')) {
        return isAr 
            ? 'الكود النشط بالكامل الآن للـ VIP هو ELITE20 وهو يمنح خصماً بقيمة 20% لكود العضوية البلاتينية.'
            : 'The active premium voucher code is ELITE20, adding absolute 20% off directly on checkout. Put this on passenger details notes.';
    }
    return isAr 
        ? 'بصفتي مستشارك الخاص، حجز الغرف فوراً يدعم التواريخ المختارة بنسب خصم الباقة الذهبية الشركاء. هل يمكنني مساعدتك ببيانات الدفع؟'
        : 'Sovereign support is online tracking live rates. Let me know if you would like me to assist you with passengers passport verification forms.';
}

// -------------------------------------------------------------
// Global Configuration Handlers (Theme, Language, Login)
// -------------------------------------------------------------
function toggleTheme() {
    state.isDarkMode = !state.isDarkMode;
    updateThemeUI();
    logAction('CLIENT', 'THEME_TOGGLE', 200, 2, 'Render theme styles switched.');
}

function updateThemeUI() {
    const root = document.documentElement;
    const btn = document.getElementById('btn-theme-toggler');
    const header = document.getElementById('app-navbar');

    if (state.isDarkMode) {
        root.classList.add('dark');
        document.body.className = "min-h-screen flex flex-col font-sans select-none antialiased transition-colors duration-500 bg-[#0b0f19] text-slate-100 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111827] via-[#0b0f19] to-[#030712]";
        header.className = "sticky top-0 z-50 transition-all duration-500 border-b bg-[#0f172a]/65 backdrop-blur-xl border-amber-500/15 shadow-xl shadow-amber-950/20";
        btn.innerHTML = `<i data-lucide="sun" class="w-4 h-4 text-amber-400"></i>`;
    } else {
        root.classList.remove('dark');
        document.body.className = "min-h-screen flex flex-col font-sans select-none antialiased transition-colors duration-500 bg-slate-50 text-slate-900";
        header.className = "sticky top-0 z-50 transition-all duration-500 border-b bg-white/85 backdrop-blur-xl border-slate-200/80 shadow-sm";
        btn.innerHTML = `<i data-lucide="moon" class="w-4 h-4 text-slate-700"></i>`;
    }
    lucide.createIcons();
}

function toggleLanguage() {
    state.language = state.language === 'ar' ? 'en' : 'ar';
    document.getElementById('btn-language-switcher').innerText = state.language === 'ar' ? 'English' : 'العربية';
    
    // Rerender lists
    syncView();
    showToast(state.language === 'ar' ? 'تم تحويل الواجهة بالكامل للغة العربية' : 'Sovereign UI dictionary successfully switched to LTR english', 'info');
}

function switchTab(tab) {
    state.currentTab = tab;
    syncView();
}

// Setup Dialog triggers login
function openLoginModal() {
    document.getElementById('login-modal').classList.remove('hidden');
}

function toggleLoginTab(isSignin) {
    const signinTab = document.getElementById('login-tab-signin');
    const signupTab = document.getElementById('login-tab-signup');
    const extraBlock = document.getElementById('signup-extra-name-block');

    if (isSignin) {
        signinTab.className = "py-2 rounded-lg text-xs cursor-pointer bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black";
        signupTab.className = "py-2 rounded-lg text-xs cursor-pointer text-slate-400 hover:text-slate-200";
        extraBlock.classList.add('hidden');
    } else {
        signupTab.className = "py-2 rounded-lg text-xs cursor-pointer bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black";
        signinTab.className = "py-2 rounded-lg text-xs cursor-pointer text-slate-400 hover:text-slate-200";
        extraBlock.classList.remove('hidden');
    }
}

function handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('login-auth-email').value;
    const nameVal = document.getElementById('login-auth-fullname').value || "ABDELWAHAB ADEL";

    // Set Name visuals
    document.getElementById('global-login-name').innerText = nameVal.toUpperCase();
    document.getElementById('login-modal').classList.add('hidden');
    showToast(state.language === 'ar' ? `مرحباً بك مجدداً د. ${nameVal}` : `Access verified. Welcome back Elite Member: ${nameVal}`, 'success');
}

// -------------------------------------------------------------
// Interactive Toast elements and marquee decrement clocks
// -------------------------------------------------------------
function showToast(message, type = 'info') {
    const stack = document.getElementById('toast-stack');
    const toast = document.createElement('div');

    const bg = type === 'success' 
        ? 'bg-emerald-900/90 border-emerald-500' 
        : (type === 'error' ? 'bg-rose-900/90 border-rose-500' : 'bg-[#0f172a]/95 border-amber-500');

    const icon = type === 'success' ? 'check-circle' : (type === 'error' ? 'alert-triangle' : 'info');

    toast.className = `p-4 border-[1.5px] rounded-2xl shadow-2xl backdrop-blur text-right flex flex-row-reverse items-center gap-3.5 text-white text-xs font-bold leading-normal transform transition-all duration-300 scale-95 opacity-0 ${bg}`;
    toast.innerHTML = `
        <i data-lucide="${icon}" class="w-5 h-5 shrink-0"></i>
        <span>${message}</span>
    `;

    stack.appendChild(toast);
    lucide.createIcons();

    // animation slide
    setTimeout(() => {
        toast.classList.remove('scale-95', 'opacity-0');
        toast.classList.add('scale-100', 'opacity-100');
    }, 20);

    // auto dismiss
    setTimeout(() => {
        toast.classList.add('scale-95', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 4500);
}

// Countdown decrementor clockwise updates on tickers
function startCountdown() {
    setInterval(() => {
        const time = state.promoTimeLeft;
        time.seconds--;

        if (time.seconds < 0) {
            time.seconds = 59;
            time.minutes--;

            if (time.minutes < 0) {
                time.minutes = 59;
                time.hours--;

                if (time.hours < 0) {
                    time.hours = 8; // refresh cycle
                }
            }
        }

        const hrs = String(time.hours).padStart(2, '0');
        const mins = String(time.minutes).padStart(2, '0');
        const secs = String(time.seconds).padStart(2, '0');

        const label = state.language === 'ar' 
            ? `خصم فوري 20% للـ VIP: ELITE20 | ينتهي العرض خلال: ${hrs}:${mins}:${secs}` 
            : `Exclusive VIP 20% off: ELITE20 | Flash deal expires in: ${hrs}:${mins}:${secs}`;

        document.getElementById('ticker-promo-text').innerText = label;
    }, 1000);
}
