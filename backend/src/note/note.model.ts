import { BelongsTo, Column, DataType, ForeignKey, Model, NotEmpty, Scopes, Table } from "sequelize-typescript";

import { User } from "src/user/user.model";

@Table({ paranoid: true })
export class Note extends Model<Note> {
  @NotEmpty({ msg: "O título é obrigatório" })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title: string

  @NotEmpty({ msg: "A descrição é obrigatória" })
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