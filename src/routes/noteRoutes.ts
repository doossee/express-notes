import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler";
import {
  validateCreateNote,
  validateListNotesQuery,
  validateNoteId,
  validateUpdateNote,
} from "../middleware/validateRequest";
import noteController from "../controllers/noteController";

const router = Router();

router.post("/", validateCreateNote, asyncHandler(noteController.create));
router.get("/", validateListNotesQuery, asyncHandler(noteController.list));
router.get("/:id", validateNoteId, asyncHandler(noteController.retrieve));
router.put(
  "/:id",
  validateNoteId,
  validateUpdateNote,
  asyncHandler(noteController.update),
);
router.delete("/:id", validateNoteId, asyncHandler(noteController.delete));

export default router;