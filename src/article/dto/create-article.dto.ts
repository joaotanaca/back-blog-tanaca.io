import { Tag } from '../entities/tag.entity'

export class CreateArticleDTO {
    title: string
    content: string
    tags: (string | Tag)[]
    authorId: string
}
