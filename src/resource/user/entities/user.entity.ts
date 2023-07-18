import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 32})
    username: string

    @Column({length: 64})
    password: string

    @Column()
    age: number
}

