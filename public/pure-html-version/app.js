/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Central Orchestrator & Controller of the Luxury Platform
(function () {
  'use strict';

  // State
  let activeHotelForModal = null;
  let activeRateForModal = null;

  // Initialize Search selection fields
  function initializeCitySelector() {
    const countrySelect = document.getElementById('search-country');
    const citySelect = document.getElementById('search-city');
    if (!countrySelect || !citySelect) return;

    // Populate countries
    let countriesHtml = '<option value="">كافة البلدان الفاخرة</option>';
    (window.countriesData || []).forEach(cn => {
      countriesHtml += `<option value="${cn.code}">${cn.name}</option>`;
    });
    countrySelect.innerHTML = countriesHtml;

    // Trigger city update
    countrySelect.addEventListener('change', function () {
      const selectedCountryCode = this.value;
      let citiesFiltered = window.citiesData || [];
      if (selectedCountryCode) {
        citiesFiltered = citiesFiltered.filter(c => c.countryCode === selectedCountryCode);
      }

      let citiesHtml = '<option value="">كافة الحواضر</option>';
      citiesFiltered.forEach(ct => {
        citiesHtml += `<option value="${ct.id}">${ct.name}</option>`;
      });
      citySelect.innerHTML = citiesHtml;
    });

    // Populate initial cities list
    let initialCitiesHtml = '<option value="">كافة الحواضر</option>';
    (window.citiesData || []).forEach(ct => {
      initialCitiesHtml += `<option value="${ct.id}">${ct.name}</option>`;
    });
    citySelect.innerHTML = initialCitiesHtml;
  }

  // Pre-fill search date defaults
  function setupSearchDateDefaults() {
    const checkinInput = document.getElementById('search-checkin');
    const checkoutInput = document.getElementById('search-checkout');
    if (!checkinInput || !checkoutInput) return;

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const checkInDefault = today.toISOString().split('T')[0];
    const checkOutDefault = tomorrow.toISOString().split('T')[0];

    checkinInput.value = checkInDefault;
    checkinInput.min = checkInDefault;
    checkoutInput.value = checkOutDefault;
    checkoutInput.min = checkOutDefault;

    checkinInput.addEventListener('change', function () {
      checkoutInput.min = this.value;
      if (new Date(checkoutInput.value) <= new Date(this.value)) {
        const nextDay = new Date(this.value);
        nextDay.setDate(nextDay.getDate() + 1);
        checkoutInput.value = nextDay.toISOString().split('T')[0];
      }
    });
  }

  // Bind core search queries
  function setupSearchForm() {
    const searchForm = document.getElementById('search-main-form');
    if (!searchForm) return;

    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const countryCode = document.getElementById('search-country').value;
      const cityId = document.getElementById('search-city').value;
      
      if (!countryCode && !cityId) {
        window.uiModule.resetSearch();
      } else {
        window.uiModule.setSearchQuery({
          country: countryCode || null,
          city: cityId || null
        });
      }

      window.uiModule.showToast('جاري تحديث صروح الحجز وعروضها الخاصة...', 'info');
      
      // Scroll to grid
      const targetPoint = document.getElementById('hotels-display-section');
      if (targetPoint) {
        targetPoint.scrollIntoView({ behavior: 'smooth' });
      }

      window.uiModule.renderAllHotels();
    });
  }

  // Show detailed slide over of a hotel
  window.openHotelDetailsModal = function (hotelId) {
    const hotel = (window.hotelsData || []).find(h => h.id === hotelId);
    if (!hotel) return;

    activeHotelForModal = hotel;
    const modal = document.getElementById('hotel-details-modal');
    if (!modal) return;

    // Slide-over image slideshow HTML
    let galleryHtml = '';
    hotel.images.forEach((img, idx) => {
      galleryHtml += `
        <div class="swiper-slide h-full">
          <img src="${img}" alt="${hotel.name} - ${idx + 1}" class="w-full h-full object-cover rounded-2xl" />
        </div>
      `;
    });

    document.getElementById('details-modal-title').innerText = hotel.name;
    document.getElementById('details-modal-stars').innerHTML = renderStarsDynamic(hotel.stars);
    document.getElementById('details-modal-location').innerText = `${hotel.address}، ${hotel.city}`;
    document.getElementById('details-modal-description').innerText = hotel.description;

    // Fill amenities
    const amContainer = document.getElementById('details-modal-amenities');
    amContainer.innerHTML = hotel.amenities.map(am => `
      <div class="flex items-center gap-2 bg-slate-950/50 border border-slate-850 px-3 py-1.5 rounded-xl text-slate-300 transform transition-all duration-300 hover:border-amber-500/20">
        <i class="fas fa-check text-amber-500 text-[9px]"></i>
        <span class="text-xs font-semibold">${am}</span>
      </div>
    `).join('');

    // Generate room rates list
    const checkIn = document.getElementById('search-checkin').value || new Date().toISOString().split('T')[0];
    const checkOut = document.getElementById('search-checkout').value || new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const guests = parseInt(document.getElementById('search-guests')?.value) || 2;
    
    const computedNights = window.bookingModule.calculateNightsCount(checkIn, checkOut);
    const rates = window.generateRatesForPureHotel(hotelId, checkIn, checkOut, guests);

    const ratesContainer = document.getElementById('details-modal-rates');
    ratesContainer.innerHTML = rates.map(rate => {
      const lineCost = rate.price;
      const totalCost = lineCost * computedNights;
      return `
        <div class="glass-panel border-slate-850/60 p-5 rounded-2xl hover:border-amber-500/20 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4.5">
          <div class="flex-1 space-y-1.5">
            <span class="text-[9px] px-2 py-0.5 rounded-md font-bold bg-amber-500/10 text-amber-400 border border-amber-500/15">
              ${rate.boardType}
            </span>
            <h5 class="font-sans font-extrabold text-white text-sm mt-1">${rate.roomType}</h5>
            <p class="text-[10px] text-emerald-400 flex items-center gap-1">
              <i class="fas fa-check-double"></i>
              <span>إلغاء مجاني: ${rate.cancellationPolicy.deadline}</span>
            </p>
          </div>
          
          <div class="flex items-center justify-between md:justify-end gap-5 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
            <div class="text-right">
              <div class="text-xs text-slate-400 font-sans">ثمن الليلة الواحدة:</div>
              <div class="font-sans font-black text-white text-xl flex items-baseline justify-end leading-none">
                <span>$${lineCost}</span>
              </div>
              <span class="text-[9.5px] text-slate-500 block font-mono mt-1">الإجمالي لـ ${computedNights} ليالي: $${totalCost}</span>
            </div>
            
            <button class="book-now-trigger-btn font-extrabold text-xs py-3 px-5 rounded-xl cursor-pointer bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 hover:from-amber-400 hover:to-yellow-500 transition-all active:scale-97 shadow-xl shadow-amber-500/5 leading-none" data-rate-id="${rate.id}">
              حجز الصرح
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Fill Reviews
    const reviewsContainer = document.getElementById('details-modal-reviews');
    if (hotel.reviews && hotel.reviews.length > 0) {
      reviewsContainer.innerHTML = hotel.reviews.map(rev => `
        <div class="bg-slate-950/40 border border-slate-850 p-4.5 rounded-2xl flex gap-3.5 shadow-sm">
          <img src="${rev.avatar}" alt="${rev.author}" class="w-10 h-10 rounded-full object-cover bg-slate-900 border border-slate-800 shrink-0" />
          <div class="flex-1 space-y-1">
            <div class="flex justify-between items-center">
              <h6 class="font-black text-xs text-white">${rev.author}</h6>
              <span class="text-[9px] text-slate-500 font-mono">${rev.date}</span>
            </div>
            <div class="flex space-x-0.5 text-amber-500 mb-1 shrink-0">
              ${renderStarsDynamic(Math.floor(rev.rating))}
            </div>
            <p class="text-slate-300 text-xs leading-relaxed font-sans">${rev.comment}</p>
          </div>
        </div>
      `).join('');
    } else {
      reviewsContainer.innerHTML = `
        <p class="text-slate-500 text-xs italic">لا تتوفر تقييمات مكتوبة معاصرة لهذا الفندق حالياً في قاعدة التوزيع.</p>
      `;
    }

    // Set sticky priced indicator
    document.getElementById('details-modal-sticky-price').innerText = `$${hotel.minPrice}`;

    // Show modal container
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    // Attach rooms booking action listeners
    modal.querySelectorAll('.book-now-trigger-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const rateId = this.getAttribute('data-rate-id');
        const selectedRate = rates.find(r => r.id === rateId);
        window.openBookingSheet(hotel, selectedRate);
      });
    });
  };

  // Star drawing helper
  function renderStarsDynamic(count) {
    let starsHtml = '';
    for (let i = 0; i < count; i++) {
      starsHtml += '<i class="fas fa-star text-amber-500 text-[10px]"></i>';
    }
    return starsHtml;
  }

  // Close details overlay
  function closeDetailsModal() {
    const modal = document.getElementById('hotel-details-modal');
    if (modal) modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    activeHotelForModal = null;
  }

  // Open Reservation processing Sheet
  window.openBookingSheet = function (hotel, rate) {
    activeHotelForModal = hotel;
    activeRateForModal = rate;

    const detailsModal = document.getElementById('hotel-details-modal');
    if (detailsModal) detailsModal.classList.add('hidden');

    const bookingModal = document.getElementById('booking-process-modal');
    if (!bookingModal) return;

    // Fill elements
    document.getElementById('book-summary-hotel-name').innerText = hotel.name;
    document.getElementById('book-summary-hotel-address').innerText = `${hotel.address}، ${hotel.city}`;
    document.getElementById('book-summary-hotel-image').src = hotel.images[0];
    document.getElementById('book-summary-room-type').innerText = rate.roomType;
    document.getElementById('book-summary-board').innerText = rate.boardType;

    const checkIn = document.getElementById('search-checkin').value;
    const checkOut = document.getElementById('search-checkout').value;
    const nights = window.bookingModule.calculateNightsCount(checkIn, checkOut);

    document.getElementById('book-summary-checkin').innerText = checkIn;
    document.getElementById('book-summary-checkout').innerText = checkOut;
    document.getElementById('book-summary-nights').innerText = `${nights} ليالٍ`;

    const totalCost = rate.price * nights;
    document.getElementById('book-summary-rate-price').innerText = `$${rate.price}`;
    document.getElementById('book-summary-rate-nights-calc').innerText = `$${rate.price} × ${nights} ليلة`;
    document.getElementById('book-summary-total').innerText = `$${totalCost}`;

    // Reset customer forms
    document.getElementById('booking-form').reset();

    // Reset success receipts
    document.getElementById('booking-form-screen').classList.remove('hidden');
    document.getElementById('booking-success-screen').classList.add('hidden');

    bookingModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  };

  // Close reservation container
  function closeBookingModal() {
    const modal = document.getElementById('booking-process-modal');
    if (modal) modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    activeHotelForModal = null;
    activeRateForModal = null;
  }

  // Customer Form reserving validation processing
  function setupBookingFormSubmission() {
    const form = document.getElementById('booking-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = `<i class="fas fa-spinner animate-spin"></i> <span>جاري المصادقة الآمنة للمدفوعات الفخمة...</span>`;
      btn.disabled = true;

      setTimeout(() => {
        const checkIn = document.getElementById('search-checkin').value;
        const checkOut = document.getElementById('search-checkout').value;
        const nights = window.bookingModule.calculateNightsCount(checkIn, checkOut);
        const totalCost = activeRateForModal.price * nights;

        const bookingData = {
          hotelId: activeHotelForModal.id,
          hotelName: activeHotelForModal.name,
          hotelCity: activeHotelForModal.city,
          hotelAddress: activeHotelForModal.address,
          hotelImage: activeHotelForModal.images[0],
          roomType: activeRateForModal.roomType,
          nightCount: nights,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          guestName: document.getElementById('cust-name').value,
          guestEmail: document.getElementById('cust-email').value,
          guestPhone: document.getElementById('cust-phone').value,
          totalPrice: totalCost,
          cardBrand: 'Visa Secure',
          cardNumber: document.getElementById('card-num').value
        };

        const confirmedTicket = window.bookingModule.createBooking(bookingData);

        // Update elements of success screen
        document.getElementById('success-ref-id').innerText = confirmedTicket.id;
        document.getElementById('success-hotel-name').innerText = confirmedTicket.hotelName;
        document.getElementById('success-room').innerText = confirmedTicket.roomType;
        document.getElementById('success-total').innerText = `$${confirmedTicket.priceTotal}`;

        // Swap screens with an animation trigger
        document.getElementById('booking-form-screen').classList.add('hidden');
        document.getElementById('booking-success-screen').classList.remove('hidden');

        window.uiModule.showToast('تم اعتماد حجزك الفندقي بنجاح وصياغة العقد الفخم!', 'success');
        
        btn.innerHTML = originalText;
        btn.disabled = false;

        // Refresh My bookings list
        renderMyBookingsList();
      }, 1500);
    });
  }

  // Draw user's previous bookings inside members loyalty section
  function renderMyBookingsList() {
    const container = document.getElementById('my-bookings-container');
    if (!container) return;

    const bookings = window.bookingModule.getAllBookings();
    
    if (bookings.length === 0) {
      container.innerHTML = `
        <div class="text-center py-10 border border-slate-850/60 rounded-2xl bg-slate-900/10">
          <i class="far fa-calendar-times text-slate-500 text-xl mb-2"></i>
          <p class="text-xs text-slate-500">مخطط حجزك الفخم فارغ حالياً بالتوزيع الكلاسيكي.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = bookings.map(b => {
      const isConfirmed = b.status === 'confirmed';
      const badgeClass = isConfirmed 
        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
        : 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      const badgeText = isConfirmed ? 'مؤكد ونشط بالصناعة' : 'ملغي ومسترد بالكامل';

      return `
        <div class="glass-panel border-slate-850/60 p-4.5 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div class="flex gap-3.5 items-start">
            <img src="${b.hotelImage}" alt="${b.hotelName}" class="w-14 h-14 rounded-xl object-cover bg-slate-900 border border-slate-800 shrink-0" />
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[9px] font-mono font-bold text-amber-400 tracking-wider bg-amber-500/10 border border-amber-500/15 px-2 py-0.5 rounded">
                  ${b.id}
                </span>
                <span class="text-[9px] px-2 py-0.5 rounded border ${badgeClass}">
                  ${badgeText}
                </span>
              </div>
              <h6 class="font-sans font-black text-xs text-white leading-normal">${b.hotelName}</h6>
              <p class="text-[10px] text-slate-400 leading-normal mt-1">${b.roomType}</p>
              <p class="text-[10.5px] text-slate-500 font-mono mt-1">
                <i class="far fa-calendar-alt text-[9.5px]"></i> ${b.checkIn} لغاية ${b.checkOut} (${b.nightsQuantity} ليالٍ)
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between md:justify-end gap-4.5 w-full md:w-auto pt-3.5 md:pt-0 border-t md:border-t-0 border-slate-850">
            <div class="text-right">
              <span class="text-[9px] text-slate-500 block leading-none">القيمة المدفوعة:</span>
              <span class="font-sans font-black text-[15px] text-white tracking-tight">$${b.priceTotal}</span>
            </div>

            ${isConfirmed ? `
              <button class="cancel-booking-action-btn font-extrabold text-[10px] px-3.5 py-2.5 rounded-xl text-rose-400 hover:text-rose-300 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/15 transition-all cursor-pointer leading-none" data-res-id="${b.id}">
                إلغاء واسترداد
              </button>
            ` : `
              <button disabled class="font-extrabold text-[10px] px-3.5 py-2.5 rounded-xl text-slate-600 bg-slate-900 border border-slate-850 cursor-not-allowed leading-none">
                تم الاسترداد
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');

    // Attach cancellations hooks
    container.querySelectorAll('.cancel-booking-action-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const resId = this.getAttribute('data-res-id');
        const confirmCode = confirm('هل أنت متأكد من إلغاء هذا الحجز الفندقي الملكي؟ سيتم إرجاع المبلغ لبطاقتك الائتمانية.');
        if (!confirmCode) return;

        const success = window.bookingModule.cancelBooking(resId);
        if (success) {
          window.uiModule.showToast('تم إلغاء الحجز الفندقي بنجاح وتوجيه الإرجاع للبنك المكتتب', 'success');
          renderMyBookingsList();
        } else {
          window.uiModule.showToast('حدثت صعوبة في معالجة طلب الإلغاء للفندق', 'error');
        }
      });
    });
  }

  // Member Center visual switch Tab views (Bookings Vs wishlist)
  function initMemberSectionControls() {
    const tabBookingsBtn = document.getElementById('loyalty-tab-bookings');
    const tabWishlistBtn = document.getElementById('loyalty-tab-wishlist');
    const panelBookings = document.getElementById('loyalty-panel-bookings');
    const panelWishlist = document.getElementById('loyalty-panel-wishlist');

    if (!tabBookingsBtn || !tabWishlistBtn) return;

    tabBookingsBtn.addEventListener('click', () => {
      tabBookingsBtn.classList.add('border-amber-500', 'text-amber-400');
      tabBookingsBtn.classList.remove('border-transparent', 'text-slate-400');
      tabWishlistBtn.classList.remove('border-amber-500', 'text-amber-400');
      tabWishlistBtn.classList.add('border-transparent', 'text-slate-400');

      panelBookings.classList.remove('hidden');
      panelWishlist.classList.add('hidden');
    });

    tabWishlistBtn.addEventListener('click', () => {
      tabWishlistBtn.classList.add('border-amber-500', 'text-amber-400');
      tabWishlistBtn.classList.remove('border-transparent', 'text-slate-400');
      tabBookingsBtn.classList.remove('border-amber-500', 'text-amber-400');
      tabBookingsBtn.classList.add('border-transparent', 'text-slate-400');

      panelWishlist.classList.remove('hidden');
      panelBookings.classList.add('hidden');
      
      // Load saved favorites
      renderMyWishlist();
    });
  }

  // Draw Saved Favorites
  function renderMyWishlist() {
    const listContainer = document.getElementById('my-wishlist-container');
    if (!listContainer) return;

    const wishlistIds = JSON.parse(localStorage.getItem('lite_wishlist_ids') || '[]');
    const wishHotelsList = (window.hotelsData || []).filter(h => wishlistIds.includes(h.id));

    if (wishHotelsList.length === 0) {
      listContainer.innerHTML = `
        <div class="text-center py-10 border border-slate-850/60 rounded-2xl bg-slate-900/10">
          <i class="far fa-heart text-slate-500 text-xl mb-2"></i>
          <p class="text-xs text-slate-500">لا توجد فنادق أو قصور مفضلة حالياً بقائمة رغباتك.</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = wishHotelsList.map(h => `
      <div class="glass-panel border-slate-850/60 p-4 rounded-xl flex items-center justify-between gap-3 shadow-sm hover:border-amber-500/20 transition-all duration-300">
        <div class="flex items-center gap-3">
          <img src="${h.images[0]}" alt="${h.name}" class="w-11 h-11 rounded-lg object-cover bg-slate-900 shrink-0" />
          <div>
            <h7 class="font-sans font-black text-xs text-white leading-normal line-clamp-1">${h.name}</h7>
            <span class="text-[9.5px] text-slate-500 block leading-none mt-1 font-mono">${h.city}، ${h.countryCode}</span>
          </div>
        </div>

        <button class="wishlist-detail-action font-semibold text-[10px] px-3.5 py-2 px-3 border border-slate-800 bg-slate-950/40 text-amber-400 hover:bg-slate-900 hover:text-amber-300 rounded-lg transition-all cursor-pointer leading-none" data-hotel-id="${h.id}">
          تصفح وأحجز
        </button>
      </div>
    `).join('');

    listContainer.querySelectorAll('.wishlist-detail-action').forEach(btn => {
      btn.addEventListener('click', function () {
        const hotelId = this.getAttribute('data-hotel-id');
        window.openHotelDetailsModal(hotelId);
      });
    });
  }

  // Setup DOM core event binders on content loaded
  document.addEventListener('DOMContentLoaded', () => {
    initializeCitySelector();
    setupSearchDateDefaults();
    setupSearchForm();
    setupBookingFormSubmission();
    initMemberSectionControls();

    // Bind Close dynamic overlays events
    document.querySelectorAll('.close-details-btn').forEach(btn => {
      btn.addEventListener('click', closeDetailsModal);
    });
    
    document.querySelectorAll('.close-booking-btn').forEach(btn => {
      btn.addEventListener('click', closeBookingModal);
    });

    // Populate initial hotels list
    window.uiModule.renderAllHotels();
    
    // Draw initial bookings list
    renderMyBookingsList();
  });

})();
