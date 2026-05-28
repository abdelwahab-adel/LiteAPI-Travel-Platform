/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Premium Luxury Dynamic UI Painter & Interactive Hooks
(function () {
  'use strict';

  // State managers
  let activeTab = 'all'; // all, luxury, budget, trending, special_offer, most_booked
  let displayedHotelsCount = 6;
  const incrementBy = 3;
  let currentSearchQuery = null;

  // Custom Toast Notifier
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'glass-panel border-amber-500/20 text-white rounded-2xl p-4.5 shadow-2.5xl flex items-start space-x-3.5 space-x-reverse transition-all duration-300 translate-y-4 opacity-0 max-w-sm';
    toast.style.direction = 'rtl';

    let iconHtml = '';
    if (type === 'success') {
      iconHtml = `<div class="p-1 px-1.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20"><i class="fas fa-check-circle text-sm"></i></div>`;
    } else if (type === 'info') {
      iconHtml = `<div class="p-1 px-1.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20"><i class="fas fa-compass text-sm"></i></div>`;
    } else {
      iconHtml = `<div class="p-1 px-1.5 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20"><i class="fas fa-exclamation-triangle text-sm"></i></div>`;
    }

    toast.innerHTML = `
      ${iconHtml}
      <div class="flex-1 pt-0.5">
        <span class="text-[10px] text-amber-400 font-bold tracking-wider block">إشعار منصة النخبة:</span>
        <p class="text-xs mt-1 leading-relaxed text-slate-300 font-sans">${message}</p>
      </div>
      <button class="text-slate-400 hover:text-white transition-colors cursor-pointer self-start mr-2">&times;</button>
    `;

    container.appendChild(toast);

    // Fade-in animation
    setTimeout(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    }, 50);

    // Auto-remove
    const removeRef = setTimeout(() => {
      toast.classList.add('translate-y-4', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 4500);

    // Dismiss click
    toast.querySelector('button').addEventListener('click', () => {
      clearTimeout(removeRef);
      toast.classList.add('translate-y-4', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    });
  }

  // Draw star ratings
  function renderStars(count) {
    let starsHtml = '';
    for (let i = 0; i < count; i++) {
      starsHtml += '<i class="fas fa-star text-amber-500 text-[11px] h-3.5 w-3.5"></i>';
    }
    return starsHtml;
  }

  // Draw single hotel card
  function createHotelCard(hotel) {
    const wishlistIds = JSON.parse(localStorage.getItem('lite_wishlist_ids') || '[]');
    const isWished = wishlistIds.includes(hotel.id);
    const hasSpecial = hotel.category === 'special_offer' ? 'خصم ملكي خاص' : '';

    return `
      <div class="glass-panel rounded-3xl overflow-hidden glass-panel-hover group flex flex-col justify-between" id="card-${hotel.id}">
        <!-- Image & absolute tags -->
        <div class="relative h-56 overflow-hidden bg-slate-900">
          <img src="${hotel.images[0]}" alt="${hotel.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
          
          <!-- Rating badge -->
          <div class="absolute top-4 left-4 bg-[#0f172a]/95 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-full flex items-center gap-1.5 z-10 shadow-sm">
            <i class="fas fa-star text-amber-400 text-xs"></i>
            <span class="text-xs font-bold text-amber-400">${hotel.rating}</span>
          </div>

          <!-- Wishlist absolute heart -->
          <button class="wishlist-btn absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all active:scale-95 border z-10 cursor-pointer ${
            isWished 
              ? 'bg-rose-500/20 border-rose-500/30 text-rose-500' 
              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:text-rose-500 hover:bg-slate-900/90'
          }" data-hotel-id="${hotel.id}">
            <i class="fa${isWished ? 's' : 'r'} fa-heart"></i>
          </button>

          <!-- Location Badge -->
          <div class="absolute bottom-4 right-4 bg-slate-950/70 backdrop-blur-sm text-slate-200 px-3 py-1 rounded-xl text-[10px] font-mono border border-white/5 z-10 leading-none">
            ${hotel.city}، ${hotel.countryCode}
          </div>

          ${hasSpecial ? `
            <div class="absolute top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[9px] font-extrabold px-3 py-1 rounded-full border border-amber-500/20 tracking-wider">
              ${hasSpecial}
            </div>
          ` : ''}
        </div>

        <!-- Info details -->
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start mb-2.5">
              <h4 class="font-sans font-black text-base line-clamp-1 flex-1 leading-normal text-white">${hotel.name}</h4>
              <div class="flex space-x-0.5 text-amber-500 mr-2 shrink-0">
                ${renderStars(hotel.stars)}
              </div>
            </div>
            
            <p class="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-3 h-12">
              ${hotel.description}
            </p>

            <!-- Amenities -->
            <div class="flex flex-wrap gap-1.5 mb-5 h-6 overflow-hidden">
              ${hotel.amenities.slice(0, 3).map(am => `
                <span class="text-[9.5px] px-2 py-0.5 rounded-md font-bold border bg-slate-950/40 border-slate-800 text-slate-400">
                  ${am}
                </span>
              `).join('')}
              ${hotel.amenities.length > 3 ? `
                <span class="text-amber-500 text-[9px] font-bold self-center leading-none">
                  +${hotel.amenities.length - 3} ميزات
                </span>
              ` : ''}
            </div>
          </div>

          <!-- Bottom rates and Book actions -->
          <div class="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div>
              <span class="text-[10px] text-slate-500 block leading-none mb-1">يبدأ من:</span>
              <span class="font-sans font-black text-2xl flex items-baseline leading-none text-white">
                <span>$${hotel.minPrice}</span>
                <span class="text-xs font-medium text-slate-405 mr-1">/ ليلة</span>
              </span>
            </div>

            <button class="view-details-btn font-semibold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer bg-slate-900 border border-slate-800 text-amber-400 hover:text-amber-300 hover:bg-slate-850" data-hotel-id="${hotel.id}">
              <span>تفاصيل الإقامة والأسعار</span>
              <i class="fas fa-arrow-left text-[10px]"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Draw Skeleton loading
  function drawSkeletons() {
    const container = document.getElementById('hotels-grid-container');
    if (!container) return;

    let skeletonsHtml = '';
    for (let i = 0; i < 3; i++) {
      skeletonsHtml += `
        <div class="border border-slate-850 bg-slate-900/40 rounded-3xl h-[420px] animate-pulse p-4.5 flex flex-col justify-between">
          <div class="h-56 rounded-2xl mb-4 bg-slate-850"></div>
          <div class="h-6 rounded-md w-3/4 mb-2.5 bg-slate-850"></div>
          <div class="h-4 rounded-md w-1/2 mb-4 bg-slate-850"></div>
          <div class="space-y-2 mb-6">
            <div class="h-3 rounded-md w-full bg-slate-850"></div>
            <div class="h-3 rounded-md w-4/5 bg-slate-850"></div>
          </div>
          <div class="h-11 rounded-xl bg-slate-850"></div>
        </div>
      `;
    }
    container.innerHTML = skeletonsHtml;
  }

  // Render Hotels List dynamically based on active filter, search, and lazy counts
  function renderAllHotels(isTriggeredByAppend = false) {
    const gridContainer = document.getElementById('hotels-grid-container');
    if (!gridContainer) return;

    let list = window.hotelsData || [];

    // Category Tabs Filter
    if (activeTab !== 'all') {
      list = list.filter(h => h.category === activeTab);
    }

    // Search Query Filter
    if (currentSearchQuery) {
      if (currentSearchQuery.country) {
        list = list.filter(h => h.countryCode.toLowerCase() === currentSearchQuery.country.toLowerCase());
      }
      if (currentSearchQuery.city) {
        // match selected city id to coordinates or name
        const cityObj = (window.citiesData || []).find(c => c.id === currentSearchQuery.city);
        if (cityObj) {
          list = list.filter(h => h.city.toLowerCase() === cityObj.name.toLowerCase());
        }
      }
    }

    // Empty list banner
    if (list.length === 0) {
      gridContainer.innerHTML = `
        <div class="col-span-1 md:col-span-2 lg:col-span-3 border border-slate-850 bg-slate-900/30 rounded-3xl p-14 text-center max-w-xl mx-auto w-full">
          <i class="fas fa-info-circle text-amber-500 text-3xl mb-4"></i>
          <h4 class="font-sans font-bold text-lg text-white mb-1.5">لا تتوفر فنادق شاغرة مطابقة</h4>
          <p class="text-slate-400 text-xs leading-relaxed">
            محور البحث المانجستري فارغ حالياً بالتصفية الحالية. يرجى إعادة تعيين خيارات المغادرة وعروق التوزيع للتوازن.
          </p>
        </div>
      `;
      const loadMoreBtn = document.getElementById('load-more-btn');
      if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
      return;
    }

    // Slice list for pagination / lazy loading
    const sliced = list.slice(0, displayedHotelsCount);
    
    if (isTriggeredByAppend) {
      gridContainer.innerHTML = sliced.map(createHotelCard).join('');
    } else {
      // simulate skeleton loader for fluid premium UX
      drawSkeletons();
      setTimeout(() => {
        gridContainer.innerHTML = sliced.map(createHotelCard).join('');
        attachCardListeners();
      }, 550);
    }

    // Toggle More trigger button visibility
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
      if (displayedHotelsCount >= list.length) {
        loadMoreBtn.classList.add('hidden');
      } else {
        loadMoreBtn.classList.remove('hidden');
      }
    }

    const countBadge = document.getElementById('hotels-count-badge');
    if (countBadge) {
      countBadge.innerText = `${list.length} فنادق مطابقة بالثانية`;
    }
  }

  // Attachment of dynamic card mouse hooks (Wishlist, details)
  function attachCardListeners() {
    // Whishlist toggle
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const hotelId = this.getAttribute('data-hotel-id');
        let wishlistIds = JSON.parse(localStorage.getItem('lite_wishlist_ids') || '[]');
        
        if (wishlistIds.includes(hotelId)) {
          wishlistIds = wishlistIds.filter(id => id !== hotelId);
          this.classList.add('text-slate-300', 'bg-slate-900/60');
          this.classList.remove('text-rose-500', 'bg-rose-500/20');
          this.querySelector('i').className = 'far fa-heart';
          showToast('تمت إزالة الصرح من المفضلة بنجاح', 'info');
        } else {
          wishlistIds.push(hotelId);
          this.classList.remove('text-slate-300', 'bg-slate-900/60');
          this.classList.add('text-rose-500', 'bg-rose-500/20');
          this.querySelector('i').className = 'fas fa-heart';
          showToast('تمت إضافة الصرح إلى وجهاتك المفضلة!', 'success');
        }
        localStorage.setItem('lite_wishlist_ids', JSON.stringify(wishlistIds));
      });
    });

    // Details page triggers
    document.querySelectorAll('.view-details-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const hotelId = this.getAttribute('data-hotel-id');
        window.openHotelDetailsModal(hotelId);
      });
    });
  }

  // Hook Category Tab Button click handlers
  function initCategoryTabs() {
    document.querySelectorAll('.cat-tab').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.cat-tab').forEach(b => {
          b.classList.remove('bg-gradient-to-r', 'from-amber-500', 'to-yellow-600', 'text-slate-950', 'font-extrabold');
          b.classList.add('text-slate-400', 'hover:text-white', 'hover:bg-white/5');
        });

        this.classList.add('bg-gradient-to-r', 'from-amber-500', 'to-yellow-600', 'text-slate-950', 'font-extrabold');
        this.classList.remove('text-slate-400', 'hover:text-white', 'hover:bg-white/5');

        activeTab = this.getAttribute('data-category');
        displayedHotelsCount = 6; // Reset page load indices
        renderAllHotels();
      });
    });
  }

  // Loader Load More action Click simulation
  function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', function () {
      const icon = this.querySelector('i');
      if (icon) icon.className = 'fas fa-spinner animate-spin';
      this.querySelector('span').innerText = 'جاري استقصاء المزيد من الصروح الفاخرة...';
      
      setTimeout(() => {
        displayedHotelsCount += incrementBy;
        renderAllHotels(true);
        if (icon) icon.className = 'fas fa-sync-alt';
        this.querySelector('span').innerText = 'عرض المزيد من صروح الضيافة';
        attachCardListeners();
        showToast('تم جلب وتعبئة المزيد من الفنادق المطابقة لمخطط رحلتك', 'success');
      }, 700);
    });
  }

  // Export properties to window scope
  window.uiModule = {
    showToast: showToast,
    renderAllHotels: renderAllHotels,
    setSearchQuery: function (query) {
      currentSearchQuery = query;
    },
    resetSearch: function () {
      currentSearchQuery = null;
    }
  };

  // Initializing static DOM hook binders on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    initCategoryTabs();
    initLoadMore();
  });

})();
