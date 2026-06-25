const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 1. If this logs 'undefined', your browser cannot see the Vercel variables.
console.log("Supabase URL Check:", supabaseUrl ? "Found" : "MISSING");
console.log("Supabase Key Check:", supabaseAnonKey ? "Found" : "MISSING");

// 2. Initialize the client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);