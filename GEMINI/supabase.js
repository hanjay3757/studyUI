import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.2';
Deno.serve(async (req)=>{
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
      global: {
        headers: {
          'x-my-custom-header': 'my-app-name'
        }
      }
    });
    const { data, error } = await supabase.from('test_items').select('*');
    if (error) {
      console.error('Error fetching data:', error.message);
      return new Response(JSON.stringify({
        error: error.message
      }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 500
      });
    }
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200
    });
  } catch (e) {
    console.error('Unexpected error:', e.message);
    return new Response(JSON.stringify({
      error: e.message
    }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500
    });
  }
});
