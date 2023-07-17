import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, getSchemaPath } from '@nestjs/swagger';
import { CustomAppErrorDto, ValdiationErrorDto } from './exceptions.dto';
export function apiExceptionResponse() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Bad request',
      schema: {
        oneOf: [
          { $ref: getSchemaPath(CustomAppErrorDto) },
          {
            $ref: getSchemaPath(ValdiationErrorDto),
          },
        ],
      },
    }),
  );
}
