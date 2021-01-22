import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { CreateNote } from "src/@types";
import { Note } from "./note.model";

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note)
    private readonly noteModel: typeof Note
  ) { }

  async getAll(userId: number) {
    return await this.noteModel.findAll({ where: { userId } })
  }

  async getById(userId: number, id: number) {
    return await this.noteModel.findOne({ where: { id, userId } })
  }

  async store(userId: number, body: CreateNote) {
    const note = await this.noteModel.create({ ...body, userId })

    return { note, message: "Nota criada com sucesso!" }
  }

  async update(userId: number, id: number, body: Note) {
    const note = await this.getById(userId, id)

    if (!note) throw new HttpException("Nota não encontrada", 404)

    await note.update(body)

    return { message: "Nota editada com sucesso!" }
  }

  async delete(userId: number, id: number) {
    const note = await this.getById(userId, id)

    if (!note) throw new HttpException("Nota não encontrada", 404)

    await note.destroy()

    return { message: "Nota deletada com sucesso!" }
  }
}