import Card from "../models/Card.js";

// create card

export const createCard = async (req, res) => {
  try {
    const { name, email, image } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const card = await Card.create({
      name,
      email,
      image: image || "",
      user: req.user._id,
    });

    res.status(201).json({
      message: "Card created successfully",
      card,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get my card

export const getMyCard = async (req, res) => {
  try {
    const card = await Card.find({
      user: req.user._id,
      isDeleted: false,
    }).sort({ createdAt: -1 });

    res.status(200).json({ card });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update card

export const updateCard = async (req, res) => {
  try {
    const { name, email, image } = req.body;
    const card = await Card.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!card) {
      return res.status(404).json({
        message: "Card not found",
      });
    }

    if (name !== undefined) card.name = name;
    if (email !== undefined) card.email = email;
    if (image !== undefined) card.image = image;

    await card.save();
    res.status(200).json({
      message: "Card updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// soft delete

export const deleteCard = async (req, res) => {
  try {
    const card = await Card.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!card) {
      return res.status(404).json({
        message: "Card not found",
      });
    }

    card.isDeleted = true;
    await card.save();

    res.status(200).json({
      message: "Card deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
