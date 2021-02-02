import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { User } from "src/user/user.model";

@Table({ paranoid: true })
export class Note extends Model<Note> {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title: string

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description: string

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number

  @BelongsTo(() => User)
  user: User
}