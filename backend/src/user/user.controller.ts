import { Body, Controller, Get, Param, Put, Delete, UseGuards, Req } from "@nestjs/common";

import { UpdateUser } from "../@types";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserService } from "./user.service";
import { Request } from "express";

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService
  ) { }

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