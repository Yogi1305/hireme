import { Controller, Post, UploadedFile, UseInterceptors, Req, UseGuards } from "@nestjs/common";
import { UploadFileService } from "../service/uploadFile.service";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Multer } from "multer";
import { multerConfig } from "../util/multer.config";
import { JwtAuthGuard } from "src/app/guard/jwt.auth";

@Controller("upload")
export class UploadFileController {
  constructor(private uploadFileService: UploadFileService) {}
  @UseGuards(JwtAuthGuard) // Add appropriate guards if needed
  @Post("file")
  @UseInterceptors(FileInterceptor("file", multerConfig))
  async uploadFile(@UploadedFile() file: Multer.File, @Req() req: any) {
    // Assume userId is available on req.user.id (adjust as needed)
    
    const userId = req.user?.id;
    console.log('Received file upload request:', { userId, fileName: file?.originalname });
    if (!userId) throw new Error("User not authenticated");
    return this.uploadFileService.processFile(file, userId);
  }
}