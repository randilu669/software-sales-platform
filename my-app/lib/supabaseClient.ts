import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tujwvphvoowffuykqrji.supabase.co'
const supabaseAnonKey = 'sb_publishable_qvyP99rpdUf7tJaCEceQ9g_lWYFW-f3'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)