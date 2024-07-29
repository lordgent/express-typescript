import { SuccessResponse, ErrorResponse, ErrorNotFoundResponse,ErrorUnauthorizedFoundResponse } from '../types/responseTypes';

export const createSuccessResponse = <T>(data: T, message?: string): SuccessResponse<T> => {
  return {
    status: 200,
    data,
    message,
  };
};

export const createErrorResponse = (error: string, message: string): ErrorResponse => {
  return {
    status: 400,
    message,
    error
  };
};

export const createNotFoundResponse = (error: string, message:string): ErrorNotFoundResponse => {
  return {
    status: 404,
    message,
    error
  };
};

export const createUnauthorizedResponse = (error: string): ErrorUnauthorizedFoundResponse => {
  return {
    status: 401,
    error
  };
};
