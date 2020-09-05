import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BaseEntity
} from "typeorm";

import bcrypt from "bcryptjs";

@Entity("users")
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @Column("varchar")
  cpf: string;

  @Column("varchar")
  whatsapp: string;

  @Column("varchar")
  type: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  private async encryptPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 8);
    }
  }

  async checkPassword(hashPassword: string): Promise<boolean> {
    const isValid = await bcrypt.compare(hashPassword, this.password);
    return isValid;
  }
}

export default User;
