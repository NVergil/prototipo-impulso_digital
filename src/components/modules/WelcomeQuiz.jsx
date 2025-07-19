import { Typography } from 'antd';
import React, { useEffect } from 'react';
const { Text } = Typography;

function WelcomeQuiz({ onFinish }) {
  useEffect(() => {
    // Opcional: puedes agregar un timeout para ocultar el splash automáticamente
    // setTimeout(() => onFinish && onFinish(), 2000);
  }, [onFinish]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#fff',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <h1 style={{
        fontWeight: 800,
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 1.1,
      }}>
        ¡Ahora eres parte<br />de Impulso Digital!
      </h1>
      <div style={{ width: '100%', maxWidth: 320, marginBottom: 32, position: 'relative', height: 300 }}>
        <img src="/pre_quiz/prequiz_2.svg" alt="Bienvenida personaje" style={{ width: '90%', height: 'auto', position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }} />
        <img src="/pre_quiz/prequiz_1.svg" alt="Bienvenida fondo" style={{ width: '100%', height: '220px', objectFit: 'contain', position: 'absolute', top: 30, left: 5, zIndex: 2 }} />
      </div>
      <Text style={{ textAlign: 'center', color: '#3E3C3C', fontSize: 16, marginBottom: 15}}>
        Responde el Quiz, es muy rápido y esto nos permite ofrecerte una experiencia mejorada con IA
      </Text>
      <button
        style={{
          width: '100%',
          maxWidth: 320,
          background: '#82C0FF',
          color: '#1A365D',
          fontWeight: 700,
          fontSize: 18,
          border: 'none',
          borderRadius: 12,
          padding: '16px 0',
          cursor: 'pointer',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        }}
        onClick={onFinish}
      >
        Responde el Quiz
      </button>
    </div>
  );
}

export default WelcomeQuiz;
