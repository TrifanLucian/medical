"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init1626737786922 = void 0;
const typeorm_1 = require("typeorm");
class init1626737786922 {
    constructor() {
        this.name = 'init1626737786922';
    }
    async up(queryRunner) {
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
        // User Table
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
        // active_session table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'active_session',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
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
                    default: 'now()',
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
    }
    async down(queryRunner) {
        await queryRunner.dropTable('active_session');
        await queryRunner.dropTable('user');
        await queryRunner.dropTable('role');
        await queryRunner.dropTable('customer');
        await queryRunner.dropTable('bag');
        await queryRunner.dropTable('car_type');
        await queryRunner.dropTable('booking');
        await queryRunner.dropTable('car');
        await queryRunner.dropTable('payment_type');
        await queryRunner.dropTable('payment');
    }
}
exports.init1626737786922 = init1626737786922;
//# sourceMappingURL=1626737786922-init.js.map