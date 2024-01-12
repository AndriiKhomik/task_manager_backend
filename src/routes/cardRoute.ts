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
router.put("/update", updateCard);
router.patch("/updateStatus", updateCardStatus);
router.delete("/delete", deleteCard);

export { router as cardRoute };
