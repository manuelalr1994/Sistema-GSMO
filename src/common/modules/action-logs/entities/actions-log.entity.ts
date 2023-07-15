import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Actions')
export class Action {
    
    @PrimaryGeneratedColumn()
    id?: number;
  
    @Column()
    timestamp: string;
    
    @Column()
    endpoint: string;
  
    @Column()
    user: string;
    
    @Column()
    method: string;
  
    @Column({ type: 'json' })
    logs: object[];
}
