import { Module } from '@nestjs/common';
import { ControllerModule } from './controller/controller.module';
import { ServiceService } from './service/service.service';

@Module({
  imports: [ControllerModule],
  providers: [ServiceService]
})
export class ApiModule {}
