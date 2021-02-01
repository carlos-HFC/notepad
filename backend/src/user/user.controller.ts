import { Body, Controller, Get, Put, Delete, UseGuards, Req } from "@nestjs/common";
import { Request } from "express";

import { UpdateUser } from "../@types";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService
  ) { }

  @Get()
  async index() {
    return await this.userService.getAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async profile(@Req() req: Request) {
    return await this.userService.getMe(req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() body: UpdateUser, @Req() req: Request) {
    return await this.userService.update(req.user.id, body)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Req() req: Request) {
    return await this.userService.delete(req.user.id)
  }
}