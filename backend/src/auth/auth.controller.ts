import { Body, Controller, HttpCode, Post } from "@nestjs/common";

import { CreateUser, ILogin } from "src/@types";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('login')
  @HttpCode(200)
  async login(@Body() user: ILogin) {
    return await this.authService.login(user)
  }

  @Post('register')
  async register(@Body() body: CreateUser) {
    return await this.authService.register(body)
  }

  @Post('reactive')
  async reactive(@Body() { email }: ILogin) {
    return await this.authService.reactive(email)
  }
}