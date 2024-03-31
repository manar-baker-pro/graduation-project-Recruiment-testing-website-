export class ApiError {
  readonly code: number;
  readonly message: any;
  constructor(code: number, message: any) {
    this.code = code;
    this.message = message;
  }

  static BadRequest(msg: any) {
    return new ApiError(400, msg);
  }
  static Unauthorized(msg: any) {
    return new ApiError(401, msg);
  }
  static MethodNotAllowed(msg: any) {
    return new ApiError(405, msg);
  }

  static Forbidden(msg: any) {
    return new ApiError(403, msg);
  }
  
  static NotFound(msg: any) {
    return new ApiError(404, msg);
  }
  // TransPor
  static BadGateway(msg: any) {
    return new ApiError(502, msg);
  }
  static InternalServerError(msg: any) {
    return new ApiError(500, msg);
  }
}
