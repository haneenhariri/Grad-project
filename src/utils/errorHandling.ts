import { AxiosError } from 'axios';

export function handleError(error: unknown, defaultMessage: string): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message || defaultMessage;
  }
  
  if (error instanceof Error) {
    return error.message || defaultMessage;
  }
  
  return defaultMessage;
}