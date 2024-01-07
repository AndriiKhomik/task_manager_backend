import { NextFunction, Request, Response } from "express";
import { CardInputs } from "../dto";
import { Card } from "../models";

// get all cards which belong particular board
export const getCardsByBoardId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { boardId } = <CardInputs>req.body;

  if (boardId) {
    const cards = await Card.find({ boardId });

    if (!cards) {
      return res.status(400).json({ message: "Cards not found" });
    }

    return res.status(200).json(cards);
  }

  return res.status(400).json({ message: "Board ID is required" });
};

export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { boardId, description, title, status } = <CardInputs>req.body;

  if (!boardId || !title || !status) {
    return res.status(400).json({ message: "Missing arguments" });
  }

  const result = await Card.create({ boardId, title, description, status });

  return res.status(201).json(result);
};

export const updateCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, description, title } = <CardInputs>req.body;

  if (id) {
    const card = await Card.findById(id);

    if (!card) {
      return res.status(400).json({ message: "Card not found" });
    }

    card.description = description;
    card.title = title;

    const result = await card.save();

    return res.status(200).json(result);
  }

  return res.status(400).json({ message: "ID is required" });
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = <CardInputs>req.body;

  if (id) {
    const card = await Card.findById(id);

    if (card) {
      const result = await card.deleteOne();

      if (result) {
        return res.status(200).json({ message: "Card deleted" });
      }

      return res.status(400).json({ message: "Unable to delete" });
    }
  }

  return res.status(400).json({ message: "ID is required" });
};
