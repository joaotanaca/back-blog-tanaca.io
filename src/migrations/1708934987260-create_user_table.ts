import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm'

export class CreateUserTable1708934987260 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isUnique: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    { name: 'email', type: 'varchar' },
                    { name: 'password', type: 'varchar' },
                ],
            }),
            true
        )
        await queryRunner.createForeignKeys('article', [
            new TableForeignKey({
                columnNames: ['author_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
        await queryRunner.dropForeignKey('article', 'author_id')
    }
}
