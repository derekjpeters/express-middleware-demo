const express = require('express'); 
const { swaggerUi, swaggerDocs } = require('./swagger');
const app = express();
const userRoutes = require('./routes/user');
const cors = require('cors');

app.use(cors());
app.use('/api', userRoutes);

//Middleware to log request details
const requestLogger = (req, res, next) => {
    const timeStamp = new Date().toISOString();
    console.log(`[MIDDLEWARE] [${timeStamp}] ${req.method} ${req.url}`);
    next();
}

app.use(express.json()); //Middleware to parse JSON request
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); //Will setup SwaggerUI for our express application



//Middleware to parse form data
app.use(express.urlencoded({ extended: true}));

app.use(requestLogger); //Apply our middleware globally

//Serve static files from 'public' folder
app.use(express.static('public'));

//Routes
app.get('/about', (req, res) => {
    res.send('This is the about page route')
});

app.get('/', (req, res) => {
    console.log("[ROUTE] GET /");
    res.send('New Visitor')
});

app.get('/contact', (req, res) => {
    console.log("[ROUTE] GET /contact");
    res.send('Contact Page Route');
})

//Form POST Route
app.post('/submit-form', (req, res) => {
    console.log("[ROUTE] POST /submit-form");
    console.log("Form Data Recieved: ", req.body);
    res.send(`Form submitted successfully! Name: ${req.body.name}, Message: ${req.body.message}`)
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
    console.log(`Swagger docs available at ${PORT}/api-docs`);
});