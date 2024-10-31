import { ClassTransformOptions, instanceToPlain, plainToClass } from 'class-transformer';

export class GenericMapper {
  static fromDTOtoEntity<T extends U, U>(
    dto: T,
    entityClass: new () => U,
  ): U {
    if (!dto) return null;

    const newEntity = new entityClass();
    const fields = Object.getOwnPropertyNames(dto);
    fields.forEach((field) => {
      newEntity[field] = dto[field];
    });

    return newEntity;
  }

  static fromEntityToDTO<T, U>(entity: U, dtoClass: new () => T): T {
    const transformOptions: ClassTransformOptions = {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    };

    const dtoInstance = plainToClass(dtoClass, entity, transformOptions);
    return instanceToPlain(dtoInstance, transformOptions) as T;
  }
}