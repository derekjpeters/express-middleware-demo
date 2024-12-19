const express = require('express');
const cors = require('cors'); // Import CORS middleware
const { swaggerUi, swaggerDocs } = require('./swagger');
const userRoutes = require('./routes/user');

const app = express();

// CORS Configuration
const corsOptions = {
    origin: '*', // Allow all origins (update with specific domains if needed)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Allowed headers
    preflightContinue: false,
    optionsSuccessStatus: 204 // HTTP status for successful OPTIONS requests
};

// Apply CORS Middleware
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Middleware to log request details
const requestLogger = (req, res, next) => {
    const timeStamp = new Date().toISOString();
    console.log(`[MIDDLEWARE] [${timeStamp}] ${req.method} ${req.url}`);
    next();
};
app.use(requestLogger); // Apply request logging globally

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Mount User Routes
app.use('/api', userRoutes);

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Default Routes
app.get('/about', (req, res) => {
    res.send('This is the about page route');
});

app.get('/', (req, res) => {
    console.log("[ROUTE] GET /");
    res.send('Welcome to the homepage!');
});

app.get('/contact', (req, res) => {
    console.log("[ROUTE] GET /contact");
    res.send('Contact Page Route');
});

// Form POST Route
app.post('/submit-form', (req, res) => {
    console.log("[ROUTE] POST /submit-form");
    console.log("Form Data Received: ", req.body);
    res.send(`Form submitted successfully! Name: ${req.body.name}, Message: ${req.body.message}`);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
