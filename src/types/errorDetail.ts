export interface ErrorDetail extends Error {
    statusCode?: number;
    data?: any;
  }
  