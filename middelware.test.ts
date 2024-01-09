import { Request, Response, NextFunction } from 'express';
import { isLoggedIn } from "./middelware";

// Mocking the Request, Response, and NextFunction objects
const req: Request = {
  session: {}
} as Request;

const res: Response = {
    status: jest.fn(() => res),
    json: jest.fn()
} as unknown as Response;

const next: NextFunction = jest.fn();

describe('isLoggedIn middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call next() if the user is logged in', () => {
    req.session.email = 'test@example.com';

    isLoggedIn(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return a 401 status and error message if the user is not logged in', () => {
    isLoggedIn(req, res, next);

    // expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'access denied. you are not logged in.' });
  });
});