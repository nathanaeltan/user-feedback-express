const request = require("supertest");
const app = require("../app");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Feedback = require("../models/feedbackModel");
const feedbackService = require("../services/feedbackService");

describe("POST /feedback", () => {
  let testUser, testProduct;
  jest
    .spyOn(User, "findByPk")
    .mockResolvedValue({
      id: 1,
      name: "Test User",
      email: "testuser@example.com",
      password: "hashedpassword",
    });
  jest
    .spyOn(Product, "findByPk")
    .mockResolvedValue({
      id: 1,
      name: "Test Product",
      description: "Test Description",
    });
  jest.spyOn(Feedback, "create").mockResolvedValue({
    id: 1,
    feedback: "Great product!",
    product_id: 1,
    user_id: 1,
  });

  beforeEach(() => {
    testUser = {
      id: 1,
      name: "Test User",
      email: "testuser@example.com",
      password: "hashedpassword",
    };
    testProduct = {
      id: 1,
      name: "Test Product",
      description: "Test Description",
    };

    User.findByPk.mockResolvedValue(testUser);
    Product.findByPk.mockResolvedValue(testProduct);
    Feedback.create.mockResolvedValue({
      id: 1,
      feedback: "Great product!",
      product_id: testProduct.id,
      user_id: testUser.id,
      created_at: new Date(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create feedback successfully", async () => {
    const response = await request(app).post("/api/feedback").send({
      feedback: "Great product!",
      product_id: testProduct.id,
      user_id: testUser.id,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.feedback).toBe("Great product!");
    expect(response.body.product_id).toBe(testProduct.id);
    expect(response.body.user_id).toBe(testUser.id);
  });

  it("should return 400 for invalid user ID", async () => {
    User.findByPk.mockResolvedValue(null);

    const response = await request(app).post("/api/feedback").send({
      feedback: "Great product!",
      product_id: testProduct.id,
      user_id: 9999, // Invalid user ID
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid user ID");
  });

  it("should return 400 for invalid product ID", async () => {
    Product.findByPk.mockResolvedValue(null);

    const response = await request(app).post("/api/feedback").send({
      feedback: "Great product!",
      product_id: 9999, // Invalid product ID
      user_id: testUser.id,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid product ID");
  });
});

describe("GET /api/feedback", () => {
  let testFeedbacks = [
    {
      id: 1,
      feedback: "Great product!",
      product_id: 1,
      user_id: 1,
      created_at: new Date(),
      Product: {
        id: 1,
        name: "Test Product",
        description: "Test Description",
      },
    },
    {
      id: 2,
      feedback: "Not bad",
      product_id: 2,
      user_id: 2,
      created_at: new Date(),
      Product: {
        id: 2,
        name: "Another Product",
        description: "Another Description",
      },
    },
  ];
  jest.spyOn(Feedback, "findAll").mockResolvedValue(testFeedbacks);
  beforeEach(() => {
    Feedback.findAll.mockResolvedValue(testFeedbacks);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all feedbacks successfully", async () => {
    const response = await request(app).get("/api/feedback");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("id", 1);
    expect(response.body[0]).toHaveProperty("feedback", "Great product!");
    expect(response.body[0]).toHaveProperty("product_id", 1);
    expect(response.body[0]).toHaveProperty("user_id", 1);
    expect(response.body[0].Product).toHaveProperty("name", "Test Product");
  });

  it("should return 500 if there is a server error", async () => {
    Feedback.findAll.mockRejectedValue(new Error("Server error"));

    const response = await request(app).get("/api/feedback");

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Server error");
  });
});

describe('GET /api/feedback/:id', () => {
    const feedback = {
        id: 1,
        feedback: 'Great product!',
        product_id: 1,
        user_id: 1,
        created_at: new Date(),
    };

    beforeEach(() => {
        jest.spyOn(Feedback, "findByPk").mockResolvedValue(feedback);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return feedback by ID successfully', async () => {

        const response = await request(app).get('/api/feedback/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('feedback', 'Great product!');
        expect(response.body).toHaveProperty('product_id', 1);
        expect(response.body).toHaveProperty('user_id', 1);
    });

    it('should return 404 if feedback not found', async () => {
        feedbackService.getFeedbackById = jest.fn().mockResolvedValue(null);

        const response = await request(app).get('/api/feedback/9999');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'Feedback not found');
    });

    it('should return 500 if there is a server error', async () => {
        feedbackService.getFeedbackById = jest.fn().mockRejectedValue(new Error('Server error'));

        const response = await request(app).get('/api/feedback/1');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message', 'Server error');
    });
});

describe("PUT /api/feedback/:id", () => {
  let testFeedback, testUser;

beforeEach(() => {
  testUser = {
    id: 1,
    name: "Test User",
    email: "testuser@example.com",
    password: "hashedpassword",
  };

  testFeedback = {
    id: 1,
    feedback: "Great product!",
    product_id: 1,
    user_id: testUser.id,
    created_at: new Date(),
  };

  jest.spyOn(Feedback, "findByPk").mockResolvedValue(testFeedback);
});

afterEach(() => {
  jest.clearAllMocks();
});

it("should update feedback successfully", async () => {
  const updatedFeedback = {
    ...testFeedback,
    feedback: "Updated feedback",
  };

  jest.spyOn(Feedback, "update").mockResolvedValue([1, [updatedFeedback]]);
  jest.spyOn(Feedback, "findByPk").mockResolvedValue(updatedFeedback);
  const response = await request(app)
    .put("/api/feedback/1")
    .send({
      feedback: "Updated feedback",
      user_id: testUser.id,
    });

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("id", 1);
  expect(response.body).toHaveProperty("feedback", "Updated feedback");
});

it("should return 403 if user ID does not match", async () => {
  const response = await request(app)
    .put("/api/feedback/1")
    .send({
      feedback: "Updated feedback",
      user_id: 9999, // Invalid user ID
    });

  expect(response.status).toBe(403);
  expect(response.body).toHaveProperty("message", "Not allowed to update user");
});

it("should return 404 if feedback not found", async () => {
  jest.spyOn(Feedback, "findByPk").mockResolvedValue(null);

  const response = await request(app)
    .put("/api/feedback/9999")
    .send({
      feedback: "Updated feedback",
      user_id: testUser.id,
    });

  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty("message", "Feedback not found");
});

it("should return 500 if there is a server error", async () => {
  jest.spyOn(Feedback, "update").mockRejectedValue(new Error("Server error"));

  const response = await request(app)
    .put("/api/feedback/1")
    .send({
      feedback: "Updated feedback",
      user_id: testUser.id,
    });

  expect(response.status).toBe(500);
  expect(response.body).toHaveProperty("message", "Server error");
});
});


describe("DELETE /api/feedback/:id", () => {
  let testFeedback, testUser;

  beforeEach(() => {
    testUser = {
      id: 1,
      name: "Test User",
      email: "testuser@example.com",
      password: "hashedpassword",
    };

    testFeedback = {
      id: 1,
      feedback: "Great product!",
      product_id: 1,
      user_id: testUser.id,
      created_at: new Date(),
    };

    jest.spyOn(Feedback, "findByPk").mockResolvedValue(testFeedback);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete feedback successfully", async () => {
    jest.spyOn(Feedback, "destroy").mockResolvedValue(1); // 1 row deleted

    const response = await request(app)
      .delete("/api/feedback/1")
      .send();

    expect(response.status).toBe(204);
  });

  it("should return 404 if feedback not found", async () => {
    jest.spyOn(Feedback, "destroy").mockResolvedValue(0); // 0 rows deleted

    const response = await request(app)
      .delete("/api/feedback/9999")
      .send();

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Feedback not found");
  });

  it("should return 500 if there is a server error", async () => {
    jest.spyOn(Feedback, "destroy").mockRejectedValue(new Error("Server error"));

    const response = await request(app)
      .delete("/api/feedback/1")
      .send();

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Server error");
  });
});