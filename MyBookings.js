// MyBookings.js
import React, { useEffect, useState } from 'react';
import './MyBooking.css';
import { FaHotel, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    const fetchBookings = async () => {
        try {
            const response = await fetch('http://localhost:3000/bookings');
            if (!response.ok) throw new Error('Failed to fetch bookings.');

            const data = await response.json();
            setBookings(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings(); // Fetch bookings on component mount
    }, []);

    if (loading) return <div className="loading">Loading bookings...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="my-bookings-container">
            <h2>My Bookings</h2>
            {bookings.length === 0 ? (
                <div className="no-bookings">No bookings found.</div>
            ) : (
                <div className="bookings-list">
                    {bookings.map((booking) => (
                        <div className="booking-card" key={booking.id}>
                            <h3><FaHotel /> {booking.hotelName}</h3>
                            <p><FaCalendarAlt /> Check-in: {booking.checkIn}</p>
                            <p><FaCalendarAlt /> Check-out: {booking.checkOut}</p>
                            <p><FaUserFriends /> Guests: {booking.guests}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
