import express from "express";
import {
  createCard,
  deleteCard,
  getCardsByBoardId,
  updateCard,
  updateCardStatus,
} from "../controllers";

const router = express.Router();

router.get("/cards/:boardId", getCardsByBoardId);
router.post("/create", createCard);
router.put("/update/:cardId", updateCard);
router.patch("/updateStatus/:cardId", updateCardStatus);
router.delete("/delete/:cardId", deleteCard);

export { router as cardRoute };
