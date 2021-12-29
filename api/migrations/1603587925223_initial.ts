/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;
exports.shorthands = undefined;

exports.up = (pgm: MigrationBuilder) => {
    pgm.createTable("merchant", {
        id: 'id',
        name: { type: 'varchar(1000)', notNull: true, unique: true }
    });

    pgm.createTable("transaction", {
        id: 'id',
        merchantId: { type: "int", references: "merchant" },
        amount: { type: 'decimal(100, 2)' },
        date: { type: "date" },
    });

    pgm.createConstraint("transaction", "unique_transactions",
        {
            unique: [
                [
                    "merchantId",
                    "amount",
                    "date"
                ]
            ]
        });

    pgm.createTable("category", {
        id: 'id',
        categoryId: { type: "int", references: "category", notNull: false },
        name: { type: "varchar(500)" },
    });
};

exports.down = (pgm: MigrationBuilder) => {
    pgm.dropTable("transaction", { ifExists: true });
    pgm.dropTable("merchant", { ifExists: true });
    pgm.dropTable("category", { ifExists: true });
};
