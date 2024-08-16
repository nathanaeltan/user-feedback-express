const request = require("supertest");
const app = require("../app");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Feedback = require("../models/feedbackModel");

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
