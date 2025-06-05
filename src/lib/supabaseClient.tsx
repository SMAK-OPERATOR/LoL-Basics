import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xkqtfayhjwhhkhjbdokl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrcXRmYXloandoaGtoamJkb2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMjU0NjQsImV4cCI6MjA2NDcwMTQ2NH0.ETGdOJwF--pw_0wNcIVlL6mJ-0nIy9noMdfg-K420Ag';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);