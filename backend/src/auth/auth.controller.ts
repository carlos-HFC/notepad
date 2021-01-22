import { Body, Controller, Post } from "@nestjs/common";

import { CreateUser, ILogin } from "src/@types";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('login')
  async login(@Body() user: ILogin) {
    return await this.authService.login(user)
  }

  @Post('register')
  async register(@Body() body: CreateUser) {
    return await this.authService.register(body)
  }
}