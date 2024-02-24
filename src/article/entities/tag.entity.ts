import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Article } from './article.entity'

@Entity('tag')
export class Tag {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column({ type: 'text', unique: true })
    name!: string

    @ManyToMany(() => Article, (article) => article.tags)
    articles: Article[]
}
