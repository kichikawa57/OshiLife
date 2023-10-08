import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Database } from "../schema";

const SUPABASE_URL = "https://odzswjxeygxhhnibrusv.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kenN3anhleWd4aGhuaWJydXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0MzAwNTIsImV4cCI6MjAxMTAwNjA1Mn0.1m_Sq3j3LmkZo2qeDIqo9TR-5nTdnwdrALzNfFSj8DU";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_API_KEY, {
  auth: {
    storage: AsyncStorage,
  },
});
