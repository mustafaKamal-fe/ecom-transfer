import { HttpException, HttpStatus } from '@nestjs/common';
interface ErrorObject {
  customErrorcode?: number;
  customErrorMessage?: string;
  details?: string;
}
const customAppErrors = ['BAD_REQUEST'];
export type ErrorMessages = 'BAD_REQUEST';

export class AppCustomException extends HttpException {
  static appErrors: ErrorMessages = 'BAD_REQUEST';
  static appCodes = {
    badRequest: { customCode: 1000, httpCode: HttpStatus.BAD_REQUEST },
  };
  constructor(customError = AppCustomException.appErrors) {
    const errorObject: ErrorObject = {};
    // Detect new errors that are not one of App Custom Errors (Thrown by app custom exceptions)
    if (customAppErrors.indexOf(customError) === -1) {
      errorObject.details = customError;
      customError = 'BAD_REQUEST';
    }

    errorObject.customErrorcode =
      AppCustomException.appCodes[customError].customCode;
    errorObject.customErrorMessage = customError;

    super(errorObject, AppCustomException.appCodes[customError].httpCode);
  }
}
