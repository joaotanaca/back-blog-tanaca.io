import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Article } from './entities/article.entity'
import { CreateArticleDTO } from './dto/create-article.dto'
import { Tag } from './entities/tag.entity'

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private repository: Repository<Article>,
        @InjectRepository(Tag)
        private tagRepository: Repository<Tag>
    ) {}

    async findAll(): Promise<Article[]> {
        return await this.repository.find({
            relations: {
                tags: true,
                author: true,
            },
        })
    }

    async create(article: CreateArticleDTO) {
        const tags = await this.tagRepository.find({
            where: { name: In(article.tags) },
            cache: true,
        })
        const tagsExisted = tags.map(({ name }) => name)
        article.tags.forEach((tag: string) => {
            if (!tagsExisted.includes(tag))
                tags.push(this.tagRepository.create({ name: tag }))
        })
        article.tags = tags
        return this.repository.save(article as any)
    }
}
