/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * UI Management & Rendering Module
 */

(function () {
  'use strict';

  let searchQuery = {};
  const toastContainer = document.getElementById('toast-container');

  // UI Module
  window.uiModule = {
    setSearchQuery: function (query) {
      searchQuery = query;
      console.log('🔍 Search Query Updated:', query);
    },

    resetSearch: function () {
      searchQuery = {};
      console.log('🔄 Search Reset');
    },

    showToast: function (message, type = 'info') {
      try {
        const toastId = 'toast-' + Math.random().toString(36).substr(2, 9);
        const bgColor = type === 'success' ? 'bg-emerald-500/20 border-emerald-500' :
                       type === 'error' ? 'bg-rose-500/20 border-rose-500' :
                       'bg-amber-500/20 border-amber-500';
        const textColor = type === 'success' ? 'text-emerald-400' :
                         type === 'error' ? 'text-rose-400' :
                         'text-amber-400';

        const toast = document.createElement('div');
        toast.id = toastId;
        toast.className = `glass-panel ${bgColor} ${textColor} px-4 py-3 rounded-xl text-xs font-semibold animate-fadeIn`;
        toast.textContent = message;

        if (toastContainer) {
          toastContainer.appendChild(toast);
          setTimeout(() => {
            toast.remove();
          }, 4000);
        }

        console.log(`[${type.toUpperCase()}] ${message}`);
      } catch (e) {
        console.error('❌ Toast Error:', e);
      }
    },

    renderAllHotels: function () {
      try {
        const container = document.getElementById('hotels-grid-container');
        if (!container) return;

        let hotels = window.hotelsData || [];

        // Filter by search query
        if (searchQuery.city) {
          const cityData = (window.citiesData || []).find(c => c.id === searchQuery.city);
          if (cityData) {
            hotels = hotels.filter(h => h.city === cityData.name);
          }
        }

        if (searchQuery.country) {
          hotels = hotels.filter(h => h.countryCode === searchQuery.country);
        }

        // Update count badge
        const countBadge = document.getElementById('hotels-count-badge');
        if (countBadge) {
          countBadge.textContent = `${hotels.length} صرح متاح`;
        }

        // Render cards
        container.innerHTML = hotels.map(hotel => `
          <div class="glass-panel glass-panel-hover p-5 rounded-2xl overflow-hidden cursor-pointer transition-all group" data-hotel-id="${hotel.id}">
            <div class="relative h-48 rounded-xl overflow-hidden mb-4 bg-slate-900 group-hover:shadow-lg transition-shadow">
              <img src="${hotel.images[0]}" alt="${hotel.name}" class="w-full h-full object-cover" onerror="this.src='https://via.placeholder.com/400x300?text=${hotel.name.replace(/\s+/g, '+')}'" />
              <div class="absolute top-3 right-3 bg-amber-500 text-slate-950 font-black px-2.5 py-1 rounded-md text-xs">
                ${hotel.stars} ⭐
              </div>
            </div>
            <h5 class="font-sans font-black text-white text-sm mb-1 line-clamp-2">${hotel.name}</h5>
            <p class="text-xs text-slate-400 mb-3 line-clamp-2 font-light">${hotel.address}</p>
            <div class="flex items-center justify-between">
              <span class="text-amber-400 font-black text-sm">$${hotel.minPrice}</span>
              <button class="text-xs px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black transition-all"
                      onclick="window.openHotelDetailsModal('${hotel.id}')">تفاصيل</button>
            </div>
          </div>
        `).join('');

        console.log('✓ Hotels Rendered:', hotels.length);
      } catch (e) {
        console.error('❌ Error rendering hotels:', e);
        this.showToast('خطأ في تحميل الفنادق', 'error');
      }
    }
  };

  console.log('✓ UI Module Loaded Successfully');
})();
