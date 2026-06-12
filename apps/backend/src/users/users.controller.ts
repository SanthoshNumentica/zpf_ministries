import { Controller, Get, Post, Put, Delete, Body, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('admin/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private validateToken(authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No authorization token provided.');
    }

    const token = authHeader.split(' ')[1];
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }

  @Get()
  async findAll(@Headers('authorization') authHeader: string) {
    this.validateToken(authHeader);
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Headers('authorization') authHeader: string) {
    this.validateToken(authHeader);
    return this.usersService.findOne(+id);
  }

  @Post()
  async create(
    @Body() body: { dob: string; passcode: string },
    @Headers('authorization') authHeader: string,
  ) {
    this.validateToken(authHeader);
    return this.usersService.create(body.dob, body.passcode);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { dob?: string; passcode?: string },
    @Headers('authorization') authHeader: string,
  ) {
    this.validateToken(authHeader);
    return this.usersService.update(+id, body.dob, body.passcode);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Headers('authorization') authHeader: string) {
    this.validateToken(authHeader);
    return this.usersService.remove(+id);
  }
}
