import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import config from './configs/typeorm.config'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ArticleModule } from './article/article.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                configService.get('typeorm'),
        }),
        ArticleModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
