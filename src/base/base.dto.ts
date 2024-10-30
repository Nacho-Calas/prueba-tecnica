import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsUUID } from 'class-validator';

export class BaseDTO {

  @ApiProperty({ description: 'Schema ID'})
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty({ description: 'Fehca de creacion'})
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @ApiProperty({ description: 'Fecha que se modifico'})
  @IsDate()
  @IsOptional()
  updatedAt: Date;

  @ApiProperty({ description: 'Fecha que se elimino'})
  @IsDate()
  @IsOptional()
  deletedAt?: Date;
}
