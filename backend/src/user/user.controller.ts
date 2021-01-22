import { Body, Controller, Get, Param, Put, Delete, UseGuards, Req } from "@nestjs/common";

import { UpdateUser } from "../@types";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async index() {
    return await this.userService.getAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async byId(@Param('id') id: number) {
    return await this.userService.getById(id)
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() body: UpdateUser, @Req() req) {
    return await this.userService.update(req.user.id, body)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id)
  }
}