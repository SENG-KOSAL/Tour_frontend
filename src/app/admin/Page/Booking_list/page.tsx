import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/bookings')
      .then(res => {
        setBookings(res.data.bookings);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch bookings');
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Booking List</h1>
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Booking ID</th>
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">Tour</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">People</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border px-4 py-2">{booking.id}</td>
              <td className="border px-4 py-2">{booking.user?.name}</td>
              <td className="border px-4 py-2">{booking.tour?.title}</td>
              <td className="border px-4 py-2">{booking.status}</td>
              <td className="border px-4 py-2">{booking.number_of_people}</td>
              <td className="border px-4 py-2">{booking.booking_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
