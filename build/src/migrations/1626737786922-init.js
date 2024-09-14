"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init1626737786922 = void 0;
const typeorm_1 = require("typeorm");
class init1626737786922 {
    constructor() {
        this.name = 'init1626737786922';
    }
    async up(queryRunner) {
        // Enable uuid-ossp extension for UUID generation
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        // Role table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'role',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        // User table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'username',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'avatar_url',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'country',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'bio',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'first_name',
                    type: 'varchar',
                },
                {
                    name: 'last_name',
                    type: 'varchar',
                },
                {
                    name: 'user_role',
                    type: 'int',
                },
            ],
        }), true);
        // Foreign Key for User Table
        await queryRunner.createForeignKey('user', new typeorm_1.TableForeignKey({
            columnNames: ['user_role'],
            referencedTableName: 'role',
            referencedColumnNames: ['id'],
        }));
        // Active session table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'active_session',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`,
                },
                {
                    name: 'token',
                    type: 'varchar',
                },
                {
                    name: 'userId',
                    type: 'int',
                },
                {
                    name: 'date',
                    type: 'timestamp',
                    default: `now()`,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['userId'],
                    referencedTableName: 'user',
                    referencedColumnNames: ['id'],
                },
            ],
        }), true);
        // QuestionType table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'question_type',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'num_choices',
                    type: 'int',
                },
                {
                    name: 'num_correct',
                    type: 'int',
                },
                {
                    name: 'multiple_choice',
                    type: 'boolean',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: `now()`,
                },
            ],
        }), true);
        // Question table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'question',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`,
                },
                {
                    name: 'question_text',
                    type: 'text',
                },
                {
                    name: 'question_type_id',
                    type: 'uuid',
                },
                {
                    name: 'created_by',
                    type: 'int',
                },
                {
                    name: 'is_submitted',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'submission_status',
                    type: 'varchar',
                    default: `'pending'`,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: `now()`,
                },
            ],
        }), true);
        // Foreign Key for Question Table
        await queryRunner.createForeignKey('question', new typeorm_1.TableForeignKey({
            columnNames: ['question_type_id'],
            referencedTableName: 'question_type',
            referencedColumnNames: ['id'],
        }));
        await queryRunner.createForeignKey('question', new typeorm_1.TableForeignKey({
            columnNames: ['created_by'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
        }));
        // Choice table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'choice',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`,
                },
                {
                    name: 'choice_text',
                    type: 'varchar',
                },
                {
                    name: 'question_id',
                    type: 'uuid',
                },
                {
                    name: 'is_correct',
                    type: 'boolean',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: `now()`,
                },
            ],
        }), true);
        // Foreign Key for Choice Table
        await queryRunner.createForeignKey('choice', new typeorm_1.TableForeignKey({
            columnNames: ['question_id'],
            referencedTableName: 'question',
            referencedColumnNames: ['id'],
        }));
        // QuestionnaireType table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'questionnaire_type',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'is_infinite',
                    type: 'boolean',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: `now()`,
                },
            ],
        }), true);
        // Questionnaire table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'questionnaire',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'type_id',
                    type: 'uuid',
                },
                {
                    name: 'created_by',
                    type: 'int',
                },
                {
                    name: 'max_wrong_answers',
                    type: 'int',
                },
                {
                    name: 'is_submitted',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'submission_status',
                    type: 'varchar',
                    default: `'pending'`,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: `now()`,
                },
            ],
        }), true);
        // Foreign Key for Questionnaire Table
        await queryRunner.createForeignKey('questionnaire', new typeorm_1.TableForeignKey({
            columnNames: ['type_id'],
            referencedTableName: 'questionnaire_type',
            referencedColumnNames: ['id'],
        }));
        await queryRunner.createForeignKey('questionnaire', new typeorm_1.TableForeignKey({
            columnNames: ['created_by'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
        }));
        // QuestionnaireQuestion table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'questionnaire_question',
            columns: [
                {
                    name: 'questionnaire_id',
                    type: 'uuid',
                },
                {
                    name: 'question_id',
                    type: 'uuid',
                },
            ],
        }), true);
        // Foreign Keys for QuestionnaireQuestion Table
        await queryRunner.createForeignKey('questionnaire_question', new typeorm_1.TableForeignKey({
            columnNames: ['questionnaire_id'],
            referencedTableName: 'questionnaire',
            referencedColumnNames: ['id'],
        }));
        await queryRunner.createForeignKey('questionnaire_question', new typeorm_1.TableForeignKey({
            columnNames: ['question_id'],
            referencedTableName: 'question',
            referencedColumnNames: ['id'],
        }));
        // UserActivity table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user_activity',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`,
                },
                {
                    name: 'user_id',
                    type: 'int',
                },
                {
                    name: 'activity_type',
                    type: 'varchar',
                },
                {
                    name: 'details',
                    type: 'text',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: `now()`,
                },
            ],
        }), true);
        // Foreign Key for UserActivity Table
        await queryRunner.createForeignKey('user_activity', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
        }));
        // UserQuestionnaire table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user_questionnaire',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`,
                },
                {
                    name: 'user_id',
                    type: 'int',
                },
                {
                    name: 'questionnaire_id',
                    type: 'uuid',
                },
                {
                    name: 'completed',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'score',
                    type: 'int',
                },
                {
                    name: 'completed_at',
                    type: 'timestamp',
                    default: `now()`,
                },
            ],
        }), true);
        // Foreign Keys for UserQuestionnaire Table
        await queryRunner.createForeignKey('user_questionnaire', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
        }));
        await queryRunner.createForeignKey('user_questionnaire', new typeorm_1.TableForeignKey({
            columnNames: ['questionnaire_id'],
            referencedTableName: 'questionnaire',
            referencedColumnNames: ['id'],
        }));
        // UserQuestion table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user_question',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`,
                },
                {
                    name: 'user_id',
                    type: 'int',
                },
                {
                    name: 'question_id',
                    type: 'uuid',
                },
                {
                    name: 'is_correct',
                    type: 'boolean',
                },
                {
                    name: 'answered_at',
                    type: 'timestamp',
                    default: `now()`,
                },
            ],
        }), true);
        // Foreign Keys for UserQuestion Table
        await queryRunner.createForeignKey('user_question', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
        }));
        await queryRunner.createForeignKey('user_question', new typeorm_1.TableForeignKey({
            columnNames: ['question_id'],
            referencedTableName: 'question',
            referencedColumnNames: ['id'],
        }));
    }
    async down(queryRunner) {
        // Drop foreign keys
        await queryRunner.dropForeignKey('user_question', 'FK_f5489bae192eec1c8f257135d97');
        await queryRunner.dropForeignKey('user_questionnaire', 'FK_8e41d62c03c95364aa1e075e083');
        await queryRunner.dropForeignKey('user_activity', 'FK_11108754ec780c670440e32baad');
        await queryRunner.dropForeignKey('questionnaire_question', 'FK_f2003e45ff8a0bd6ebc16dc15ec');
        await queryRunner.dropForeignKey('questionnaire_question', 'FK_f2003e45ff8a0bd6ebc16dc15ec');
        await queryRunner.dropForeignKey('questionnaire', 'FK_f2003e45ff8a0bd6ebc16dc15ec');
        await queryRunner.dropForeignKey('questionnaire', 'FK_5f80c84683bc919678a7c8f424b');
        await queryRunner.dropForeignKey('question', 'FK_5f80c84683bc919678a7c8f424b');
        await queryRunner.dropForeignKey('choice', 'FK_5f80c84683bc919678a7c8f424b');
        await queryRunner.dropForeignKey('question', 'FK_5f80c84683bc919678a7c8f424b');
        await queryRunner.dropForeignKey('user', 'FK_5f80c84683bc919678a7c8f424b');
        await queryRunner.dropTable('user_question');
        await queryRunner.dropTable('user_questionnaire');
        await queryRunner.dropTable('user_activity');
        await queryRunner.dropTable('questionnaire_question');
        await queryRunner.dropTable('questionnaire');
        await queryRunner.dropTable('questionnaire_type');
        await queryRunner.dropTable('choice');
        await queryRunner.dropTable('question');
        await queryRunner.dropTable('question_type');
        await queryRunner.dropTable('active_session');
        await queryRunner.dropTable('user');
        await queryRunner.dropTable('role');
    }
}
exports.init1626737786922 = init1626737786922;
//# sourceMappingURL=1626737786922-init.js.map