import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConfiguration } from './config/typeorm.config'
import { ConfigModule } from '@nestjs/config'
import { ArticleModule } from './article/article.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './auth/auth.guard'
import config from './config'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        TypeOrmModule.forRootAsync({
            useClass: DatabaseConfiguration,
        }),
        ArticleModule,
        AuthModule,
        UsersModule,
    ],
    providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
    exports: [ConfigModule],
})
export class AppModule {}
