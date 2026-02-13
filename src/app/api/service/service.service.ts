import { Injectable } from '@nestjs/common';

@Injectable()
export class Service {

    test(){
        return `Hello World service ${process.env.DB_HOST}`;
    }
}
