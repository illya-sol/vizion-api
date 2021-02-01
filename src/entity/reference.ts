import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Reference extends BaseEntity {
   @PrimaryGeneratedColumn("uuid")
   id!: number

   @Column()
   url!: string

   @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
   created_at!: string
}

export default Reference