import { createClient } from "@supabase/supabase-js";

const supabaseUrl ="https://hdlahckfingtktevnsnr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkbGFoY2tmaW5ndGt0ZXZuc25yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU3MjQ4MjQsImV4cCI6MTk5MTMwMDgyNH0.6ihVubLYvjdYd8U3Pq1IrMXw8C40tQ9wctp6DAmEo1c"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    redirectTo: window.location.origin
  });
  console.log(error);
  console.log(data);
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  alert(error)
}
