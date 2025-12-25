import { randomUUID } from "crypto";
import { CreateNoteDto, Note, UpdateNoteDto } from "../types";

class NoteModel {
  private notes: Map<string, Note> = new Map();

  create(data: CreateNoteDto): Note {
    const note: Note = {
      id: randomUUID(),
      title: data.title,
      content: data.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.notes.set(note.id, note);
    return note;
  }

  findById(id: string): Note | undefined {
    return this.notes.get(id);
  }

  findAll(
    search?: string,
    page: number = 1,
    limit: number = 10,
  ): { notes: Note[]; total: number } {
    let notesArray = Array.from(this.notes.values());

    if (search) {
      const searchLower = search.toLowerCase();
      notesArray.filter(
        (note) =>
          note.title.toLowerCase().includes(searchLower) ||
          note.content.toLowerCase().includes(searchLower),
      );
    }
    const total = notesArray.length;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedNotes = notesArray.slice(startIndex, endIndex);

    return { notes: paginatedNotes, total };
  }
  
  update(id: string, data: UpdateNoteDto): Note | undefined {
    const note = this.notes.get(id);
    
    if (!note) return undefined;
    
    const updatedNote: Note = {
      ...note,
      ...data,
      updatedAt: new Date()
    };
    
    this.notes.set(id, updatedNote);
    return updatedNote;
  }
  
  delete(id: string): boolean {
    return this.notes.delete(id)
  }
  
  count(): number {
    return this.notes.size;
  }
}

export default new NoteModel();
