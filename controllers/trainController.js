const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.addTrain = async (req, res) => {
  const { name, source, destination, totalSeats } = req.body;

  try {
    // Input validation
    if (!name || !source || !destination || !totalSeats || totalSeats <= 0) {
      return res.status(400).json({ message: "Invalid input. Please provide valid train details." });
    }

    
    const train = await prisma.train.create({
      data: {
        name,
        source,
        destination,
        totalSeats,
        availableSeats: totalSeats,
      },
    });

    res.status(201).json({ message: "Train added successfully", train });
  } catch (err) {
    console.error("Error while adding train:", err.message);
    res.status(500).json({ message: "Unable to add train. Please try again later." });
  }
};


exports.getAvailability = async (req, res) => {
  const { source, destination } = req.query;

  try {
   
    if (!source || !destination) {
      return res.status(400).json({ message: "Source and destination are required to fetch train availability." });
    }

    
    const trains = await prisma.train.findMany({
      where: {
        source: source,
        destination: destination,
      },
    });

    if (trains.length === 0) {
      return res.status(404).json({ message: "No trains found for the given source and destination." });
    }

    res.json({
      message: "Trains available",
      trains,
    });
  } catch (err) {
    console.error("Error fetching train availability:", err.message);
    res.status(500).json({ message: "Unable to fetch train availability. Please try again later." });
  }
};
