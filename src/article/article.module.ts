import { Module } from '@nestjs/common'
import { ArticleService } from './article.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Article } from './entities/article.entity'
import { ArticleController } from './article.controller'
import { Tag } from './entities/tag.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Article, Tag])],
    controllers: [ArticleController],
    providers: [ArticleService],
})
export class ArticleModule {}
