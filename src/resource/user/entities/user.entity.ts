import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 32})
    username: string

    @Column({length: 32})
    account: string

    @Column({length: 64})
    password: string

    @Column({length: 256})
    email: string
    
    @Column({length: 16})
    phone: string

    @Column()
    enable: boolean

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @DeleteDateColumn()
    delete_at: Date;
}

