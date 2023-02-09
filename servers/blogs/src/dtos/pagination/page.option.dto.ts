import { Field, InputType } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Order } from './constants';

@InputType()
export class PageOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.DESC })
  @IsEnum(Order)
  @IsOptional()
  @Field()
  readonly order?: Order = Order.DESC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  @Field()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  @Field()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
