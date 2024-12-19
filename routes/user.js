const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /users:
 *    get:
 *      summary: Retrieve a list of users
 *      description: Fetch all users from the database
 *      responses:
 *          200:
 *              description: A list of users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties: 
 *                                  id:
 *                                     type: integer
 *                                  name:
 *                                      type: string
 */

router.get('/users', (req, res) => {
    res.json([{id: 1, name: 'Michael Wilcox'}]);
});

/**
 * @swagger
 * /users:
 *   post:
 *      summary: Create a new user
 *      description: Add a new user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 * 
 *      response:
 *          201:
 *              description: User created successfully
 */

router.post('/user', (req, res) => {
    const { name } = req.body;
    res.status(201).json({ id: 2, name });
});

module.exports = router;