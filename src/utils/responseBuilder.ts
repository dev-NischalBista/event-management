export const buildSuccessMessage = (
  status: number,
  message: string,
  data?: unknown
) => ({ success: true, message, data, status });

export const buildErrorMessage = (
  status: number,
  message: string,
  error?: any
) => ({ success: false, message, error, status });
