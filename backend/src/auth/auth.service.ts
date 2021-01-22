import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { CreateUser, ILogin } from "src/@types";
import { User } from "src/user/user.model";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async login(body: ILogin) {
    const { email, password } = body

    const user = await this.userService.getByEmail(email)

    if (!user) throw new HttpException("Usuário inexistente", 404)

    if (!(await user.checkPass(password))) throw new HttpException("Credenciais incorretas", 401)

    const token = this.createToken(user)

    return { token, user }
  }

  async validate(payload: User) {
    const user = await this.userService.getByEmail(payload.email)

    return user
  }

  async register(body: CreateUser) {
    const { password, confirmPass } = body

    if (!password) throw new HttpException("Senha é obrigatória", 401)

    if (password && !confirmPass) throw new HttpException("Confirmação de senha é obrigatória", 401)

    if (password !== confirmPass) throw new HttpException("As senhas não correspondem", 401)

    return await this.userService.store(body)
  }

  private createToken(user: User) {
    return this.jwtService.sign({ id: user.id, email: user.email })
  }
}