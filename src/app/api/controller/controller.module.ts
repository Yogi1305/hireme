import { Get, Module } from '@nestjs/common';

@Module({})
export class ControllerModule {

    @Get("/")
    getHello(): string {
        return 'Hello World! yogesh';
    }
}
