import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Reference } from './reference'

@Entity()
export class Result extends BaseEntity {
   @PrimaryGeneratedColumn("increment")
   id!: number

   @OneToOne(() => Reference, reference => reference.id) @JoinColumn()
   reference_!: number

   @Column({ nullable: true })
   title?: string

   @Column({ nullable: true })
   meta_description?: string

   @Column("timestamp")
   created_at!: string
}

export default Result