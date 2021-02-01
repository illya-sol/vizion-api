import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Reference } from './reference'

@Entity()
export class Result extends BaseEntity {
   @PrimaryGeneratedColumn("uuid")
   id!: number

   @OneToOne(() => Reference, reference => reference.id, { cascade: ["soft-remove", "recover"] }) @JoinColumn()
   reference_!: Reference

   @Column({ nullable: true })
   title?: string

   @Column({ nullable: true })
   meta_description?: string

   @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
   created_at!: string
}

export default Result