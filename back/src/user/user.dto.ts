import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateUser {
  @IsEmail({}, { message: 'O e-mail deve ser um endereço de e-mail válido' })
  email: string;

  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @IsOptional()
  active?: boolean = true;
}
export class UserDto {
  @IsEmail({}, { message: 'O e-mail deve ser um endereço de e-mail válido' })
  email: string;

  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @IsString({ message: 'A senha deve ser uma string' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;

  @IsOptional()
  active?: boolean = true;
}

export class UserSearchDTO {
  @IsOptional()
  @IsNumber()
  limit: number = 10;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsOptional()
  order: string = 'asc';

  @IsOptional()
  asc: string = 'asc';

  @IsOptional()
  name: string;

  @IsOptional()
  email: string;
}
