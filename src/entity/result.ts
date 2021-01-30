import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Data } from '../types/reference'
import { Reference } from './reference'

@Entity()
export class Result extends BaseEntity {
   @PrimaryGeneratedColumn("increment")
   id!: number

   @OneToOne(type => Reference.getId) @JoinColumn()
   reference_id!: number

   @Column()
   data!: Data

   @Column("timestamp")
   created_at!: string
}