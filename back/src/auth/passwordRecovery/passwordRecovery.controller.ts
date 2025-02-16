import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';
import { CodeVerificationDto, ResetPasswordDto } from './passwordRecovery.dto';
import { MailService } from 'src/mail/mail.service';
import { User } from '@prisma/client';
@Injectable()
export class PasswordRecoveryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async sendRecoveryEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    // Gerar um código de recuperação aleatório
    const recoveryCode = Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos

    const codeExpires = new Date();
    codeExpires.setMinutes(codeExpires.getMinutes() + 5); // O código expira em 5 minutos

    await this.mailService.sendEmail({
      context: { code: recoveryCode, name: user.name },
      to: user.email,
      type: 'passwordRecovery',
    });

    await this.prisma.user.update({
      where: { email },
      data: {
        resetPasswordCode: recoveryCode,
        resetCodeExpires: codeExpires,
      },
    });
  }
  getUserByEmail = async (email: string) => {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  };
  async codigoIsValid(user: User, resetCode: string) {
    if (
      user.resetPasswordCode !== resetCode ||
      new Date() > user.resetCodeExpires
    ) {
      throw new UnauthorizedException('Código inválido ou expirado');
    }
    return true;
  }
  async confirmCode(body: CodeVerificationDto) {
    const user = await this.getUserByEmail(body.email);
    await this.codigoIsValid(user, body.resetCode);
    return true;
  }
  async resetPassword({ email, newPassword, resetCode }: ResetPasswordDto) {
    const user = await this.getUserByEmail(email);
    await this.codigoIsValid(user, resetCode);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordCode: null,
        resetCodeExpires: null,
      },
    });
    await this.mailService.sendEmail({
      context: { name: user.name },
      to: user.email,
      type: 'passwordChanged',
    });
  }
}
