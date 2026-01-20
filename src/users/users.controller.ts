import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body(ZodValidationPipe) createUserDto: CreateUserDto) {
    try {
      const data = await this.userService.create(createUserDto);
      return {
        statusCode: 201,
        message: 'User created successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const data = await this.userService.findAll();
      return {
        statusCode: 200,
        message: 'User found successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const data = await this.userService.findOne(id);
      return {
        statusCode: 200,
        message: 'User found successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ZodValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    try {
      const data = await this.userService.update(id, updateUserDto);
      return {
        statusCode: 200,
        message: 'User updated successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const data = await this.userService.remove(id);
      return {
        statusCode: 200,
        message: 'User deleted successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
