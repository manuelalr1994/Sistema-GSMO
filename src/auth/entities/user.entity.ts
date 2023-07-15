import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('Users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', default: '001', length: 3, nullable: false })
    code: string;

    @Column({ type: 'varchar', length: 30, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 30, nullable: false })
    lastName: string;

    @Column({ unique: true, length: 30, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 60, nullable: false })
    password: string;

    @Column({ default: 'ADMIN' })
    role: string;

    @Column({ default: true })
    isActive: boolean;

    @BeforeInsert()
    async checkFieldsBeforeInsert?() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate?() {
        this.checkFieldsBeforeInsert();   
    }

}
