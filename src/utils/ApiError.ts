export class ApiError extends Error {
  public statusCode: number;
  
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
  
  static badRequest(message: string): ApiError {
    return new ApiError(400, message);
  }
  
  static notFound(message: string): ApiError {
    return new ApiError(404, message);
  }
  
  static internal(message: string): ApiError {
    return new ApiError(500, message);
  }
}