const express = require('express');
const app = express();
const itemRoutes = require('./routes/items');

app.use(express.json());
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
