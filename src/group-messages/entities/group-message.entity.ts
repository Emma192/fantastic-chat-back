import { Group } from "src/groups/entities/group.entity";
import { User } from "src/users/entities/user.entity";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";

export class GroupMessage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    groupId: number;

    @Column({ nullable: false })
    senderId: number;

    @Column({ nullable: false })
    content: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    sentAt: Date;

    @ManyToOne(() => Group)
    @JoinColumn({ name: 'groupId' })
    group: Group;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'senderId' })
    sender: User;
}
