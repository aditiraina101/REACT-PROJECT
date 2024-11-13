import React, { useState } from 'react';
import './BookRoom.css';
import { FaHotel, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BookRoom = () => {
    const navigate = useNavigate(); // React Router's navigate hook
    const [step, setStep] = useState(1); // Step 1: Form, Step 2: Review
    const [hotelName, setHotelName] = useState('Grand Hotel');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guests, setGuests] = useState(1);
    const [error, setError] = useState(null);

    // Proceed to review step
    const handleProceed = (e) => {
        e.preventDefault();
        if (!checkInDate || !checkOutDate || guests <= 0) {
            setError('Please fill in all fields correctly.');
            return;
        }
        setStep(2); // Move to review step
    };

    // Confirm and save the booking, then redirect to Dashboard
    const handleConfirm = async () => {
        const newBooking = { hotelName, checkIn: checkInDate, checkOut: checkOutDate, guests };

        try {
            const response = await fetch('http://localhost:3000/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBooking),
            });

            if (!response.ok) throw new Error('Failed to confirm booking.');

            // Navigate to the dashboard after successful confirmation
            navigate('/dashboard');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className="book-room-container">
            {step === 1 ? (
                <>
                    <h2>Book a Room</h2>
                    {error && <div className="error">{error}</div>}
                    <form onSubmit={handleProceed}>
                        <div className="form-group">
                            <label><FaHotel /> Hotel Name:</label>
                            <input
                                type="text"
                                value={hotelName}
                                onChange={(e) => setHotelName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label><FaCalendarAlt /> Check-in Date:</label>
                            <input
                                type="date"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label><FaCalendarAlt /> Check-out Date:</label>
                            <input
                                type="date"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label><FaUserFriends /> Guests:</label>
                            <input
                                type="number"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                min="1"
                                required
                            />
                        </div>
                        <button type="submit" className="btn submit-btn">Proceed to Review</button>
                    </form>
                </>
            ) : (
                <>
                    <h2>Review Your Booking</h2>
                    <div className="booking-details">
                        <p><strong>Hotel Name:</strong> {hotelName}</p>
                        <p><strong>Check-in Date:</strong> {checkInDate}</p>
                        <p><strong>Check-out Date:</strong> {checkOutDate}</p>
                        <p><strong>Guests:</strong> {guests}</p>
                    </div>
                    <button onClick={handleConfirm} className="btn confirm-btn">Confirm Booking</button>
                    <button onClick={() => setStep(1)} className="btn back-btn">Go Back</button>
                </>
            )}
        </div>
    );
};

export default BookRoom;
