import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm'

export class CreateArticleTable1708635867472 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'article',
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
                        name: 'title',
                        type: 'text',
                    },
                    { name: 'content', type: 'text' },
                    { name: 'views', type: 'integer', default: 0 },
                    { name: 'active', type: 'boolean', default: false },
                    {
                        name: 'created_at',
                        type: 'timestamptz',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamptz',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
            true
        )
        await queryRunner.createTable(
            new Table({
                name: 'tag',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isUnique: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    { name: 'name', type: 'text' },
                ],
            }),
            true
        )
        await queryRunner.createTable(
            new Table({
                name: 'article_tags_tag',
                columns: [
                    { name: 'articleId', type: 'uuid', isPrimary: true },
                    { name: 'tagId', type: 'uuid', isPrimary: true },
                ],
            }),
            true
        )

        await queryRunner.createForeignKeys('article_tags_tag', [
            new TableForeignKey({
                columnNames: ['articleId'],
                referencedTableName: 'article',
                referencedColumnNames: ['id'],
            }),
            new TableForeignKey({
                columnNames: ['tagId'],
                referencedTableName: 'tag',
                referencedColumnNames: ['id'],
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKeys('article_tags_tag', [
            new TableForeignKey({
                columnNames: ['articleId'],
                referencedTableName: 'article',
                referencedColumnNames: ['id'],
            }),
            new TableForeignKey({
                columnNames: ['tagId'],
                referencedTableName: 'tag',
                referencedColumnNames: ['id'],
            }),
        ])
        await queryRunner.dropTable('article')
        await queryRunner.dropTable('tag')
        await queryRunner.dropTable('article_tags_tag')
    }
}
