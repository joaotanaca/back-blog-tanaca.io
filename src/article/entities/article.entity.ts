import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm'
import { Tag } from './tag.entity'

@Entity('article')
export class Article {
    @PrimaryGeneratedColumn('uuid')
    id!: number

    @Column({ type: 'text' })
    title: string

    @Column({ type: 'text' })
    content: string

    @ManyToMany(() => Tag, { cascade: true, eager: true })
    @JoinTable({
        name: 'article_tags_tag',
        joinColumn: { name: 'articleId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
    })
    tags: Tag[]

    @Column({ type: 'integer', default: 0 })
    views!: number

    @Column({ default: false })
    active!: boolean

    @CreateDateColumn({ name: 'created_at', default: 'NOW()' })
    createdAt!: Date

    @UpdateDateColumn({ name: 'updated_at', default: 'NOW()' })
    updatedAt!: Date
}
