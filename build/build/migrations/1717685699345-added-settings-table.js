"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addedSettingsTable1717685699345 = void 0;
const typeorm_1 = require("typeorm");
class addedSettingsTable1717685699345 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'setting',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'value',
                    type: 'text',
                },
                {
                    name: 'scope',
                    type: 'enum',
                    enum: ['public', 'secret', 'dev'],
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_by',
                    type: 'uuid',
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('setting');
    }
}
exports.addedSettingsTable1717685699345 = addedSettingsTable1717685699345;
//# sourceMappingURL=1717685699345-added-settings-table.js.map