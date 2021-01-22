import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { CreateNote } from "src/@types";
import { UserService } from "src/user/user.service";
import { Note } from "./note.model";

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note)
    private readonly noteModel: typeof Note,
    private userService: UserService
  ) { }

  async getAll(id: number) {
    return await this.noteModel.findAll({ where: { userId: id } })
  }

  async getById(userId: number, id: number) {
    return await this.noteModel.findOne({ where: { id, userId } })
  }

  async store(userId: number, body: CreateNote) {
    const { id } = await this.userService.getById(userId)

    const todo = await this.noteModel.create({ ...body, userId: id })

    return { todo, message: "Nota criada com sucesso!" }
  }

  async update(userId: number, id: number, body: Note) {
    const todo = await this.getById(userId, id)

    if (!todo) throw new HttpException("Nota não encontrada", 404)

    await todo.update(body)

    return todo
  }

  async delete(userId: number, id: number) {
    const todo = await this.getById(userId, id)

    if (!todo) throw new HttpException("Nota não encontrada", 404)

    await todo.destroy()

    return todo
  }
}