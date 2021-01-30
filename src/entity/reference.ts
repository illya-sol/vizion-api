import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Reference extends BaseEntity {
   @PrimaryGeneratedColumn("increment")
   id!: number

   @Column()
   url!: string

   @Column("timestamp")
   created_at!: string
}