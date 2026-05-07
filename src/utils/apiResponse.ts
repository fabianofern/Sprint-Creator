import { ApiResponse } from '../types/index.js';

export const success = <T>(data: T, message?: string): ApiResponse<T> => {
  return {
    success: true,
    message,
    data,
  };
};

export const error = (message: string, errors?: any): ApiResponse<null> => {
  return {
    success: false,
    message,
    errors,
  };
};
