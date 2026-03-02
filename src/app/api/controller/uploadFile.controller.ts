import { Controller, Post, UploadedFile, UseInterceptors, } from "@nestjs/common";
import { UploadFileService } from "../service/uploadFile.service";
import { FileInterceptor } from "@nestjs/platform-express";
// import type { Express } from "express";
import type { Multer } from "multer";
import { multerConfig } from "../util/multer.config";


@Controller("upload")
export class UploadFileController {
  constructor(private uploadFileService: UploadFileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file',multerConfig)) 
  async uploadFile(@UploadedFile() file: Multer.File) {
    // This method can be expanded to handle file upload logic, such as saving the file, processing it, etc.
    console.log('Received file:', file);
    return this.uploadFileService.processFile(file)
  }
}