"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticket1710109872203 = void 0;
const typeorm_1 = require("typeorm");
class ticket1710109872203 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'ticket',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'message',
                    type: 'text',
                },
                {
                    name: 'resolved',
                    type: 'boolean',
                },
                {
                    name: 'canceled',
                    type: 'boolean',
                },
                {
                    name: 'customer_id',
                    type: 'uuid',
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
            ],
        }), true);
        await queryRunner.createForeignKey('ticket', new typeorm_1.TableForeignKey({
            columnNames: ['customer_id'],
            referencedTableName: 'customer',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('ticket');
    }
}
exports.ticket1710109872203 = ticket1710109872203;
//# sourceMappingURL=1710109872203-ticket.js.map