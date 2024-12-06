const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Book Seats Endpoint
exports.bookSeat = async (req, res, next) => {
  const { trainId } = req.query; 
  const { seatCount } = req.body; 
  const userId = req.user.userId; 

  try {
    if (!seatCount || seatCount <= 0) {
      return res.status(400).json({ message: "Invalid seat count" });
    }

    await prisma.$transaction(async (prisma) => {
      // Find the train details
      const train = await prisma.train.findUnique({
        where: { id: parseInt(trainId) }, 
      });

      if (!train) {
        return res.status(404).json({ message: "Train not found" });
      }

      // Check if enough seats are available
      if (train.availableSeats < seatCount) {
        return res.status(400).json({
          message: `Insufficient seats available. Only ${train.availableSeats} left.`,
        });
      }

      // Deduct seats from available seats
      await prisma.train.update({
        where: { id: train.id },
        data: { availableSeats: train.availableSeats - seatCount },
      });

      // Create a booking record with seatCount
      const booking = await prisma.booking.create({
        data: {
          userId,
          trainId: train.id,
          seatCount, // Store the seatCount in the booking
        },
      });

      res.status(201).json({
        message: "Seats booked successfully",
        booking,
      });
    });
  } catch (err) {
    next(err); 
  }
};

// Get Booking Details Endpoint
exports.getBookingDetails = async (req, res, next) => {
  const bookingId = parseInt(req.params.id);
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { user: true, train: true },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (err) {
    next(err);
  }
};
