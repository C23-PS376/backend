import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('badge')
export class Badge {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  image: string
}
