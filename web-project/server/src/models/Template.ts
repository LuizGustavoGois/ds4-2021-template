import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";

@Entity('template')
export class Template {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amountUse: number;


    @ManyToOne(() => Project, {nullable: true, eager: true})
    @JoinColumn({name: 'project_id'})
    project: Project;


    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}