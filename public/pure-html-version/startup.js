/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * LITEAPI TRAVEL PLATFORM - COMPLETE STARTUP SCRIPT
 * 
 * Entry Point: Initializes entire application with error handling & debugging
 */

(function () {
  'use strict';

  // ============================================
  // 1. CONFIGURATION & CONSTANTS
  // ============================================
  const APP_CONFIG = {
    name: 'LITEAPI TRAVEL ELITE',
    version: '1.0.0',
    debug: true,
    environment: 'production'
  };

  // ============================================
  // 2. LOGGING SYSTEM
  // ============================================
  const Logger = {
    log: (msg, data = null) => {
      if (APP_CONFIG.debug) {
        console.log(`%c[✓ ${APP_CONFIG.name}] ${msg}`, 'color: #10b981; font-weight: bold;', data);
      }
    },
    warn: (msg, data = null) => {
      console.warn(`%c[⚠ ${APP_CONFIG.name}] ${msg}`, 'color: #f59e0b; font-weight: bold;', data);
    },
    error: (msg, data = null) => {
      console.error(`%c[❌ ${APP_CONFIG.name}] ${msg}`, 'color: #ef4444; font-weight: bold;', data);
    },
    success: (msg) => {
      console.log(`%c✅ ${msg}`, 'color: #10b981; font-weight: bold; font-size: 14px;');
    }
  };

  // Expose logger
  window.AppLogger = Logger;

  // ============================================
  // 3. DEPENDENCY CHECKER
  // ============================================
  const DependencyChecker = {
    checkDOM: function () {
      try {
        const requiredElements = [
          'toast-container',
          'search-main-form',
          'hotels-grid-container',
          'hotel-details-modal',
          'booking-process-modal'
        ];

        const missing = requiredElements.filter(id => !document.getElementById(id));
        if (missing.length > 0) {
          Logger.warn('Missing DOM elements:', missing);
          return false;
        }
        Logger.log('All required DOM elements found');
        return true;
      } catch (e) {
        Logger.error('DOM check failed', e);
        return false;
      }
    },

    checkModules: function () {
      try {
        const modules = ['bookingModule', 'uiModule', 'hotelsData', 'countriesData', 'citiesData'];
        const missing = modules.filter(m => typeof window[m] === 'undefined');

        if (missing.length > 0) {
          Logger.warn('Missing modules/data:', missing);
          return false;
        }
        Logger.log('All required modules loaded');
        return true;
      } catch (e) {
        Logger.error('Module check failed', e);
        return false;
      }
    }
  };

  // ============================================
  // 4. INITIALIZATION SEQUENCE
  // ============================================
  const AppInitializer = {
    boot: async function () {
      Logger.success('🚀 Starting LITEAPI TRAVEL ELITE Platform v' + APP_CONFIG.version);

      // Step 1: Wait for DOM
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }

      // Step 2: Check dependencies
      if (!DependencyChecker.checkDOM()) {
        Logger.error('DOM dependencies not met');
        return false;
      }

      // Step 3: Wait for modules
      let moduleCheckAttempts = 0;
      const maxAttempts = 20; // 2 seconds with 100ms checks

      while (!DependencyChecker.checkModules() && moduleCheckAttempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 100));
        moduleCheckAttempts++;
      }

      if (!DependencyChecker.checkModules()) {
        Logger.error('Modules failed to load after retries');
        return false;
      }

      // Step 4: Initialize features
      this.setupErrorHandling();
      this.setupPerformanceMonitoring();
      this.setupCustomElements();
      this.attachEventListeners();

      // Step 5: Render content
      this.renderInitialContent();

      // Step 6: Success
      Logger.success('✅ Platform initialized successfully!');
      this.removeBootLoader();
      return true;
    },

    setupErrorHandling: function () {
      // Global error handler
      window.addEventListener('error', (event) => {
        Logger.error('Uncaught Error', {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        });
      });

      // Unhandled promise rejection
      window.addEventListener('unhandledrejection', (event) => {
        Logger.error('Unhandled Promise Rejection', event.reason);
      });

      Logger.log('Error handling activated');
    },

    setupPerformanceMonitoring: function () {
      if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
          const perfData = window.performance.timing;
          const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
          Logger.log(`Page Load Time: ${pageLoadTime}ms`, {
            domReady: perfData.domContentLoadedEventEnd - perfData.navigationStart,
            resourcesLoaded: perfData.loadEventEnd - perfData.domContentLoadedEventEnd
          });
        });
      }
    },

    setupCustomElements: function () {
      // Add fade-in animations
      const style = document.createElement('style');
      style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `;
      document.head.appendChild(style);
      Logger.log('Custom styles injected');
    },

    attachEventListeners: function () {
      try {
        // Category tabs
        document.querySelectorAll('.cat-tab').forEach(btn => {
          btn.addEventListener('click', function () {
            document.querySelectorAll('.cat-tab').forEach(b => {
              b.classList.remove('bg-gradient-to-r', 'from-amber-500', 'to-yellow-600', 'text-slate-950');
              b.classList.add('border', 'border-slate-800', 'text-slate-400');
            });
            this.classList.add('bg-gradient-to-r', 'from-amber-500', 'to-yellow-600', 'text-slate-950');
            this.classList.remove('border', 'border-slate-800', 'text-slate-400');
            Logger.log('Category filter changed:', this.getAttribute('data-category'));
          });
        });

        // Load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
          loadMoreBtn.addEventListener('click', () => {
            window.uiModule?.showToast('جاري تحميل مزيد من الفنادق...', 'info');
            Logger.log('Load more clicked');
          });
        }

        Logger.log('Event listeners attached');
      } catch (e) {
        Logger.error('Error attaching event listeners', e);
      }
    },

    renderInitialContent: function () {
      try {
        // Render hotels grid
        if (window.uiModule?.renderAllHotels) {
          window.uiModule.renderAllHotels();
        }

        Logger.log('Initial content rendered');
      } catch (e) {
        Logger.error('Error rendering initial content', e);
      }
    },

    removeBootLoader: function () {
      try {
        const bootLoader = document.getElementById('booting-loader');
        if (bootLoader) {
          bootLoader.style.opacity = '0';
          bootLoader.style.pointerEvents = 'none';
          setTimeout(() => {
            bootLoader.style.display = 'none';
          }, 500);
          Logger.log('Boot loader removed');
        }
      } catch (e) {
        Logger.warn('Boot loader not found or already removed');
      }
    }
  };

  // ============================================
  // 5. START APPLICATION
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      AppInitializer.boot();
    });
  } else {
    AppInitializer.boot();
  }

  // Expose initializer to window for debugging
  window.AppInitializer = AppInitializer;
})();
