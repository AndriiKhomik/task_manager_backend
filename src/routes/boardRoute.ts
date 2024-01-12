import express from "express";
import {
  createBoard,
  deleteBoard,
  getBoards,
  updateBoard,
} from "../controllers";

const router = express.Router();

router.get("/boards", getBoards);
router.post("/create", createBoard);
router.patch("/update", updateBoard);
router.delete("/delete", deleteBoard);

export { router as boardRoute };