/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { mockCountries, mockCities, mockHotels, generateRatesForHotel } from './src/serverMockData';
import { Country, City, Hotel, Rate, RateQuery, Booking, ApiLog } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store for the live session
let userApiKey: string = ''; // Keep empty by default to leverage the local high-fidelity rate/booking simulator
let isSandboxMode: boolean = true;

const apiLogs: ApiLog[] = [];
const bookings: Booking[] = [
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
  },
  {
    id: 'BK-2026-4412',
    hotelId: 'HOTEL-CAI-001',
    hotelName: 'Marriott Mena House Cairo',
    hotelStars: 5,
    hotelImage: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80',
    hotelAddress: '6 Pyramids Road, Giza, Cairo',
    rateId: 'rt_hotel-cai-001_deluxe_ro',
    roomType: 'Deluxe Courtyard King',
    boardType: 'Room Only',
    checkIn: '2026-04-10',
    checkOut: '2026-04-13',
    amount: 870,
    currency: 'USD',
    status: 'confirmed',
    guestDetails: {
      firstName: 'Abdelwahab',
      lastName: 'Adel',
      email: 'abdelwahabadel777@gmail.com',
      phone: '+971 50 123 4567'
    },
    createdAt: new Date(Date.now() - 86400000 * 45).toISOString()
  }
];

// Helper to log requests
function addApiLog(method: 'GET' | 'POST' | 'DELETE', endpoint: string, durationMs: number, statusCode: number, payload?: any, response?: any) {
  const log: ApiLog = {
    id: `LOG-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    endpoint,
    method,
    timestamp: new Date().toISOString(),
    durationMs,
    statusCode,
    payload: payload ? JSON.stringify(payload, null, 2) : undefined,
    response: response ? JSON.stringify(response, null, 2) : undefined
  };
  apiLogs.unshift(log);
  if (apiLogs.length > 100) apiLogs.pop(); // Keep last 100
}

// -------------------------------------------------------------
// Core API Endpoints
// -------------------------------------------------------------

// Dynamically fetch configurations
app.get('/api/internal/config', (req, res) => {
  res.json({
    apiKey: userApiKey ? `${userApiKey.substring(0, 6)}...${userApiKey.substring(userApiKey.length - 4)}` : '',
    hasKey: !!userApiKey,
    isSandbox: isSandboxMode
  });
});

app.post('/api/internal/config', (req, res) => {
  const { apiKey, isSandbox } = req.body;
  if (typeof apiKey === 'string') {
    userApiKey = apiKey;
  }
  if (typeof isSandbox === 'boolean') {
    isSandboxMode = isSandbox;
  }
  res.json({ success: true, isSandbox: isSandboxMode, hasKey: !!userApiKey });
});

// Logs Endpoint
app.get('/api/internal/logs', (req, res) => {
  res.json(apiLogs);
});

// Proxy handler helper to mimic/contact LiteAPI
async function handleLiteApiProxy(
  method: 'GET' | 'POST' | 'DELETE',
  pathName: string,
  queryParams: any,
  bodyData: any,
  mockFallback: () => any
) {
  const startTime = Date.now();
  const baseUrl = isSandboxMode 
    ? 'https://sandbox.liteapi.travel/v1' 
    : 'https://api.liteapi.travel/v1';

  // If there's no custom API key provided, immediately use high-quality simulated mock
  if (!userApiKey) {
    const duration = Math.round(Math.random() * 80 + 20); // Simulates 20-100ms
    await new Promise(resolve => setTimeout(resolve, duration));
    const data = mockFallback();
    addApiLog(method, `/api/liteapi${pathName}`, duration, 200, bodyData || queryParams, data);
    return { data, status: 200 };
  }

  // Real API execution
  try {
    const queryString = queryParams ? '?' + new URLSearchParams(queryParams).toString() : '';
    const fullUrl = `${baseUrl}${pathName}${queryString}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-API-Key': userApiKey
    };

    const response = await fetch(fullUrl, {
      method,
      headers,
      body: method !== 'GET' ? JSON.stringify(bodyData) : undefined
    });

    const duration = Date.now() - startTime;
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const resultData = isJson ? await response.json() : await response.text();

    addApiLog(method, `/api/liteapi${pathName}${queryString}`, duration, response.status, bodyData, resultData);
    
    if (response.ok) {
      return { data: resultData, status: response.status };
    } else {
      // In case of error (e.g. invalid key, quota limit), gracefully fallback to mock data,
      // but log the actual error code to show in logs so the developer knows the status.
      console.warn(`LiteAPI responded with error ${response.status}. Falling back to high-fidelity simulated response.`);
      return { data: mockFallback(), status: 200, error: resultData };
    }
  } catch (err: any) {
    const duration = Date.now() - startTime;
    console.error('API Proxy connection failure:', err.message);
    addApiLog(method, `/api/liteapi${pathName}`, duration, 500, bodyData, { error: err.message });
    return { data: mockFallback(), status: 200, error: err.message };
  }
}

// -------------------------------
// Static Data: Countries
// -------------------------------
app.get('/api/liteapi/static/countries', async (req, res) => {
  const result = await handleLiteApiProxy(
    'GET',
    '/static/countries',
    null,
    null,
    () => ({ countries: mockCountries })
  );
  res.status(result.status).json(result.data);
});

