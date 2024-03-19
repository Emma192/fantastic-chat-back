import { GroupMember } from "src/group-members/entities/group-member.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('groups')
export class Group {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable : false })
    groupName: string;

    @Column({ nullable : false })
    createdBy: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'createdBy' })
    user: User;

    @OneToMany(() => GroupMember, groupMembers => groupMembers.group)
    members: GroupMember[];
}
