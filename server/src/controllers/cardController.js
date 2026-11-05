import Card from "../models/Card.js";
import CardHistory from "../models/CardHistory.js";

export const saveHistory = async (card, action, performedBy) => {
  await CardHistory.create({
    card: card._id,
    action,
    performedBy,
    snapshot: card.toObject(),
  });
};

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

    await saveHistory(card, "CREATE", req.user._id);

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

    await saveHistory(card, "UPDATE", req.user._id);

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

    await saveHistory(card, "DELETE", req.user._id);

    res.status(200).json({
      message: "Card deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get my history - user

export const getMyHistory = async (req, res) => {
  try {
    const history = await CardHistory.find({
      performedBy: req.user._id,
    })
      .populate("card")
      .sort({ createdAt: -1 });

    res.status(200).json({ history });
  } catch (error) {
    res.status(500).josn({
      message: error.message,
    });
  }
};

// get all cards admin

export const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      cards,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// update any card by admin

export const adminUpdateCard = async (req, res) => {
  try {
    const card = await Card.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!card) {
      return res.status(404).json({
        message: "Card not found",
      });
    }

    const { name, email, image } = req.body;

    if (name !== undefined) card.name = name;
    if (email !== undefined) card.email = email;
    if (image !== undefined) card.image = image;

    await card.save();
    await saveHistory(card, "UPDATE", req.user._id);

    res.status(200).json({
      message: "Card updated by admin",
      card,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// SOFT DELETE ANY CARD - ADMIN
export const adminDeleteCard = async (req, res) => {
    try {
        const card = await Card.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!card) {
            return res.status(404).json({
                message: "Card not found"
            });
        }

        card.isDeleted = true;
        await card.save();

        await saveHistory(card, "DELETE", req.user._id);

        res.status(200).json({
            message: "Card deleted by admin"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL HISTORY - ADMIN
export const getAllHistory = async (req, res) => {
    try {
        const history = await CardHistory.find()
            .populate("card")
            .populate("performedBy", "name email role")
            .sort({ createdAt: -1 });

        res.status(200).json({ history });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};