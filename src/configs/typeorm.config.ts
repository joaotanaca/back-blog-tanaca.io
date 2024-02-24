import { registerAs } from '@nestjs/config'
import { DataSource, DataSourceOptions } from 'typeorm'

export const typeOrmConfig: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'postgres',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    migrationsTableName: 'custom_migration_table',
    synchronize: true,
}

export default registerAs('typeorm', () => typeOrmConfig)
export const connectionSource = new DataSource(typeOrmConfig)
