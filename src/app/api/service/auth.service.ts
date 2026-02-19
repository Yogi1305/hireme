import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async handleGoogleLogin(googleUser: any) {
    let user = null
    // await this.userService.findByEmail(googleUser.email);
    // if (!user) {
    //   user = await this.userService.create({
    //     email: googleUser.email,
    //     name: googleUser.firstName + ' ' + googleUser.lastName,
    //     avatar: googleUser.picture,
    //   });
    // }
    // const payload = { sub: user.id, email: user.email };
    // const token = this.jwtService.sign(payload);
    // return { user, token };
  }
}
