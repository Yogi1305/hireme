// supabase.service.ts
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  public readonly supabase: SupabaseClient;

  constructor() {
    // Ensure SUPABASE_URL is the project URL, not the storage URL
    // console.log('Initializing Supabase client with URL:', process.env.SUPABASE_PROJECT_URL || process.env.SUPABASE_URL);
    const url = process.env.SUPABASE_PROJECT_URL || process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error('Missing Supabase environment variables');
    }
    this.supabase = createClient(url, key);
    // console.log('Supabase client initialized with URL:', url);
  }
}
