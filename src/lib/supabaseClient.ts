import { createClient } from '@supabase/supabase-js';

// ⚠️ IMPORTANTE: Reemplaza esto con TUS datos reales de Supabase
const supabaseUrl = 'https://mvvmmewieigfslvqroia.supabase.co';
const supabaseKey = 'sb_publishable_56CWrG6Em20ZuFMeik_2gg_JyfI3_20';

export const supabase = createClient(supabaseUrl, supabaseKey);
