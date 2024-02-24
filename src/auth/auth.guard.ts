import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly authService: AuthService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.get<boolean>(
            'isPublic',
            context.getHandler()
        )
        const isBasic = this.reflector.get<boolean>(
            'isBasic',
            context.getHandler()
        )
        if (isPublic) return true
        const request = context.switchToHttp().getRequest()

        try {
            if (isBasic) {
                this.authService.validateBasicToken(context)
            } else {
                const payload =
                    await this.authService.validateBearerToken(context)
                request['user'] = payload
            }
        } catch {
            throw new UnauthorizedException()
        }

        return true
    }
}
