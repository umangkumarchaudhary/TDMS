import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const { data } = await axios.get('/api/bookings');
            setBookings(data);
        };
        fetchBookings();
    }, []);

    return (
        <div>
            <h2>Current Bookings</h2>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking._id}>
                        {booking.date} - {booking.carModel} booked by {booking.consultantName} from {booking.startTime} to {booking.endTime}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingList;
