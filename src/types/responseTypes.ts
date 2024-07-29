export interface SuccessResponse<T> {
    status: 200;
    data: T;
    message?: string;
  }
  
  export interface ErrorResponse {
    status: 400;
    message: string;
    error?: string;
  }

  export interface ErrorNotFoundResponse {
    status: 404;
    message?: string;
    error?: string;
  }

  export interface ErrorUnauthorizedFoundResponse {
    status: 401;
    message?: string;
    error?: string;
  }
  
  export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse | ErrorNotFoundResponse | ErrorUnauthorizedFoundResponse;
  