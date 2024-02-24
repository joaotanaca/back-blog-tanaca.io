import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import UserLoginDTO from './dto/user-login.dto'
import { Basic } from 'src/decorators/basic.decorator'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Basic()
    @HttpCode(HttpStatus.OK)
    @Post('/')
    signIn(@Body() user: UserLoginDTO) {
        return this.authService.signIn(user.email, user.password)
    }

    @Get('profile')
    getProfile(@Request() req: Request) {
        return req.body
    }
}
