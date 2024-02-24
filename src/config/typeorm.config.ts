import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'
import config from '.'

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
    createTypeOrmOptions():
        | TypeOrmModuleOptions
        | Promise<TypeOrmModuleOptions> {
        return {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'postgres',
            entities: ['dist/**/*.entity{.ts,.js}'],
            migrations: ['dist/migrations/*{.ts,.js}'],
            migrationsTableName: 'custom_migration_table',
            synchronize: config().typeorm.synchronize,
        }
    }
}

export default new DataSource(
    new DatabaseConfiguration().createTypeOrmOptions() as DataSourceOptions
)
