import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingForm from '../components/BookingForm';
import BookingList from '../components/BookingList';

const BookingPage = () => {
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const { data } = await axios.get('/api/bookings');
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    useEffect(() => {
        fetchBookings(); // Fetch bookings when the component mounts
    }, []);

    const handleBookingSuccess = () => {
        fetchBookings(); // Re-fetch bookings when a new booking is made
    };

    return (
        <div>
            <h1>Book a Test Drive</h1>
            <BookingForm onBookingSuccess={handleBookingSuccess} />
            <BookingList bookings={bookings} />
        </div>
    );
};

export default BookingPage;
