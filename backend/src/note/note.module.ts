import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserModule } from 'src/user/user.module';
import { NoteController } from './note.controller';

import { Note } from './note.model';
import { NoteService } from './note.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Note]),
    UserModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [NoteController],
  providers: [NoteService],
  exports: [NoteService]
})
export class NoteModule { }
