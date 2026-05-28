/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Country, City, Hotel, Rate } from './types';

export const mockCountries: Country[] = [
  { code: 'US', name: 'United States' },
  { code: 'FR', name: 'France' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'JP', name: 'Japan' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'EG', name: 'Egypt' },
  { code: 'IT', name: 'Italy' }
];

export const mockCities: City[] = [
  // US
  { id: 'US-NYC', name: 'New York', countryCode: 'US' },
  { id: 'US-LAX', name: 'Los Angeles', countryCode: 'US' },
  // FR
  { id: 'FR-PAR', name: 'Paris', countryCode: 'FR' },
  // AE
  { id: 'AE-DXB', name: 'Dubai', countryCode: 'AE' },
  // JP
  { id: 'JP-TYO', name: 'Tokyo', countryCode: 'JP' },
  // GB
  { id: 'GB-LON', name: 'London', countryCode: 'GB' },
  // EG
  { id: 'EG-CAI', name: 'Cairo', countryCode: 'EG' },
  { id: 'EG-SSH', name: 'Sharm El Sheikh', countryCode: 'EG' },
  // IT
  { id: 'IT-ROM', name: 'Rome', countryCode: 'IT' },
  { id: 'IT-VEN', name: 'Venice', countryCode: 'IT' }
];