// -------------------------------
// Static Data: Cities in Country
// -------------------------------
app.get('/api/liteapi/static/countries/:countryCode/cities', async (req, res) => {
  const { countryCode } = req.params;
  const result = await handleLiteApiProxy(
    'GET',
    `/static/countries/${countryCode}/cities`,
    null,
    null,
    () => {
      const filtered = mockCities.filter(c => c.countryCode.toUpperCase() === countryCode.toUpperCase());
      return { cities: filtered };
    }
  );
  res.status(result.status).json(result.data);
});

// -------------------------------
// Static Data: Hotels List
// -------------------------------
app.get('/api/liteapi/static/hotels', async (req, res) => {
  const { countryCode, city } = req.query;
  const result = await handleLiteApiProxy(
    'GET',
    '/static/hotels',
    req.query,
    null,
    () => {
      let filtered = mockHotels;
      if (countryCode) {
        filtered = filtered.filter(h => h.countryCode.toLowerCase() === (countryCode as string).toLowerCase());
      }
      if (city) {
        filtered = filtered.filter(h => h.city.toLowerCase() === (city as string).toLowerCase());
      }
      return { hotels: filtered };
    }
  );
  res.status(result.status).json(result.data);
});

// -------------------------------
// Static Data: Single Hotel
// -------------------------------
app.get('/api/liteapi/static/hotels/:hotelId', async (req, res) => {
  const { hotelId } = req.params;
  const result = await handleLiteApiProxy(
    'GET',
    `/static/hotels/${hotelId}`,
    null,
    null,
    () => {
      const hotel = mockHotels.find(h => h.id === hotelId);
      return hotel ? { hotel } : { error: 'Hotel not found' };
    }
  );
  res.status(result.status).json(result.data);
});

// -------------------------------
// Live Rates Booking Search
// -------------------------------
app.post('/api/liteapi/rates', async (req, res) => {
  const rateQuery: RateQuery = req.body;
  const result = await handleLiteApiProxy(
    'POST',
    '/rates',
    null,
    rateQuery,
    () => {
      const targetedHotels = mockHotels.filter(h => rateQuery.hotelIds.includes(h.id));
      const responseRates: Record<string, Rate[]> = {};
      
      targetedHotels.forEach(hotel => {
        responseRates[hotel.id] = generateRatesForHotel(hotel);
      });

      return {
        rates: responseRates,
        currency: rateQuery.currency || 'USD',
        searchId: `sh_${Math.random().toString(36).substring(2, 10)}`
      };
    }
  );
  res.status(result.status).json(result.data);
});

// -------------------------------------------------------------
// Internal Custom Bookings Engines
// -------------------------------------------------------------
app.get('/api/internal/bookings', (req, res) => {
  const startTime = Date.now();
  // Simple simulator latency
  setTimeout(() => {
    addApiLog('GET', '/api/internal/bookings', Date.now() - startTime, 200, null, { count: bookings.length });
    res.json(bookings);
  }, 40);
});

app.post('/api/internal/bookings', (req, res) => {
  const startTime = Date.now();
  const { rateId, hotelId, checkIn, checkOut, amount, currency, guestDetails, roomType, boardType } = req.body;

  if (!rateId || !hotelId || !guestDetails) {
    addApiLog('POST', '/api/internal/bookings', Date.now() - startTime, 400, req.body, { error: 'Missing parameters' });
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const hotel = mockHotels.find(h => h.id === hotelId);
  const newBooking: Booking = {
    id: `BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    hotelId,
    hotelName: hotel ? hotel.name : 'Unknown Hotel',
    hotelStars: hotel ? hotel.stars : 5,
    hotelImage: hotel ? hotel.images[0] : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    hotelAddress: hotel ? hotel.address : '',
    rateId,
    roomType: roomType || 'Standard Deluxe',
    boardType: boardType || 'Room Only',
    checkIn,
    checkOut,
    amount: amount || (hotel ? hotel.minPrice : 200),
    currency: currency || 'USD',
    status: 'confirmed',
    guestDetails,
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);

  addApiLog('POST', '/api/internal/bookings', Date.now() - startTime, 201, req.body, newBooking);
  res.status(201).json(newBooking);
});

app.post('/api/internal/bookings/:id/cancel', (req, res) => {
  const startTime = Date.now();
  const { id } = req.params;
  const index = bookings.findIndex(b => b.id === id);

  if (index === -1) {
    addApiLog('POST', `/api/internal/bookings/${id}/cancel`, Date.now() - startTime, 404, null, { error: 'Booking not found' });
    return res.status(404).json({ error: 'Booking not found' });
  }

  bookings[index].status = 'cancelled';
  
  addApiLog('POST', `/api/internal/bookings/${id}/cancel`, Date.now() - startTime, 200, null, bookings[index]);
  res.json({ success: true, booking: bookings[index] });
});

// -------------------------------------------------------------
// Vite Dev Server / Static Ingress Orchestration
// -------------------------------------------------------------
async function bootstrap() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware bundled in development mode.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production static build distribution.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LiteAPI Server running at http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch(err => {
  console.error('Critical boot failure:', err);
});
