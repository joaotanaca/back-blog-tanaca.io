import { Body, Controller, Get, Post } from '@nestjs/common'
import { ArticleService } from './article.service'
import { CreateArticleDTO } from './dto/create-article.dto'

@Controller('article')
export class ArticleController {
    constructor(private readonly service: ArticleService) {}
    @Get('/')
    async findAll() {
        return await this.service.findAll()
    }

    @Post('/')
    async create(@Body() article: CreateArticleDTO) {
        return await this.service.create(article)
    }
}
