import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { createUnauthorizedResponse } from '../utils/responseUtils';
import { MESSAGES } from '../utils/globalMessage';

const secretKey = process.env.JWT_SECRET as string; // Pastikan secretKey ada dan valid


export const authenticateJWT: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  if (token) {
    jwt.verify(token, secretKey, (err: jwt.VerifyErrors | null, user: any) => {
      if (err) {
        return res.status(401).json(createUnauthorizedResponse(MESSAGES.ERROR.INVALID_TOKEN));
      }

      if (user) {
        (req as any).user = {
          userId: user.userId,
          role: user.role,
        };
      }

      next();
    });
  } else {
    res.status(401).json(createUnauthorizedResponse(MESSAGES.ERROR.NO_TOKEN_PROVIDED));
  }
};
