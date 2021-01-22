import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { CreateUser, UpdateUser } from "../@types";
import { User } from "./user.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) { }

  async getAll() {
    return await this.userModel.findAll({
      attributes: { exclude: ['hash'] }
    })
  }

  async getMe(userId: number) {
    return await this.userModel.findByPk(userId)
  }

  async getById(id: number) {
    return await this.userModel.scope("todos").findByPk(id)
  }

  async getByEmail(email: string) {
    return await this.userModel.findOne({ where: { email } })
  }

  async store(body: CreateUser) {
    const exists = await this.getByEmail(body.email)

    if (exists) throw new HttpException("Esse usuário já existe", 401)

    const { id, name, email } = await this.userModel.create(body)

    return { user: { id, name, email }, message: "Usuário criado com sucesso!" }
  }

  async update(id: number, body: UpdateUser) {
    const { email, oldPass, password, confirmPass } = body
    const user = await this.getById(id)

    if (email && email !== user.email) {
      if (await this.getByEmail(email)) throw new HttpException("Usuário já existe", 401)
    }

    if (oldPass) {
      if (!(await user.checkPass(oldPass))) throw new HttpException("Senha incorreta", 401)

      if (oldPass === password) throw new HttpException("Nova senha não pode ser igual a senha atual", 401)

      if (password !== confirmPass) throw new HttpException("As senhas não correspondem", 401)
    }

    await user.update(body)

    return { message: "Conta atualizada com sucesso!!" }
  }

  async delete(id: number) {
    const user = await this.getById(id)

    if (!user) throw new HttpException("Usuário não encontrado", 404)

    await user.destroy()
  }

  async getActives(email: string) {
    const user = await this.userModel.scope("inactives").findOne({ where: { email } })

    return user
  }
}