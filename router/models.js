const db = require('../database/database');

class Item {
    static getAll(callback) {
        db.all('SELECT * FROM items', callback);
    }

    static create(name, description, callback) {
        db.run('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], callback);
    }

    static update(id, name, description, callback) {
        db.run('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id], callback);
    }

    static partialUpdate(id, updates, callback) {
        const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
        const values = Object.values(updates);
        db.run(`UPDATE items SET ${fields} WHERE id = ?`, [...values, id], callback);
    }

    static delete(id, callback) {
        db.run('DELETE FROM items WHERE id = ?', [id], callback);
    }
}

module.exports = Item;
