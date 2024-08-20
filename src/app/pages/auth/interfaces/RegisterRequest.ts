import { Role } from 'src/app/library/utils/Role';

export interface RegisterRequest {
  email: string;
  password: string;
  role: Role;
}
