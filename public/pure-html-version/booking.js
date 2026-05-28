/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Premium Booking Engine Controller - Standalone Client Layer
(function () {
  'use strict';

  // Get saved bookings from client-side storage
  function getLocalBookings() {
    const list = localStorage.getItem('lite_bookings');
    return list ? JSON.parse(list) : [];
  }

  // Save bookings list to client-side storage
  function saveLocalBookings(list) {
    localStorage.setItem('lite_bookings', JSON.stringify(list));
  }

  // Calculate day difference between two dates
  function calculateNights(checkInDateStr, checkOutDateStr) {
    const checkIn = new Date(checkInDateStr);
    const checkOut = new Date(checkOutDateStr);
    
    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      return 1;
    }

    const differenceMs = checkOut.getTime() - checkIn.getTime();
    const computedDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    return computedDays > 0 ? computedDays : 1;
  }

  // Process standard reservation creation request
  function makeNewBooking(formData) {
    const {
      hotelId,
      hotelName,
      hotelCity,
      hotelAddress,
      hotelImage,
      roomType,
      nightCount,
      checkInDate,
      checkOutDate,
      guestName,
      guestEmail,
      guestPhone,
      totalPrice,
      cardBrand,
      cardNumber
    } = formData;

    const referenceId = 'LITE-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const newReservationObj = {
      id: referenceId,
      hotelId,
      hotelName,
      hotelCity,
      hotelAddress,
      hotelImage,
      roomType,
      nightsQuantity: parseInt(nightCount) || 1,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guestName,
      guestEmail,
      guestPhone,
      priceTotal: parseFloat(totalPrice),
      cardEnding: cardNumber ? cardNumber.slice(-4) : '4321',
      cardBrand: cardBrand || 'Visa',
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    const currentReservations = getLocalBookings();
    currentReservations.unshift(newReservationObj);
    saveLocalBookings(currentReservations);

    return newReservationObj;
  }

  // Request cancellation of an existing reservation
  function cancelReservation(referenceId) {
    const reservations = getLocalBookings();
    const targetIndex = reservations.findIndex(r => r.id === referenceId);
    
    if (targetIndex === -1) return false;

    // soft cancellaton state in localStorage
    reservations[targetIndex].status = 'cancelled';
    saveLocalBookings(reservations);
    return true;
  }

  // Export methods to global client scope
  window.bookingModule = {
    getAllBookings: getLocalBookings,
    createBooking: makeNewBooking,
    cancelBooking: cancelReservation,
    calculateNightsCount: calculateNights
  };

})();
