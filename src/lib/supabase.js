import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ibqotjxqmrefxmrcutyp.supabase.co";
const supabaseKey = "sb_publishable_V_GhPFSmH-BjXuF387j2xw_TrsVlOq0";

export const supabase = createClient(supabaseUrl, supabaseKey);