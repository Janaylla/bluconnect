import { passwordChangedEmail } from './templates/passwordChangedEmail.template';
import { passwordRecoveryEmail } from './templates/passwordRecoveryEmail.template';

type EmailType = 'passwordChanged' | 'passwordRecovery';

export interface SendEmailDto {
  to: string;
  type: EmailType;
  context: any;
}

export const tempatesEmail: Record<
  EmailType,
  {
    tempate: (p: any) => string;
    subject: string;
  }
> = {
  passwordChanged: {
    tempate: passwordChangedEmail,
    subject: 'Senha Alterada com Sucesso',
  },
  passwordRecovery: {
    tempate: passwordRecoveryEmail,
    subject: 'Recuperação de Senha',
  },
};
