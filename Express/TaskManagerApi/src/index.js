const express = require('express');
const app = express();

const taskRoutes = require('./routes/taskRoutes');
const labelRoutes = require('./routes/labelRoutes'); // Nueva ruta

app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'KioraBeth TaskManager API',
        version: '1.0.0',
        endpoints: {
            tasks: '/api/tasks',
            labels: '/api/labels'
        }
    });
});

// Endpoints
app.use('/api/tasks', taskRoutes);
app.use('/api/labels', labelRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`KioraBeth API lista en puerto ${PORT}`);
});