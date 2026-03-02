import { Injectable } from "@nestjs/common";
import { SupabaseService } from "../util/supabase.config";
import { UserService } from "./user.service";
import { promises as fs } from 'fs';

@Injectable()
export class UploadFileService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly userService: UserService
  ) {}

  async processFile(file: any, userId: string) {
    // 1. Get user profile
    const profile = await this.userService.getProfileByUserId(userId);
    if (!profile) throw new Error("Profile not found");
    
    console.log('User profile retrieved:', { userId, profileId: profile.id, existingResumes: profile.resumes });

    // 2. If profile has a resume, delete it from Supabase
    const resumes = profile.resumes || [];
    if (resumes.length > 0 && profile.resumes != null) {
      const resumeUrl = profile.resumes[0]; // Assuming primary resume is at index 0
      console.log('Existing resume URL:', resumeUrl);
      // Try to extract the storage path from the Supabase public URL.
      // Typical public URL format: https://<proj>.supabase.co/storage/v1/object/public/resume/<userId>/<filename>
      let filePath = '';
      try {
        const match = resumeUrl.match(/\/storage\/v1\/object\/public\/resume\/(.+)$/);
        filePath = match ? match[1] : resumeUrl.split('/').slice(-2).join('/');
        console.log('Extracted file path for deletion:', filePath);
        await this.supabaseService.supabase.storage.from('resume').remove([filePath]);
        console.log('Existing resume deleted from Supabase:', filePath);
      } catch (err) {
        console.warn('Failed to remove existing resume from Supabase:', err);
      }
    }
   
    // 3. Upload new file to Supabase
    console.log('file', file);

    const uploadPath = `${userId}/${file.originalname}`;
    let fileBuffer: Buffer;
    const localPath = file.path;

    try {
      if (localPath) {
        fileBuffer = await fs.readFile(localPath);
      } else if (file.buffer) {
        fileBuffer = file.buffer;
      } else {
        throw new Error('No file buffer or local path available for upload');
      }

      const { data, error } = await this.supabaseService.supabase.storage
        .from('resume')
        .upload(uploadPath, fileBuffer, {
          contentType: file.mimetype,
          upsert: true,
        });
      if (error) throw error;

      // 4. Get public URL
      const { data: publicUrlData } = this.supabaseService.supabase.storage
        .from('resume')
        .getPublicUrl(uploadPath);

      // 5. Update profile resumes
      console.log('Public URL:', publicUrlData.publicUrl);
      profile.resumes = [publicUrlData.publicUrl];
      profile.primaryResumeIndex = 0;
      await profile.save();

      return { url: publicUrlData.publicUrl };
    } finally {
      // Remove local file if it exists on disk to avoid accumulating temp files
      if (localPath) {
        try {
          await fs.unlink(localPath);
          console.log('Local upload file deleted:', localPath);
        } catch (err) {
          console.warn('Failed to delete local file:', localPath, err);
        }
      }
    }
  }
}