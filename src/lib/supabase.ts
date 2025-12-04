import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oiaitmtnpwsstggiluep.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pYWl0bXRucHdzc3RnZ2lsdWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MzQzNzAsImV4cCI6MjA3OTUxMDM3MH0.l-TgK4nKi3glLwVP1fIbWmOLTURmc9VOqATD7CBfZ4c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
