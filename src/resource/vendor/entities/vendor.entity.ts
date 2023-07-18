import { Column ,CreateDateColumn,DeleteDateColumn,Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum VENDOR_WALLET_TYPE {
    SAMPLE_WALLET = 'sample_wallet',
    CENTRAIL_WALLET = 'central_wallet',
    MULTIPLE_WALLET = 'multiple_wallet',
}

export class Vendor { 
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 32})
    name: string

    @Column({length: 256})
    public_key: string;

    @Column({length: 256})
    private_key: string;

    @Column({length: 32})
    iv: string;

    @Column({length: 256, default: null, nullable: true})
    webhook: string;

    @Column({type: 'enum', enum: VENDOR_WALLET_TYPE, default: VENDOR_WALLET_TYPE.SAMPLE_WALLET})
    wallet: VENDOR_WALLET_TYPE;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @DeleteDateColumn()
    delete_at: Date;
}
