import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CodeVerificationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6) // ou o comprimento mínimo desejado para o código
  resetCode: string;
}

export class ResetPasswordDto extends CodeVerificationDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8) // ou o comprimento mínimo desejado para a nova senha
  newPassword: string;
}
