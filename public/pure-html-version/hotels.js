/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Hotels Database & API Integration Module
 */

(function () {
  'use strict';

  // Mock Hotels Database
  const hotelsDatabase = [
    {
      id: 'HOTEL_001',
      name: 'Palace Downtown Dubai',
      city: 'Dubai',
      countryCode: 'AE',
      address: 'Sheikh Mohammed Blvd, Downtown',
      stars: 5,
      minPrice: 380,
      images: [
        'https://images.unsplash.com/photo-1551632786-fb3f1e6dc434?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'فندق فاخر من فئة الخمس نجوم مع إطلالات ساحرة على برج خليفة والخليج العربي. يتمتع بخدمة عملاء من الدرجة الأولى وتجهيزات حديثة.',
      amenities: ['واي فاي مجاني', 'جيم بحري متكامل', 'مطاعم عالمية', 'سبا فاخر', 'موقف سيارات مغطى'],
      reviews: [
        {
          author: 'أحمد الشمري',
          rating: 5,
          comment: 'تجربة لا تنسى! الخدمة رائعة والموقع ممتاز جداً.',
          avatar: 'https://i.pravatar.cc/40?img=1',
          date: '2026-05-20'
        }
      ]
    },
    {
      id: 'HOTEL_002',
      name: 'Cairo Pyramids Luxury Resort',
      city: 'Cairo',
      countryCode: 'EG',
      address: 'Giza, Cairo',
      stars: 5,
      minPrice: 250,
      images: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'منتجع فاخر يطل على الأهرامات الكبرى مع خدمات فندقية من الدرجة الأولى وراحة لا مثيل لها.',
      amenities: ['إطلالة على الأهرام', 'مسبح موسمي', 'مطعم فرنسي', 'كونسيرج 24 ساعة'],
      reviews: [
        {
          author: 'فاطمة الدعيج',
          rating: 4.5,
          comment: 'الموقع مميز والخدمة احترافية جداً.',
          avatar: 'https://i.pravatar.cc/40?img=2',
          date: '2026-05-18'
        }
      ]
    },
    {
      id: 'HOTEL_003',
      name: 'Tokyo Imperial Suite',
      city: 'Tokyo',
      countryCode: 'JP',
      address: 'Shibuya, Tokyo',
      stars: 5,
      minPrice: 320,
      images: [
        'https://images.unsplash.com/photo-1559599810-46394ff8addb?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'فندق من الطراز الياباني الحديث مع تجربة فريدة تجمع بين الفخامة والتقاليد اليابانية.',
      amenities: ['حمام ياباني تقليدي', 'مطعم ياباني متميز', 'مكتبة تقنية عالية'],
      reviews: []
    },
    {
      id: 'HOTEL_004',
      name: 'Mandarin Oriental London',
      city: 'London',
      countryCode: 'GB',
      address: 'Knightsbridge, London',
      stars: 5,
      minPrice: 450,
      images: [
        'https://images.unsplash.com/photo-1570129477492-45a003537e1f?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'أحد أفخم الفنادق في لندن، يقدم خدمات بريطانية راقية مع موقع استثنائي في قلب المدينة.',
      amenities: ['مطعم ميشلان', 'سبا فاخر', 'مكتبة تاريخية', 'خدمة درجة أولى'],
      reviews: []
    },
    {
      id: 'HOTEL_005',
      name: 'Bellagio Las Vegas',
      city: 'Las Vegas',
      countryCode: 'US',
      address: 'The Strip, Las Vegas',
      stars: 5,
      minPrice: 280,
      images: [
        'https://images.unsplash.com/photo-1578894691223-64a35aff9737?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'فندق أسطوري على شارع الستريب بلاس فيجاس يشهر بنوافيره الراقصة وغرفه الفاخرة.',
      amenities: ['نافورات راقصة', 'مطاعم عالمية', 'كازينو فاخر', 'حفلات موسيقية'],
      reviews: []
    }
  ];

  // Countries Data
  const countriesData = [
    { code: 'AE', name: 'الإمارات العربية المتحدة' },
    { code: 'EG', name: 'مصر' },
    { code: 'JP', name: 'اليابان' },
    { code: 'US', name: 'الولايات المتحدة' },
    { code: 'GB', name: 'المملكة المتحدة' },
    { code: 'FR', name: 'فرنسا' },
    { code: 'IT', name: 'إيطاليا' }
  ];

  // Cities Data
  const citiesData = [
    { id: 'CITY_001', name: 'Dubai', countryCode: 'AE' },
    { id: 'CITY_002', name: 'Cairo', countryCode: 'EG' },
    { id: 'CITY_003', name: 'Tokyo', countryCode: 'JP' },
    { id: 'CITY_004', name: 'New York', countryCode: 'US' },
    { id: 'CITY_005', name: 'London', countryCode: 'GB' },
    { id: 'CITY_006', name: 'Paris', countryCode: 'FR' },
    { id: 'CITY_007', name: 'Rome', countryCode: 'IT' }
  ];

  // Expose data to window
  window.hotelsData = hotelsDatabase;
  window.countriesData = countriesData;
  window.citiesData = citiesData;

  // Helper: Generate rates for a hotel
  window.generateRatesForPureHotel = function (hotelId, checkIn, checkOut, guests = 2) {
    const roomTypes = [
      { id: 'RATE_001', roomType: 'غرفة فردية فاخرة', boardType: 'إقامة فقط', price: 150, cancellationPolicy: { deadline: '30 يونيو 2026' } },
      { id: 'RATE_002', roomType: 'غرفة مزدوجة ملكية', boardType: 'إقامة + إفطار', price: 250, cancellationPolicy: { deadline: '25 يونيو 2026' } },
      { id: 'RATE_003', roomType: 'جناح رئاسي', boardType: 'اليحق الكامل', price: 450, cancellationPolicy: { deadline: '20 يونيو 2026' } }
    ];
    return roomTypes;
  };

  console.log('✓ Hotels Database Module Loaded Successfully');
})();
