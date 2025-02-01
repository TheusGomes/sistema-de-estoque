import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('revoke')
  async revoke(@Body() body: { token: string }) {
    return this.authService.revokeToken(body.token);
  }
}
