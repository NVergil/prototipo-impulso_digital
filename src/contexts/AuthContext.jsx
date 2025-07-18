// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../utils/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true); // Carga inicial de autenticación al iniciar la app
  const [isDiagnosisComplete, setIsDiagnosisComplete] = useState(false);
  const [diagnosisLoading, setDiagnosisLoading] = useState(true); // Carga inicial del diagnóstico

  // Función para verificar el estado del diagnóstico
  const checkAndSetDiagnosisStatus = useCallback(async (currentUser) => {
    // Solo mostramos 'diagnosisLoading' si hay un usuario logeado y el diagnóstico no está completo aún
    // O si estamos cargando el diagnóstico por primera vez con un usuario.
    if (currentUser) {
      // Evitamos setear a true si ya está completo y no hay una razón para recargar
      if (!isDiagnosisComplete) { // Solo establece a true si el diagnóstico no está marcado como completo
         setDiagnosisLoading(true);
      }
      try {
        const { data, error } = await supabase
          .from('user_diagnostics')
          .select('diagnosis_completed')
          .eq('id', currentUser.id)
          .maybeSingle();

        if (error) {
          console.error("Error checking diagnostic status in AuthContext:", error.message);
          setIsDiagnosisComplete(false);
        } else {
          setIsDiagnosisComplete(data?.diagnosis_completed || false);
        }
      } catch (error) {
        console.error("Unexpected error checking diagnostic status in AuthContext:", error.message);
        setIsDiagnosisComplete(false);
      } finally {
        setDiagnosisLoading(false); // Siempre termina la carga del diagnóstico
      }
    } else {
      // Si no hay usuario, el diagnóstico no está completo y no hay carga de diagnóstico.
      setIsDiagnosisComplete(false);
      setDiagnosisLoading(false);
    }
  }, [isDiagnosisComplete]); // Depende de isDiagnosisComplete para decidir si poner loading en true inicialmente

  useEffect(() => {
    // Establece loading en true al principio para la primera verificación de autenticación
    // Esto asegura que la aplicación muestre "Cargando..." mientras Supabase inicializa.
    setLoading(true);

    const { data: { subscription: authListenerSubscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user || null);

        // Cuando Supabase ha verificado la sesión (ya sea logeado o no),
        // terminamos la carga principal de autenticación.
        setLoading(false);

        // Solo llamamos a checkAndSetDiagnosisStatus si hay un usuario logeado
        // O si previamente había un usuario y ahora no (para resetear el estado de diagnóstico)
        checkAndSetDiagnosisStatus(session?.user);
      }
    );

    return () => {
      if (authListenerSubscription) {
        authListenerSubscription.unsubscribe();
      }
    };
  }, [checkAndSetDiagnosisStatus]); // checkAndSetDiagnosisStatus ya es estable por useCallback

  const refreshDiagnosisStatus = useCallback(() => {
    checkAndSetDiagnosisStatus(user);
  }, [user, checkAndSetDiagnosisStatus]);

  const handleSignOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // Al cerrar sesión, reseteamos todos los estados relevantes para asegurar que no quede nada en carga.
      setUser(null);
      setSession(null);
      setLoading(false);
      setIsDiagnosisComplete(false);
      setDiagnosisLoading(false);
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error.message);
      throw error;
    }
  }, []);

  const value = {
    user,
    session,
    loading, // Estado de carga general de la aplicación/autenticación
    isDiagnosisComplete,
    diagnosisLoading, // Estado de carga específico de la verificación del diagnóstico
    refreshDiagnosisStatus,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};