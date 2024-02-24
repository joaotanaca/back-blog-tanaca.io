import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
// import * as cookieParser from 'cookie-parser'
// import { doubleCsrf } from 'csrf-csrf'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true })
    app.setGlobalPrefix('/api')
    // const { doubleCsrfProtection } = doubleCsrf({
    //     getSecret: () => 'secrete',
    //     ignoredMethods: ['OPTIONS'],
    //     getTokenFromRequest: (req) => req.headers['x-csrf-token'],
    // })
    // app.use(cookieParser())
    // app.use(doubleCsrfProtection)
    await app.listen(3000)
}
bootstrap()
