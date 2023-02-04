import { HttpException } from '@nestjs/common';

export class CustomError extends HttpException {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}
