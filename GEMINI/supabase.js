import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.2';

const TABLE_NAME = 'test_items';
const TIMEOUT_MS = 3000;

// Helper function to add a timeout to any promise
const withTimeout = (promise) => {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out')), TIMEOUT_MS)
  );
  return Promise.race([promise, timeout]);
};

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        status: 204,
      });
    }

    const corsHeaders = { 'Access-Control-Allow-Origin': '*' };

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { 'x-my-custom-header': 'my-app-name' },
        },
      }
    );

    const url = new URL(req.url);
    const path = url.pathname;

    if (path.startsWith('/auth')) {
      if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Only POST method is allowed for auth routes' }), 
        { status: 405, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
      }

      const { email, password } = await req.json();

      if (!email || !password) {
        return new Response(JSON.stringify({ error: 'Email and password are required' }), 
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
      }

      let authResponse;
      if (path === '/auth/signup') {
        authResponse = await withTimeout(supabase.auth.signUp({ email, password }));
      } else if (path === '/auth/login') {
        authResponse = await withTimeout(supabase.auth.signInWithPassword({ email, password }));
      } else {
        return new Response(JSON.stringify({ error: 'Invalid auth route' }), 
        { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
      }

      const { data, error } = authResponse;

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), 
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
      }
      
      return new Response(JSON.stringify(data), 
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing Authorization header' }), 
      { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await withTimeout(supabase.auth.getUser(token));

    if (userError || !user) {
      return new Response(JSON.stringify({ error: userError?.message || 'Invalid or expired token' }), 
      { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    const handleRequest = async () => {
      if (req.method === 'GET') {
        const query = supabase.from(TABLE_NAME).select('*');
        if (url.searchParams.has('id')) {
          query.eq('id', url.searchParams.get('id'));
        }
        return await withTimeout(query);
      } else if (req.method === 'POST') {
        const body = await req.json();
        return await withTimeout(supabase.from(TABLE_NAME).insert(body).select());
      } else if (req.method === 'PUT') {
        if (!url.searchParams.has('id')) {
          return { data: null, error: { message: 'Missing id parameter for update' } };
        }
        const body = await req.json();
        return await withTimeout(supabase.from(TABLE_NAME).update(body).eq('id', url.searchParams.get('id')).select());
      } else if (req.method === 'DELETE') {
        if (!url.searchParams.has('id')) {
          return { data: null, error: { message: 'Missing id parameter for delete' } };
        }
        return await withTimeout(supabase.from(TABLE_NAME).delete().eq('id', url.searchParams.get('id')).select());
      }
      return { data: null, error: { message: `Method ${req.method} not supported.` } };
    };

    const { data, error } = await handleRequest();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        status: 400,
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      status: 200,
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      status: 500,
    });
  }
});