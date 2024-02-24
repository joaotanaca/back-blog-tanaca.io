import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { ArticleService } from './article.service'
import { CreateArticleDTO } from './dto/create-article.dto'

@Controller('article')
export class ArticleController {
    constructor(private readonly service: ArticleService) {}

    @UseGuards()
    @Get('/')
    async findAll() {
        return await this.service.findAll()
    }

    @UseGuards()
    @Post('/')
    async createArticle(
        @Body() article: CreateArticleDTO,
        @Request() request: { user: { id: string } }
    ) {
        return await this.service.create({
            ...article,
            authorId: request.user.id,
        })
    }
}
