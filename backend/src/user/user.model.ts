import { BeforeSave, Column, DataType, HasMany, IsEmail, Model, NotEmpty, Scopes, Table } from "sequelize-typescript";
import { compare, hash } from 'bcrypt'
import { Note } from "src/note/note.model";

@Scopes(() => ({
  todos: {
    paranoid: false,
    attributes: { exclude: ['hash'] }
  }
}))
@Table({ paranoid: true })
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string

  // @IsEmail
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email: string

  @NotEmpty({ msg: "Senha é obrigatória" })
  @Column(DataType.VIRTUAL)
  password: string

  @Column(DataType.STRING)
  hash: string

  @HasMany(() => Note)
  todos: Note[]

  @BeforeSave
  static async hashPass(user: User) {
    if (user.password) return user.hash = await hash(user.password, 10)
  }

  checkPass(pass: string) {
    return compare(pass, this.hash)
  }
}