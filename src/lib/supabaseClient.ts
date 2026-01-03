import { createClient } from '@supabase/supabase-js';

// ⚠️ IMPORTANTE: Reemplaza esto con TUS datos reales de Supabase
const supabaseUrl = 'https://mvvmmewieigfslvqroia.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12dm1tZXdpZWlnZnNsdnFyb2lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNjg2NjksImV4cCI6MjA4Mjk0NDY2OX0.u9jbCZ-kx_sSzRI2uIsi1j6QkXqSUAzVS4ZzG3Z5YU8';

export const supabase = createClient(supabaseUrl, supabaseKey);
