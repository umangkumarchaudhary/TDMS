import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingForm = ({ onBookingSuccess }) => {
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [carModel, setCarModel] = useState('');
    const [consultantName, setConsultantName] = useState('');
    const [carOptions, setCarOptions] = useState(['A200', 'C200', 'E300']);

    useEffect(() => {
        if (date && startTime && endTime) {
            const fetchAvailableCars = async () => {
                try {
                    const { data } = await axios.get('/api/bookings');
                    const bookedCars = data.filter(booking => booking.date === date && (
                        (booking.startTime < endTime && booking.endTime > startTime)
                    )).map(booking => booking.carModel);
                    
                    setCarOptions(['A200', 'C200', 'E300'].filter(car => !bookedCars.includes(car)));
                } catch (error) {
                    console.error('Error fetching bookings:', error);
                }
            };
            fetchAvailableCars();
        }
    }, [date, startTime, endTime]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/bookings', {
                date,
                startTime,
                endTime,
                carModel,
                consultantName,
            });
            alert('Booking successful!');
            onBookingSuccess(data); // Callback to update the list of bookings
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('Car is already booked for this time.');
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            <select value={carModel} onChange={(e) => setCarModel(e.target.value)} required>
                <option value="">Select Car Model</option>
                {carOptions.map((car) => (
                    <option key={car} value={car}>{car}</option>
                ))}
            </select>
            <select value={consultantName} onChange={(e) => setConsultantName(e.target.value)} required>
                <option value="">Select Consultant</option>
                <option value="Umang">Umang</option>
                <option value="King">King</option>
                <option value="Phenomenal">Phenomenal</option>
            </select>
            <button type="submit">Book Test Drive</button>
        </form>
    );
};

export default BookingForm;
