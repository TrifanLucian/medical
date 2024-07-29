export interface StandardResult<T> {
  success: boolean;
  data?: T;
  message: string;
}

export const standardizeResponse = <T>(
  success: boolean,
  message: string,
  data?: T,
): StandardResult<T> => ({ success, message, data });
