const request = require('supertest');
const app = require('../app');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Feedback = require('../models/feedbackModel');

jest.mock('../models/userModel');
jest.mock('../models/productModel');
jest.mock('../models/feedbackModel');

describe('POST /feedback', () => {
    let testUser, testProduct;

    beforeEach(() => {
        testUser = { id: 1, name: 'Test User', email: 'testuser@example.com', password: 'hashedpassword' };
        testProduct = { id: 1, name: 'Test Product', description: 'Test Description' };

        User.findByPk.mockResolvedValue(testUser);
        Product.findByPk.mockResolvedValue(testProduct);
        Feedback.create.mockResolvedValue({
            id: 1,
            feedback: 'Great product!',
            product_id: testProduct.id,
            user_id: testUser.id,
            created_at: new Date()
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create feedback successfully', async () => {
        const response = await request(app)
            .post('/api/feedback')
            .send({
                feedback: 'Great product!',
                product_id: testProduct.id,
                user_id: testUser.id
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.feedback).toBe('Great product!');
        expect(response.body.product_id).toBe(testProduct.id);
        expect(response.body.user_id).toBe(testUser.id);
    });

    it('should return 400 for invalid user ID', async () => {
        User.findByPk.mockResolvedValue(null);

        const response = await request(app)
            .post('/api/feedback')
            .send({
                feedback: 'Great product!',
                product_id: testProduct.id,
                user_id: 9999 // Invalid user ID
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid user ID');
    });

    it('should return 400 for invalid product ID', async () => {
        Product.findByPk.mockResolvedValue(null);

        const response = await request(app)
            .post('/api/feedback')
            .send({
                feedback: 'Great product!',
                product_id: 9999, // Invalid product ID
                user_id: testUser.id
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid product ID');
    });
});