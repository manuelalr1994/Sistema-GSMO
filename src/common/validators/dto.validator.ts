import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { HttpException, HttpStatus } from "@nestjs/common";

export const dtoValidate = async (dto, object) => {

  //Validate DTO
  const validation = plainToInstance(dto, object);
  const errors = await validate(validation);

  //Throw errors if any
  if (errors.length > 0) {

    const constraints = errors.map(error => {
      let constraints = []
      for (const key in error.constraints) {
        constraints.push(error.constraints[key]);
      }
      return constraints;
    });
    throw new HttpException(constraints.flat(), HttpStatus.BAD_REQUEST);
  }

  return;
};