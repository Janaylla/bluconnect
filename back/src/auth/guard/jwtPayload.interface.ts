export interface JwtPayload {
  sub: number; // ou string, dependendo do tipo de ID
  username: string;
}
