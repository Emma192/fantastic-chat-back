import { GroupMember } from "src/group-members/entities/group-member.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, DeleteDateColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    userName: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ default: 'user' })
    rol: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
    @OneToMany(() => GroupMember, groupMembers => groupMembers.member)
    groups: GroupMember[];
}
