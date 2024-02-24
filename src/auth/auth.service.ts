import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import config from 'src/config'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService
    ) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username)

        if (!bcrypt.compareSync(pass, user?.password)) {
            throw new UnauthorizedException()
        }
        delete user.password
        const payload = { ...user }

        return {
            access_token: await this.jwtService.signAsync(payload, {
                secret: config().JWT_SECRET_KEY,
                expiresIn: '30m',
            }),
        }
    }

    validateBearerToken(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        if (type !== 'Bearer') {
            throw new UnauthorizedException()
        }
        return this.jwtService.verify(token, {
            secret: config().JWT_SECRET_KEY,
        })
    }
    validateBasicToken(context: ExecutionContext) {
        const { HTTP_BASIC_USER, HTTP_BASIC_PASSWORD } = config()
        const request = context.switchToHttp().getRequest()
        const b64auth =
            (request.headers.authorization || '').split(' ')[1] || ''
        const [username, password] = Buffer.from(b64auth, 'base64')
            .toString()
            .split(':')

        if (HTTP_BASIC_USER !== username || HTTP_BASIC_PASSWORD !== password) {
            throw new UnauthorizedException()
        }

        return true
    }
}
