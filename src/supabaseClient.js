import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase URL and Anon Key from Project Settings -> API
const supabaseUrl = 'https://tpzigvqtamrnbtmmeugo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwemlndnF0YW1ybmJ0bW1ldWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNzY0OTQsImV4cCI6MjA4MDc1MjQ5NH0.5yqVTi_64PQAHzckbw9zqb1EJrtex2-LTcqq_ABvZSM';

export const supabase = createClient(supabaseUrl, supabaseKey);