import { Injectable } from '@nestjs/common';

@Injectable()
export class Service {

    test(){
        return `Hello World service ${process.env.DB_HOST}`;
    }

    // Example update method
    update(id: string, data: any) {
        // Implement update logic here
        return `Update not implemented for id ${id}`;
    }

    // Example delete method
    delete(id: string) {
        // Implement delete logic here
        return `Delete not implemented for id ${id}`;
    }
}
