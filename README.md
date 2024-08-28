# Car Booking Management System

This project is a comprehensive car booking management system designed to streamline and automate the process of managing car bookings for test drives. The system is built with React for the frontend and Express.js with MongoDB for the backend. It features a user-friendly interface for booking, managing, and viewing test drives, along with advanced functionalities like filtering, exporting data, and authentication.

## Features

- **Booking Management**: 
  - Users can book cars for test drives, specifying the date, time, car model, and sales consultant.
  - The system ensures that cars cannot be double-booked for the same time slot.

- **Date & Time Validation**: 
  - Prevents bookings for past dates or times.
  - Ensures the end time of a booking is always in the future relative to the start time.

- **Search and Filter**: 
  - View bookings based on different criteria: today's bookings, ongoing bookings, upcoming bookings, and complete bookings.
  - Search bookings by car model or sales consultant.

- **Authentication**: 
  - Simple passkey-based authentication for booking and cancellation, ensuring only authorized users can manage bookings.

- **Export to Excel**: 
  - Users can export the booking list to an Excel file, excluding sensitive fields like IDs and passkeys.

- **Responsive Design**: 
  - The interface is responsive, ensuring usability across various devices, including mobile.

- **Interactive Dashboard**: 
  - A dashboard that displays bookings on a calendar with time slots and car models, making it easy to visualize the schedule.

## Tech Stack

- **Frontend**:
  - React
  - CSS (custom styles)
  - React Router

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Mongoose for ODM)

- **Libraries**:
  - Axios for HTTP requests
  - XLSX for Excel export
  - CORS for handling cross-origin requests

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/umangkumarchaudhary/TDMS.git
   cd car-booking-management
