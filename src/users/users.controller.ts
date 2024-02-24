import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('user')
export class UserController {
    constructor(private readonly service: UsersService) {}

    @Post('/')
    async createUser(@Body() user: CreateUserDTO) {
        return await this.service.create(user)
    }
}
