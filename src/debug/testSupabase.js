// Archivo de prueba para verificar la configuración de Supabase
import { supabase } from '../utils/supabaseClient.js';

export const testSupabaseConnection = async () => {
  try {
    console.log('🔍 Verificando configuración de Supabase...');
    
    // Verificar variables de entorno
    console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('VITE_SUPABASE_ANON_KEY presente:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
    console.log('VITE_SUPABASE_ANON_KEY longitud:', import.meta.env.VITE_SUPABASE_ANON_KEY?.length || 0);
    
    // Intentar una consulta simple
    const { data, error } = await supabase
      .from('user_diagnostics')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Error al conectar con Supabase:', error);
      return { success: false, error };
    } else {
      console.log('✅ Conexión exitosa con Supabase');
      return { success: true, data };
    }
    
  } catch (error) {
    console.error('❌ Error en la prueba de conexión:', error);
    return { success: false, error };
  }
};

// Puedes llamar esta función desde la consola del navegador
// testSupabaseConnection();
