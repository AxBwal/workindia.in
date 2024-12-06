const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const trainRoutes = require('./routes/trainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');


dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/train', trainRoutes);
app.use('/booking', bookingRoutes);



// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
