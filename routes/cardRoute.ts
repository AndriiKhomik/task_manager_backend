import express from "express";
import {
  createCard,
  deleteCard,
  getCardsByBoardId,
  updateCard,
} from "../controllers";

const router = express.Router();

router.get("/cards/:boardId", getCardsByBoardId);
router.post("/create", createCard);
router.put("/update", updateCard);
router.delete("/delete", deleteCard);

export { router as cardRoute };
