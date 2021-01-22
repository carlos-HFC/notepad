import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";

import { CreateNote } from "src/@types";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Note } from "./note.model";
import { NoteService } from "./note.service";

@Controller('notes')
export class NoteController {
  constructor(
    private noteService: NoteService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(@Req() req: Request) {
    return await this.noteService.getAll(req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async byId(@Param('id') id: number, @Req() req: Request) {
    return await this.noteService.getById(req.user.id, id)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async store(@Body() body: CreateNote, @Req() req: Request) {
    return await this.noteService.store(req.user.id, body)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: Note, @Req() req: Request) {
    return await this.noteService.update(req.user.id, id, body)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number, @Req() req: Request) {
    return await this.noteService.delete(req.user.id, id)
  }
}