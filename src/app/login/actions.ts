'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Por favor, ingrese su correo electrónico y contraseña.' };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Translate some common errors for user-friendliness
    let message = error.message;
    if (error.message === 'Invalid login credentials') {
      message = 'Credenciales de acceso incorrectas. Verifique su correo y contraseña.';
    }
    return { error: message };
  }

  // Fetch the role to redirect to the correct dashboard
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single();

  const role = profile?.role || 'student';

  redirect(`/dashboard/${role}`);
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}
