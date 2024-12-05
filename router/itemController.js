const Item = require('../models/Item');

exports.getItems = (req, res) => {
    Item.getAll((err, items) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(items);
    });
};

exports.addItem = (req, res) => {
    const { name, description } = req.body;
    Item.create(name, description, (err) => {
        if (err) res.status(500).json({ error: err.message });
        else res.status(201).json({ message: 'Item added successfully' });
    });
};

exports.updateItem = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    Item.update(id, name, description, (err) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: 'Item updated successfully' });
    });
};

exports.partialUpdateItem = (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    Item.partialUpdate(id, updates, (err) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: 'Item updated successfully' });
    });
};

exports.deleteItem = (req, res) => {
    const { id } = req.params;
    Item.delete(id, (err) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: 'Item deleted successfully' });
    });
};
