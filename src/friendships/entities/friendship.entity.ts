import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Status } from "../enums/status.enum";

@Entity('friendships')
export class Friendship {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    senderId: number;

    @Column({ nullable: false })
    receiverId: number;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.PENDING,
      })
      status: Status;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'senderId' })
    sender: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'receiverId' })
    receiver: User;
}
