import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseHttpException extends HttpException {
  constructor(error: unknown) {
    const errorText = error instanceof Error ? error.message : String(error);
    super({ status: 'error', error: errorText }, HttpStatus.BAD_REQUEST);
  }
}
