const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();

// Initialize the Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Define the booking schema and model
const bookingSchema = new mongoose.Schema({
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    carModel: { type: String, required: true },
    consultantName: { type: String, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

// Routes

// Get all bookings
app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
});

// Create a new booking
app.post('/api/bookings', async (req, res) => {
    const { date, startTime, endTime, carModel, consultantName } = req.body;

    // Check if the car is already booked for the requested time
    try {
        const existingBooking = await Booking.findOne({
            carModel,
            date,
            $or: [
                {
                    startTime: { $lt: endTime, $gte: startTime } // Overlaps within the start time
                },
                {
                    endTime: { $gt: startTime, $lte: endTime } // Overlaps within the end time
                },
                {
                    $and: [
                        { startTime: { $lte: startTime } },
                        { endTime: { $gte: endTime } } // Completely overlaps the booking
                    ]
                }
            ],
        });

        if (existingBooking) {
            return res.status(400).json({ message: 'Car is already booked for this time.' });
        }

        // Create and save the new booking
        const booking = new Booking({
            date,
            startTime,
            endTime,
            carModel,
            consultantName,
        });

        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting booking', error });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
