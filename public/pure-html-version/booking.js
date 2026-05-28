/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Booking Management Module
 */

(function () {
  'use strict';

  // Bookings Storage
  let bookingsStore = JSON.parse(localStorage.getItem('lite_bookings') || '[]');

  // Booking Module
  window.bookingModule = {
    calculateNightsCount: function (checkIn, checkOut) {
      try {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return Math.max(1, nights);
      } catch (e) {
        console.error('❌ Error calculating nights:', e);
        return 1;
      }
    },

    createBooking: function (bookingData) {
      try {
        const booking = {
          id: 'LITE-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          hotelId: bookingData.hotelId,
          hotelName: bookingData.hotelName,
          hotelCity: bookingData.hotelCity,
          hotelAddress: bookingData.hotelAddress,
          hotelImage: bookingData.hotelImage,
          roomType: bookingData.roomType,
          nightsQuantity: bookingData.nightCount,
          checkIn: bookingData.checkInDate,
          checkOut: bookingData.checkOutDate,
          guestName: bookingData.guestName,
          guestEmail: bookingData.guestEmail,
          guestPhone: bookingData.guestPhone,
          priceTotal: bookingData.totalPrice,
          cardBrand: bookingData.cardBrand,
          status: 'confirmed',
          createdAt: new Date().toISOString()
        };

        bookingsStore.push(booking);
        localStorage.setItem('lite_bookings', JSON.stringify(bookingsStore));

        console.log('✓ Booking Created:', booking.id);
        return booking;
      } catch (e) {
        console.error('❌ Error creating booking:', e);
        return null;
      }
    },

    getAllBookings: function () {
      return bookingsStore || [];
    },

    cancelBooking: function (bookingId) {
      try {
        const index = bookingsStore.findIndex(b => b.id === bookingId);
        if (index === -1) return false;

        bookingsStore[index].status = 'cancelled';
        localStorage.setItem('lite_bookings', JSON.stringify(bookingsStore));

        console.log('✓ Booking Cancelled:', bookingId);
        return true;
      } catch (e) {
        console.error('❌ Error cancelling booking:', e);
        return false;
      }
    }
  };

  console.log('✓ Booking Module Loaded Successfully');
})();
