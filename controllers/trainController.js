const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addTrain = async (req, res, next) => {
  const { name, source, destination, totalSeats } = req.body;
  try {
    const train = await prisma.train.create({
      data: { name, source, destination, totalSeats, availableSeats: totalSeats },
    });
    res.status(201).json({ message: "Train added", train });
  } catch (err) {
    next(err);
  }
};

exports.getAvailability = async (req, res, next) => {
  const { source, destination } = req.query;
  try {
    const trains = await prisma.train.findMany({
      where: { source, destination },
    });
    res.json(trains);
  } catch (err) {
    next(err);
  }
};
