import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
  BaseEntity
} from "typeorm";

import User from "./User";
import Request from "./Request";

@Entity("requests_helpers")
class RequestHelper extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("integer")
  request_id: number;

  @Column("integer")
  user_id: number;

  @Column("integer")
  status: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToMany(type => Request, request => request.id)
  @JoinTable({
    name: "requests_helpers",
    joinColumns: [{ name: "id" }],
    inverseJoinColumns: [{ name: "request_id" }]
  })
  requests: Request[];

  @ManyToMany(type => Request, request => request.helpers)
  @JoinTable({
    name: "requests_helpers",
    joinColumns: [{ name: "request_id" }],
    inverseJoinColumns: [{ name: "id" }]
  })
  helpersRequests: Request[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default RequestHelper;
