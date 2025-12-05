import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://fldzmtlipsfvjpzzkbna.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsZHptdGxpcHNmdmpwenprYm5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2ODM1ODAsImV4cCI6MjA4MDI1OTU4MH0.GC7UKt5NfjEmqXKdt8VrJwLvh8dFuXjISyRttVEDPkQ"
);
