/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("merchant", {
        id: 'id',
        name: { type: 'varchar(1000)', notNull: true, unique: true }
    });

    pgm.createTable("transaction", {
        id: 'id',
        merchantId: { type: "int", references: "merchant" },
        amount: { type: 'decimal(100, 2)' },
        date: { type: "date" }
    }); 

    pgm.createTable("category", {
        id: 'id',
        categoryId: { type: "int", references: "category", notNull: false },
        name: { type: "varchar(500)" },
    });
};

exports.down = pgm => {
    pgm.dropTable("transaction", { ifExists: true });
    pgm.dropTable("merchant", { ifExists: true });
    pgm.dropTable("category", { ifExists: true });
};
