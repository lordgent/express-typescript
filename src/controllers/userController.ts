import { Request, Response } from 'express';
import { 
  getAllUsers, 
  createUser,
  findUserByEmail
 } from '../services/userService';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwtUtils';
import { createSuccessResponse, createUnauthorizedResponse,createErrorResponse} from '../utils/responseUtils';
import { MESSAGES } from '../utils/globalMessage';
import { ErrorDetail } from '../types/errorDetail';


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(createSuccessResponse(users));
  } catch (error: unknown) {
    const err = error as ErrorDetail;
    res.status(500).json(createErrorResponse(MESSAGES.ERROR.INTERNAL_SERVER_ERROR, err.message));
  }
};


export const registerUser = async (req: Request, res: Response) => {
  try {

    const { email, name, password, phoneNumber, roles } = req.body;
    
    if (!email || !password) {
      return res.status(400).json(createErrorResponse(MESSAGES.ERROR.INTERNAL_SERVER_ERROR,""));
    }

    if (roles && !Array.isArray(roles)) {
      return res.status(400).json(createErrorResponse(MESSAGES.ERROR.INTERNAL_SERVER_ERROR,""));
    }

    const newUser = await createUser(email, name, password, phoneNumber, roles);
    res.status(201).json(createSuccessResponse(newUser, MESSAGES.SUCCESS.USER_CREATED));

  } catch (error: unknown) {
    const customError = error as Error;
    res.status(500).json(createErrorResponse(MESSAGES.ERROR.INTERNAL_SERVER_ERROR, customError.message));
  }
};

export const loginUser = async (req: Request, res: Response) => {
  
  try {

    const { email, password } = req.body;
    const user = await findUserByEmail(email);


    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json(createUnauthorizedResponse(MESSAGES.ERROR.INVALID_EMAIL_PASSWORD));
    }

    const token = generateToken(user.id,user.roles.map(item => item.role.name));

    const response = {
      email: user.email,
      name: user.name,
      roles: user.roles.map(userRole => userRole.role.name),
      token: token
    }

    return res.status(200).json(createSuccessResponse(response,MESSAGES.SUCCESS.LOGIN_SUCCESS));
  } catch (error: unknown) {

    const err = error as ErrorDetail;
    res.status(500).json(createErrorResponse(MESSAGES.ERROR.INTERNAL_SERVER_ERROR, err.message));

  }
};

