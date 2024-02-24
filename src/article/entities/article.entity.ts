import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
    JoinColumn,
    ManyToOne,
} from 'typeorm'
import { Tag } from './tag.entity'
import User from 'src/users/entities/user.entity'

@Entity('article')
export class Article {
    @PrimaryGeneratedColumn('uuid')
    id!: number

    @Column({ type: 'text' })
    title: string

    @Column({ type: 'text' })
    content: string

    @Column({ type: 'uuid', name: 'author_id', unique: false })
    authorId: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'author_id' })
    author: User

    @Column({ type: 'integer', default: 0 })
    views!: number

    @Column({ default: false })
    active!: boolean

    @CreateDateColumn({ name: 'created_at', default: 'NOW()' })
    createdAt!: Date

    @UpdateDateColumn({ name: 'updated_at', default: 'NOW()' })
    updatedAt!: Date

    @ManyToMany(() => Tag, { cascade: true, eager: true })
    @JoinTable({
        name: 'article_tags_tag',
        joinColumn: { name: 'articleId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
    })
    tags: Tag[]
}
