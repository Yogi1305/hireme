// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import  { Strategy, StrategyOptions, VerifyCallback } from 'passport-google-oauth20';

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
//   constructor() {
//     const options: StrategyOptions = {
//       clientID: process.env.client_id,
//       clientSecret: process.env.client_secret,
//       callbackURL:  process.env.redirect_uris,
//       scope: ['email', 'profile'],
//     };
//     super(options);
//   }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//     done: VerifyCallback,
//   ): Promise<any> {
//     const { name, emails, photos } = profile;
//     const user = {
//       email: emails[0].value,
//       firstName: name.givenName,
//       lastName: name.familyName,
//       picture: photos[0].value,
//       accessToken,
//     };
//     done(null, user);
//   }
// }
