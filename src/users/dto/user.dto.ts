import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const UserRoleEnum = z.enum([
  'ADMINISTRATOR',
  'MANAGER',
  'SUPERVISOR',
  'STAFF',
]);

export const CreateUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: UserRoleEnum.default('STAFF'),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional(),
  role: UserRoleEnum.optional(),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
