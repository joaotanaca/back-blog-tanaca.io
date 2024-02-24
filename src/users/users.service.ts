import { Injectable } from '@nestjs/common'
import User from './entities/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDTO } from './dto/create-user.dto'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>
    ) {}

    async findOne(email: string) {
        return this.repository.findOne({
            select: { id: true, email: true, password: true },
            where: {
                email,
            },
        })
    }

    async create(newUser: CreateUserDTO) {
        const user = this.repository.create(newUser)
        return this.repository.save(user as any)
    }
}
