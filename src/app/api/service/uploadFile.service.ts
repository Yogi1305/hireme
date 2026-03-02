import { Injectable } from "@nestjs/common";


@Injectable()
export class UploadFileService {
  // This service can be expanded to handle file processing, storage, etc.

  async processFile(file:File) {
    // 
    console.log('Processing file:', file);
    
    return {
      filename: file,}
  }
}