export const mockHotels: Hotel[] = [
  // Dubai Hotels
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
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'
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
      'https://images.unsplash.com/photo-1542314831-236800d1c5d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Waterpark Access', 'Michelin Restaurants', 'Rooftop Lounge', 'Helicopter Transfer', 'Private Beach', 'Hydrotherapy Spa'],
    minPrice: 650
  },
  {
    id: 'HOTEL-DXB-003',
    name: 'Marina Marina Hotel',
    stars: 4,
    rating: 4.3,
    description: 'Perfectly located in Dubai Marina, this stylish 4-star destination provides incredible waterfront views, convenient tram access, modern tech-driven rooms, and a buzzing outdoor terrace.',
    address: 'Al Marsa Street, Dubai Marina',
    city: 'Dubai',
    countryCode: 'AE',
    coordinates: { lat: 25.0768, lng: 55.1372 },
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Marina View', 'Outdoor Pool', 'Metro Access', 'Smart TV', 'Rooftop Bar', 'Business Lounge'],
    minPrice: 160
  },
  {
    id: 'HOTEL-DXB-004',
    name: 'Burj Al Arab Jumeirah',
    stars: 5,
    rating: 4.9,
    description: 'The global icon of Arabian luxury, this sail-shaped architectural masterpiece stands on a private island, featuring 24-carat gold interiors, personal butlers, and an unmatched beachfront platform.',
    address: 'Jumeirah Street, Dubai',
    city: 'Dubai',
    countryCode: 'AE',
    coordinates: { lat: 25.1412, lng: 55.1861 },
    images: [
      'https://images.unsplash.com/photo-1549918838-7cd3470b24de?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Helipad Access', '24H Butler', 'Private Beach Club', 'Indoor & Outdoor Pools', 'Luxury Spa', 'Rolls Royce Shuttle'],
    minPrice: 1200
  },
  {
    id: 'HOTEL-DXB-005',
    name: "One&Only One Za'abeel",
    stars: 5,
    rating: 4.8,
    description: "Dubai's ultra-premium urban resort, housing 'The Link', the world's longest suspended sky bridge cantilever. Features Michelin-grade dining and stunning modern suites.",
    address: "Za'abeel 1, Dubai",
    city: 'Dubai',
    countryCode: 'AE',
    coordinates: { lat: 25.2281, lng: 55.2995 },
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Suspended Sky Pool', 'Panoramic Views', 'Michelin Stars Gym', 'Private elevator', 'Japanese Spa'],
    minPrice: 450
  },

  // Cairo Hotels
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
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1585983224974-084a8e065e76?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Pyramid View', 'Historic Gardens', 'Golf Course', 'Heated Pool', 'Oriental Spa', 'Tennis Courts', '24H Room Service'],
    minPrice: 290
  },
  {
    id: 'HOTEL-CAI-002',
    name: 'The Ritz-Carlton Nile Cairo',
    stars: 5,
    rating: 4.7,
    description: 'Located in the heart of downtown Cairo, overlooking the iconic River Nile and Steps from the Egyptian Museum. Features refined luxury, modern Egyptian artwork, elegant casino, and Nile view dining.',
    address: '1113 Corniche El Nil, Cairo',
    city: 'Cairo',
    countryCode: 'EG',
    coordinates: { lat: 30.0467, lng: 31.2312 },
    images: [
      'https://images.unsplash.com/photo-1549294413-26f195afcbdb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Nile View', 'Rooftop Lounge', 'Luxury Casino', 'Full Spa', 'Olympic Pool', 'Museum Access Panel'],
    minPrice: 320
  },
  {
    id: 'HOTEL-CAI-003',
    name: 'The St. Regis Cairo',
    stars: 5,
    rating: 4.8,
    description: 'Rising grandly above the ancient Nile River, this modern palace defines legendary luxurious design, boasting high ceilings, bespoke luxury suites, and signature Ritz style round-the-clock personal butler service.',
    address: '1189 Corniche El Nil, Cairo',
    city: 'Cairo',
    countryCode: 'EG',
    coordinates: { lat: 30.0521, lng: 31.2335 },
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Panoramic Nile Balcony', 'St. Regis Bar', 'Round-the-clock Butler', 'Indoor Thermal Pool', 'Michelin Restaurant'],
    minPrice: 340
  },

  // Sharm El Sheikh Hotels
  {
    id: 'HOTEL-SSH-001',
    name: 'Four Seasons Resort Sharm El Sheikh',
    stars: 5,
    rating: 4.9,
    description: 'A vibrant hillside oasis washed by the clear waters of the Red Sea. Dive in coral reefs, walk along private white beaches, and retreat to private pool villas styled with classical Arabian arches.',
    address: '1 Four Seasons Boulevard, Nabq, Sharm El Sheikh',
    city: 'Sharm El Sheikh',
    countryCode: 'EG',
    coordinates: { lat: 27.9621, lng: 34.3912 },
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['House Reef Diving', 'Private White Sand Beach', 'Infinity Pools', 'Multi-room Villas', 'Teens Club', 'Beachside Grill'],
    minPrice: 420
  },
  {
    id: 'HOTEL-SSH-002',
    name: 'Rixos Premium Seagate',
    stars: 5,
    rating: 4.6,
    description: 'An expansive modern beach paradise with a pristine house reef. Indulge in culinary varieties across 9 restaurants, premium spa structures, and an on-site professional aquapark.',
    address: 'Nabq Bay, Sharm El Sheikh',
    city: 'Sharm El Sheikh',
    countryCode: 'EG',
    coordinates: { lat: 28.0211, lng: 34.4285 },
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Ultra All-Inclusive', '9 Gourmet Buffet Halls', 'Professional Diving Center', 'Waterpark Access', 'Turkish Spa'],
    minPrice: 310
  },

  // Paris Hotels
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
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Eiffel Tower View', 'Dior Spa', 'Courtyard Garden', 'Michelin Restaurant', 'Chauffeur Service', 'Personal Butler'],
    minPrice: 790
  },
  {
    id: 'HOTEL-PAR-002',
    name: 'Les Jardins de la Tour',
    stars: 3,
    rating: 4.1,
    description: 'A charming, traditional boutique lodging nestled in a quiet street, just 10 minutes walk to the Champ de Mars and Eiffel Tower. Traditional wooden floors and classic Parisian croissants.',
    address: '12 Rue de l Exposition, 75007 Paris',
    city: 'Paris',
    countryCode: 'FR',
    coordinates: { lat: 48.8575, lng: 2.3033 },
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Eiffel Tower Walking Distance', 'Croissant Breakfast', 'Eco-friendly', 'Luggage Storage', 'Lobby Library'],
    minPrice: 110
  },
  {
    id: 'HOTEL-PAR-003',
    name: 'The Ritz Paris',
    stars: 5,
    rating: 4.9,
    description: 'The historic landmark of absolute prestige. Enjoy high luxury suites loaded with authentic artworks, a neoclassic swimming pool, and cocktails at the world-famous Hemingway Bar.',
    address: '15 Place Vendôme, 75001 Paris',
    city: 'Paris',
    countryCode: 'FR',
    coordinates: { lat: 48.8681, lng: 2.3292 },
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Palace Status', 'Pool & Spa Club', 'Bar Hemingway', 'Gardorial Terraces', 'Bespoke Private Entry'],
    minPrice: 950
  },

  // New York Hotels
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
      'https://images.unsplash.com/photo-1554009975-d74653b879f1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549046030-be001f70fb67?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Central Park View', 'Guerlain Spa', 'Champagne Bar', 'Butler Service', 'Historic Palm Court', 'Penthouse Suites'],
    minPrice: 580
  },
  {
    id: 'HOTEL-NYC-002',
    name: 'Baccarat Hotel New York',
    stars: 5,
    rating: 4.9,
    description: 'Glistening with fine French crystal craftsmanship, this masterpiece hotel is directly across from the MoMA. Boasting custom crystal interiors, Grand Salon teas, and highly creative luxury suites.',
    address: '28 West 53rd Street, Midtown, New York',
    city: 'New York',
    countryCode: 'US',
    coordinates: { lat: 40.7611, lng: -73.9782 },
    images: [
      'https://images.unsplash.com/photo-1549046030-be001f70fb67?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1554009975-d74653b879f1?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Baccarat Crystal Decors', 'Heated Indoor Pool', 'Grand Salon Tea', 'La Mer Spa', 'Private Chauffeur'],
    minPrice: 750
  },

  // Los Angeles Hotels
  {
    id: 'HOTEL-LAX-001',
    name: 'The Beverly Hills Hotel',
    stars: 5,
    rating: 4.9,
    description: 'The legendary "Pink Palace", surrounded by 12 acres of tropical gardens. Home to Hollywood legends for almost a century, featuring the historic Polo Lounge and private bungalows.',
    address: '9641 Sunset Boulevard, Beverly Hills, Los Angeles',
    city: 'Los Angeles',
    countryCode: 'US',
    coordinates: { lat: 34.0811, lng: -118.4138 },
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Hollywood Bungalows', 'Polo Lounge Dining', 'Palm Pool Cabanas', 'Private Spa Complex', 'VIP Red Carpet Entrance'],
    minPrice: 720
  },
  {
    id: 'HOTEL-LAX-002',
    name: 'Waldorf Astoria Beverly Hills',
    stars: 5,
    rating: 4.8,
    description: 'Sleek, streamlined Parisian-modern styling defines this West Coast hub. Features a marvelous rooftop pool terrace and 360-degree stunning views of Beverly Hills and downtown Los Angeles.',
    address: '9850 Wilshire Boulevard, Beverly Hills, Los Angeles',
    city: 'Los Angeles',
    countryCode: 'US',
    coordinates: { lat: 34.0768, lng: -118.4112 },
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Rooftop Pool Deck', 'Jean-Georges Restaurant', 'La Prairie Spa', 'Personal Concierges', 'Luxury Town Cars'],
    minPrice: 680
  },

  // Tokyo Hotels
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
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Imperial Garden View', 'Traditional Onsen Bath', 'Indoor lap pool', 'Zen Garden Atrium', 'Sake Lounge', 'Bespoke Tatami Rooms'],
    minPrice: 850
  },
  {
    id: 'HOTEL-TYO-002',
    name: 'Hoshinoya Tokyo',
    stars: 5,
    rating: 4.9,
    description: 'A grand modern skyscraper ryokan. Guests step in on tatami carpets and enjoy natural hot spring baths sourced from deep underground, alongside premium private tea lounges.',
    address: '1-9-1 Otemachi, Chiyoda-ku, Tokyo',
    city: 'Tokyo',
    countryCode: 'JP',
    coordinates: { lat: 35.6875, lng: 139.7651 },
    images: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-236800d1c5d8?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Natural Underground Onsen', 'Japanese Kaiseki Luxury', 'Zazen Meditation Classes', 'Sake Tastings', 'Classic Kimono Hires'],
    minPrice: 910
  },

  // London Hotels
  {
    id: 'HOTEL-GB-001',
    name: 'The Savoy London',
    stars: 5,
    rating: 4.8,
    description: 'Located on the North Bank of the River Thames, The Savoy is one of Londons most famous and beloved hotels. Featuring peerless style, historic American Bar, and Royal suites overlooking the river.',
    address: 'Strand, London WC2R 0EU',
    city: 'London',
    countryCode: 'GB',
    coordinates: { lat: 51.5101, lng: -0.1204 },
    images: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Thames View', 'Savoy Grill (Gordon Ramsay)', 'American Bar', 'Luxury Chauffeur', 'Indoor Swimming Pool'],
    minPrice: 520
  },
  {
    id: 'HOTEL-GB-002',
    name: "Claridge's London",
    stars: 5,
    rating: 4.9,
    description: "The ultimate Mayfair art deco landmark, celebrated worldwide for outstanding prestige, luxurious traditional high afternoon tea ceremonies, and exquisite custom grand suites.",
    address: 'Brook Street, Mayfair, London',
    city: 'London',
    countryCode: 'GB',
    coordinates: { lat: 51.5125, lng: -0.1478 },
    images: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Historic Afternoon Tea', 'Foyer & Reading Rooms', 'Royal Concierges', 'Fully Stocked Piano Bars', 'Chauffeur Driven Rollside'],
    minPrice: 690
  },

  // Italy - Rome Hotels
  {
    id: 'HOTEL-ROM-001',
    name: 'Hotel de Russie Rome',
    stars: 5,
    rating: 4.8,
    description: 'A stylish palace located between the Spanish Steps and Piazza del Popolo. Highlighted by its stunning terraced Mediterranean secret gardens and elite, serene cocktail bars.',
    address: 'Via del Babuino 9, Rome',
    city: 'Rome',
    countryCode: 'IT',
    coordinates: { lat: 41.9092, lng: 12.4781 },
    images: [
      'https://images.unsplash.com/photo-1531572753302-ad06652983d6?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Mediterranean Secret Terraces', 'Stravinskij Garden Bar', 'Full Hydrotherapy Spa', 'Personalized Shopping Companion'],
    minPrice: 610
  },
  {
    id: 'HOTEL-ROM-002',
    name: 'The St. Regis Rome',
    stars: 5,
    rating: 4.7,
    description: 'Opened in 1894 as the grandest hotel in Rome. Features exceptional historic murals, massive scale Murano crystal chandeliers, and prestigious classical butler-themed rooms.',
    address: 'Via Vittorio Emanuele Orlando 3, Rome',
    city: 'Rome',
    countryCode: 'IT',
    coordinates: { lat: 41.9029, lng: 12.4944 },
    images: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Palace Historical Ballroom', 'Bespoke St. Regis Butler', 'Direct Ritz Hospitality Lounge', 'Private Wine Cellar Tours'],
    minPrice: 550
  },

  // Italy - Venice Hotels
  {
    id: 'HOTEL-VEN-001',
    name: 'Hotel Danieli Venice',
    stars: 5,
    rating: 4.8,
    description: 'Commanding views of the Venetian lagoon adjacent to St. Mark\'s Square. Composed of 14th-century luxury palaces brimming with classic gothic architecture and gold details.',
    address: 'Riva degli Schiavoni 4196, Venice',
    city: 'Venice',
    countryCode: 'IT',
    coordinates: { lat: 45.4341, lng: 12.3421 },
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Lagoon Panoramic Dining', 'Palazzo Dandolo Historic Atrium', 'Private Gondola Stations', 'Silk Wall Coverings'],
    minPrice: 660
  },
  {
    id: 'HOTEL-VEN-002',
    name: 'Belmond Hotel Cipriani Venice',
    stars: 5,
    rating: 4.9,
    description: "Nestled on Giudecca Island, Venice's most pristine private luxury estate. Home to the city's only Olympic-sized heated pool, spectacular private gardens, and custom water shuttles.",
    address: 'Giudecca 10, Venice',
    city: 'Venice',
    countryCode: 'IT',
    coordinates: { lat: 45.4285, lng: 12.3395 },
    images: [
      'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Olympic Heated Swimming Pool', 'Private Lagoon Yacht Cruises', 'Michelin Starred Fine Dining', 'Private Waterside Cabanas', 'Redwood Garden Bars'],
    minPrice: 980
  },
  {
    id: 'HOTEL-CAI-004',
    name: 'Four Seasons Hotel Cairo at First Residence',
    stars: 5,
    rating: 4.8,
    description: 'Located in the prestigious First Mall complex, featuring breathtaking Nile views, premium French-style spa facilities, and unmatched Egyptian hospitality.',
    address: '35 Giza Street, Cairo',
    city: 'Cairo',
    countryCode: 'EG',
    coordinates: { lat: 30.0215, lng: 31.2185 },
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Nile River Views', 'Full-service Spa', 'Outdoor Pool', 'Shopping Center Access', 'Authentic Syrian Dining'],
    minPrice: 360
  },
  {
    id: 'HOTEL-CAI-005',
    name: 'Sofitel Cairo Nile El Gezirah',
    stars: 5,
    rating: 4.6,
    description: 'A French luxury oasis on the quiet tip of El Gezirah island, with 360-degree Nile views, infinity pool, and dynamic riverside dining terraces.',
    address: '3 El Thawra Council Street, Zamalek, Cairo',
    city: 'Cairo',
    countryCode: 'EG',
    coordinates: { lat: 30.0385, lng: 31.2231 },
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Island Location', 'Infinity Heated Pool', 'Rotary Sky Bar', 'French-Arabic Fusion Spa', 'Open Air Riverside Dining'],
    minPrice: 280
  },
  {
    id: 'HOTEL-SSH-003',
    name: 'The Royal Savoy Sharm El Sheikh',
    stars: 5,
    rating: 4.7,
    description: 'An exclusive sanctuary with private pools, lush gardens, and premium club rooms, providing unparalleled privacy and direct Red Sea beach access.',
    address: 'Soho Square, Sharm El Sheikh',
    city: 'Sharm El Sheikh',
    countryCode: 'EG',
    coordinates: { lat: 27.9715, lng: 34.4124 },
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Private Beach Side', 'Exclusive Lounge', 'Standard Diver Center', 'Luxury Royal Spa', 'Soho Square Access'],
    minPrice: 350
  },
  {
    id: 'HOTEL-PAR-004',
    name: 'Shangri-La Paris',
    stars: 5,
    rating: 4.8,
    description: 'The former residence of Prince Roland Bonaparte, offering unmatched historic elegance, a Michelin-starred Chinese restaurant, and jaw-dropping Eiffel Tower balconies.',
    address: "10 Avenue d'Iéna, 75116 Paris",
    city: 'Paris',
    countryCode: 'FR',
    coordinates: { lat: 48.8635, lng: 2.2938 },
    images: [
      'https://images.unsplash.com/photo-1549294413-26f195afcbdb?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Eiffel Tower Balconies', 'Historic Prince Residence', 'Michelin Chinese Dining', 'Indoor Pool & Spa', 'Classic French Gardens'],
    minPrice: 880
  },
  {
    id: 'HOTEL-PAR-005',
    name: 'Hôtel Lutetia Paris',
    stars: 5,
    rating: 4.7,
    description: 'The iconic landmark hotel on the Left Bank in the Saint-Germain-des-Prés area. Features gorgeous Art Deco design combined with high-tech contemporary comforts.',
    address: '45 Boulevard Raspail, 75006 Paris',
    city: 'Paris',
    countryCode: 'FR',
    coordinates: { lat: 48.8512, lng: 2.3275 },
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Saint-Germain Location', 'Art Deco Styling', 'Holistic Akasha Wellness', 'Stunning Cigar Lounge', 'Indoor Pool'],
    minPrice: 710
  },
  {
    id: 'HOTEL-NYC-003',
    name: 'The Greenwich Hotel New York',
    stars: 5,
    rating: 4.8,
    description: 'Nestled in Tribeca, this warm and homey luxury boutique hotel features uniquely decorated rooms with reclaimed wood, hand-woven carpets, and a tranquil Japanese-inspired subterranean pool.',
    address: '377 Greenwich Street, Tribeca, New York',
    city: 'New York',
    countryCode: 'US',
    coordinates: { lat: 40.7198, lng: -74.0112 },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Tribeca Boutique Style', 'Shibui Japanese Spa', 'Subterranean Heated Pool', 'Italian Locanda Dining', 'Drawing Room Lounge'],
    minPrice: 650
  },
  {
    id: 'HOTEL-NYC-004',
    name: '1 Hotel Brooklyn Bridge',
    stars: 5,
    rating: 4.7,
    description: 'An eco-luxury retreat located on the East River shoreline, with floor-to-ceiling windows showing breathtaking panoramic views of the Manhattan skyline and Brooklyn Bridge.',
    address: '60 Furman Street, Brooklyn, New York',
    city: 'New York',
    countryCode: 'US',
    coordinates: { lat: 40.7025, lng: -73.9961 },
    images: [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Skyline Rooftop Pool', 'Eco-conscious design', 'Brooklyn Bridge views', 'Modern Gym Arena', 'Locally Sourced Cafe'],
    minPrice: 480
  },
  {
    id: 'HOTEL-LAX-003',
    name: 'Shutters on the Beach Los Angeles',
    stars: 5,
    rating: 4.8,
    description: 'Set directly on Santa Monica Beach, this elegant gray-shingle seaside hideaway channels classic, breezy Cape Cod design on the sunny California coast.',
    address: '1 Pico Boulevard, Santa Monica, Los Angeles',
    city: 'Los Angeles',
    countryCode: 'US',
    coordinates: { lat: 34.0089, lng: -118.4912 },
    images: [
      'https://images.unsplash.com/photo-1554009975-d74653b879f1?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Beachfront Balconies', 'Outdoor Pool with Sea Breezes', '1 Pico Ocean Restaurant', 'Holistic Coastal Spa', 'Bicycle Rentals'],
    minPrice: 580
  },
  {
    id: 'HOTEL-TYO-003',
    name: 'The Ritz-Carlton Tokyo',
    stars: 5,
    rating: 4.8,
    description: 'Occupying the top nine floors of the Tokyo Midtown building, offering sweeping vistas of Mount Fuji and Tokyo skyline with impeccable custom suites and legendary dining.',
    address: '9-7-1 Akasaka, Minato-ku, Tokyo',
    city: 'Tokyo',
    countryCode: 'JP',
    coordinates: { lat: 35.6658, lng: 139.7308 },
    images: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Mount Fuji Views', 'High-rise Luxury Spa', 'Towers Grill Dining', 'Club Level Lounge', 'Sake & Whiskey Bars'],
    minPrice: 780
  },
  {
    id: 'HOTEL-TYO-004',
    name: 'Park Hyatt Tokyo',
    stars: 5,
    rating: 4.9,
    description: 'The legendary luxury oasis soaring high above Shinjuku, famous for its elegant design, top-floor New York Grill, and glass-atrium indoor pool overlooking Mount Fuji.',
    address: '3-7-1-2 Nishi-Shinjuku, Shinjuku-ku, Tokyo',
    city: 'Tokyo',
    countryCode: 'JP',
    coordinates: { lat: 35.6858, lng: 139.6912 },
    images: [
      'https://images.unsplash.com/photo-1542314831-236800d1c5d8?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Shinjuku High views', 'Peak Lounge High Tea', 'New York Grill Bar', 'Sky-atrium Spa Pool', 'Library Sanctuary'],
    minPrice: 820
  },
  {
    id: 'HOTEL-GB-003',
    name: 'The Ritz London',
    stars: 5,
    rating: 4.9,
    description: 'The magnificent neoclassical palace in Piccadilly, offering timeless British elegance, the world-famous Palm Court Afternoon Tea, and pristine Royal suites.',
    address: "150 Piccadilly, St. James's, London",
    city: 'London',
    countryCode: 'GB',
    coordinates: { lat: 51.5068, lng: -0.1415 },
    images: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Neoclassical Architecture', 'Royal Afternoon Tea', 'The Ritz Restaurant', 'Exclusive Caviar Bar', 'Chauffeur Driven Phantom'],
    minPrice: 750
  },
  {
    id: 'HOTEL-GB-004',
    name: 'Rosewood London',
    stars: 5,
    rating: 4.8,
    description: 'A grand Edwardian mansion entered through an archway into a quiet courtyard. Combining English heritage with contemporary luxury, steps from Covent Garden.',
    address: '252 High Holborn, London WC1V 7EN',
    city: 'London',
    countryCode: 'GB',
    coordinates: { lat: 51.5175, lng: -0.1189 },
    images: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Grand Courtyard', 'Holborn Dining Room', 'Scarfes Bar Live Music', 'Sense Spa & Gym', 'Edwardian Grand Staircase'],
    minPrice: 595
  },
  {
    id: 'HOTEL-ROM-003',
    name: 'J.K. Place Roma',
    stars: 5,
    rating: 4.8,
    description: 'An ultra-chic townhouse boutique hideaway, designed with mid-century style, custom artwork, marble bathrooms, and a quiet, highly exclusive residential feel.',
    address: "Via di Monte d'Oro 30, Rome",
    city: 'Rome',
    countryCode: 'IT',
    coordinates: { lat: 41.9048, lng: 12.4764 },
    images: [
      'https://images.unsplash.com/photo-1531572753302-ad06652983d6?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Mid-century Chic Design', 'JKCafé & Cocktail Bar', 'Residential Privacy', 'Bespoke In-room Bars', 'Luxury Tour Concierges'],
    minPrice: 630
  },
  {
    id: 'HOTEL-VEN-003',
    name: 'The Gritti Palace Venice',
    stars: 5,
    rating: 4.9,
    description: 'The legendary noble residence on the Grand Canal, showcasing precious Venetian heritage, Murano glass fixtures, historic oil paintings, and private Riva yacht charters.',
    address: 'Campo Santa Maria del Giglio, Venice',
    city: 'Venice',
    countryCode: 'IT',
    coordinates: { lat: 45.4312, lng: 12.3325 },
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Grand Canal Terraces', 'Epicurean Cooking School', 'Riva Yacht Charters', 'Historic Murano Glass', 'Acqua di Parma Spa'],
    minPrice: 890
  }
];

