import { Request, Response } from "express";
import {
  CreateNoteDto,
  Note,
  PaginatedResponse,
  UpdateNoteDto,
} from "../types";
import NoteModel from "../models/note";
import { ApiError } from "../utils/ApiError";

class NoteController {
  async create(req: Request, res: Response) {
    const data: CreateNoteDto = req.body;

    const note = NoteModel.create(data);

    res.status(201).json({
      success: true,
      data: note,
    });
  }

  async list(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string | undefined;

    const { notes, total } = NoteModel.findAll(search, page, limit);

    const totalPages = Math.ceil(total / limit);
    const response: PaginatedResponse<Note> = {
      data: notes,
      pagination: {
        page: page,
        limit: limit,
        totalPages: totalPages,
        total: total,
      },
    };

    res.status(200).json({
      success: true,
      ...response,
    });
  }

  async retrieve(req: Request, res: Response) {
    const { id } = req.params;

    const note = NoteModel.findById(id);

    if (!note) {
      throw new ApiError(404, `Note with ID ${id} not found`);
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data: UpdateNoteDto = req.body;

    const updatedNote = NoteModel.update(id, data);

    if (!updatedNote) {
      throw ApiError.notFound(`Note with ID ${id} not found`);
    }

    res.status(200).json({
      success: true,
      data: updatedNote,
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deletedNote = NoteModel.delete(id);

    if (!deletedNote) {
      throw ApiError.notFound(`Note with ID ${id} not found`);
    }

    res.status(200).json({
      success: true,
      data: deletedNote,
    });
  }
}

export default new NoteController();
