import { Controller, Post, Body } from '@nestjs/common';
import { PasswordRecoveryService } from './passwordRecovery.controller';
import { CodeVerificationDto, ResetPasswordDto } from './passwordRecovery.dto';

@Controller('auth')
export class PasswordRecoveryController {
  constructor(
    private readonly passwordRecoveryService: PasswordRecoveryService,
  ) {}

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    await this.passwordRecoveryService.sendRecoveryEmail(email);
    return { message: 'E-mail de recuperação enviado' };
  }
  @Post('confirm-code')
  async confirmCode(@Body() body: CodeVerificationDto) {
    return await this.passwordRecoveryService.confirmCode(body);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    await this.passwordRecoveryService.resetPassword(body);
    return { message: 'Senha redefinida com sucesso' };
  }
}
