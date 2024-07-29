import { Request, Response } from 'express';
import { 
  createRole
 } from '../services/roleService';
 import { createSuccessResponse,createErrorResponse} from '../utils/responseUtils';
 import { MESSAGES } from '../utils/globalMessage';
 
 
export const addNewRole = async (req: Request, res: Response) => {
    try {
  
      const { name } = req.body;

      const newUser = await createRole(name);
      res.status(201).json(createSuccessResponse(newUser, MESSAGES.SUCCESS.USER_CREATED));
  
    } catch (error: unknown) {
      const customError = error as Error;
      res.status(500).json(createErrorResponse(MESSAGES.ERROR.INTERNAL_SERVER_ERROR, customError.message));
    }
  };