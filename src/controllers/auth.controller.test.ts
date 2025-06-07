import { NextFunction, Request, Response } from "express";
import { authController } from "./auth.controller";
import User from "../models/user.model";

jest.mock("../models/user.model.ts");

describe("register controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: Partial<NextFunction>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();

    req = {
      body: {
        name: "example",
        email: "test@example.com",
        password: "password123",
      },
    };
    res = {
      status: statusMock,
      json: jsonMock,
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return 400 if user already exists", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(true);

    await authController.register(
      req as Request,
      res as Response,
      next as NextFunction
    );

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Email already exists" });
  });

  test("should create a new user and return 201", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    const mockedUser = {
      _id: "12345",
      name: "example",
      email: req.body.email,
      role: "user",
      password: "hashedPassword",
    };

    User.prototype.save = jest.fn().mockResolvedValue(mockedUser);

    await authController.register(
      req as Request,
      res as Response,
      next as NextFunction
    );

    expect(User.findOne).toHaveBeenCalledWith({
      email: "test@example.com",
    });
    expect(User.prototype.save).toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "User registered successfully",
      user: {
        _id: "12345",
        name: "example",
        email: "test@example.com",
        role: "user",
        password: "hashedPassword",
      },
    });
  });
});
