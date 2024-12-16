const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.bookSeat = async (req, res) => {
  const { trainId } = req.query; 
  const { seatCount } = req.body; 
  const userId = req.user.userId; 

  try {
    
    if (!seatCount || seatCount <= 0) {
      return res.status(400).json({ message: "Invalid seat count. Must be greater than 0." });
    }

    await prisma.$transaction(async (prisma) => {
      // Find the train details
      const train = await prisma.train.findUnique({
        where: { id: parseInt(trainId) }, 
      });

      if (!train) {
        return res.status(404).json({ message: "Train not found." });
      }

      // Check seat availability
      if (train.availableSeats < seatCount) {
        return res.status(400).json({
          message: `Insufficient seats available. Only ${train.availableSeats} left.`,
        });
      }

      // Deduct seats from the train's available seats
      await prisma.train.update({
        where: { id: train.id },
        data: { availableSeats: train.availableSeats - seatCount },
      });

      // Create a booking record
      const booking = await prisma.booking.create({
        data: {
          userId,
          trainId: train.id,
          seatCount,
        },
      });

      // Return success response
      res.status(201).json({
        message: "Seats booked successfully.",
        booking,
      });
    });
  } catch (err) {
    console.error("Error during seat booking:", err);
    res.status(500).json({ message: "Failed to book seats. Please try again later." });
  }
};


exports.getBookingDetails = async (req, res) => {
  const bookingId = parseInt(req.params.id);

  try {
    // Fetch booking details with user and train relations
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { user: true, train: true },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Return the booking details
    res.json(booking);
  } catch (err) {
    console.error("Error fetching booking details:", err);
    res.status(500).json({ message: "Failed to fetch booking details. Please try again later." });
  }
};
