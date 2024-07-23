import { NextFunction, Request, Response } from "express";
import { Board } from "../models";
import { BoardInputs } from "../dto";

// get all boards
export const getBoards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const boards = await Board.find();

  if (!boards) {
    return res.status(400).json({ message: "Boards not found" });
  }

  return res.status(200).json(boards);
};

// create new board
export const createBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title } = <BoardInputs>req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  // Check duplicate board
  const duplicate = await Board.findOne({ title })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(400).json({ message: "Duplicate board title" });
  }

  const board = await Board.create({ title });

  if (board) {
    return res.status(201).json(board);
  } else {
    return res.status(400).json({ message: "Invalid data received" });
  }
};

// update board
export const updateBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const boardId = req.params.boardId;
  const { title } = <BoardInputs>req.body;

  if (!boardId) {
    return res.status(400).json({ message: "Board id is required" });
  }

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  // Confirm that board is exists
  const board = await Board.findById(boardId);

  if (!board) {
    return res.status(400).json({ message: "Board not found" });
  }

  // Check duplicate board
  const duplicate = await Board.findOne({ title })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate && duplicate?._id.toString() !== boardId) {
    return res.status(400).json({ message: "Duplicate board title" });
  }

  board.title = title;

  const updateBoard = await board.save();

  return res.status(200).json(updateBoard);
};

// delete board
export const deleteBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const boardId = req.params.boardId;

  if (boardId) {
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(400).json({ message: "Board not found" });
    }

    if (board) {
      await board.deleteOne();

      return res.status(200).json({ message: "Note has been deleted" });
    }
  }

  return res.status(400).json({ message: "Board id is required" });
};
