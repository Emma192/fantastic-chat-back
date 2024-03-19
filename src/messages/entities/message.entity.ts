import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('messages')
export class Message {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    senderId: number;

    @Column({ nullable: false })
    receiverId: number;

    @Column({ nullable: false })
    content: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    sentAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'senderId' })
    sender: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'receiverId' })
    receiver: User;
}
