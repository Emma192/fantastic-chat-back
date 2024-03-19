import { GroupMember } from "src/group-members/entities/group-member.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    userName: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @OneToMany(() => GroupMember, groupMembers => groupMembers.member)
    groups: GroupMember[];
}