export const generateRatesForHotel = (hotel: Hotel, days: number = 3): Rate[] => {
  return [
    {
      id: `${hotel.id}-RATE-001`,
      roomType: 'Deluxe Courtyard King',
      boardType: 'Room Only',
      cancellationPolicy: {
        type: 'free_cancellation',
        deadline: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        penaltyFee: 0
      },
      price: hotel.minPrice,
      currency: 'USD',
      available: true,
      rateId: `rt_${hotel.id.toLowerCase()}_deluxe_ro`
    },
    {
      id: `${hotel.id}-RATE-002`,
      roomType: 'Signature Panoramic Suite',
      boardType: 'Bed & Breakfast',
      cancellationPolicy: {
        type: 'refundable',
        deadline: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        penaltyFee: 150
      },
      price: Math.round(hotel.minPrice * 1.5),
      currency: 'USD',
      available: true,
      rateId: `rt_${hotel.id.toLowerCase()}_suite_bb`
    },
    {
      id: `${hotel.id}-RATE-003`,
      roomType: 'Imperial Master Penthouse',
      boardType: 'Half Board (Breakfast + DinnerIncluded)',
      cancellationPolicy: {
        type: 'non_refundable'
      },
      price: Math.round(hotel.minPrice * 2.8),
      currency: 'USD',
      available: true,
      rateId: `rt_${hotel.id.toLowerCase()}_penth_hb`
    }
  ];
};
