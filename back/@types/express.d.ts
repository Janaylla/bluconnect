import { User } from '@prisma/client'; // ou onde estiver definido o tipo de usuário

declare module 'express' {
  export interface Request {
    user?: User; // Defina o tipo de 'user' aqui conforme sua aplicação
  }
}
