// src/pages/Login.jsx
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import SplashScreen from '../components/initialComponents/SplashScreen';
import WelcomeScreen from '../components/WelcomeScreen';

// Ya no necesitamos onLoginSuccess como prop aquí
import React, { useState, useEffect } from 'react';

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setShowWelcome(true);
    }, 1200); // 1.2s splash
    return () => clearTimeout(timer);
  }, []);

  const onFinish = async values => {
    const { username, password } = values;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });
      if (error) {
        if (error.message === 'Email not confirmed') {
          messageApi.warning('Tu cuenta aún no ha sido confirmada. Por favor, revisa tu email para el enlace de confirmación.');
        } else if (error.message === 'Invalid login credentials') {
          messageApi.error('Credenciales de inicio de sesión inválidas. Verifica tu email y contraseña.');
        } else {
          messageApi.error(`Error al iniciar sesión: ${error.message}`);
        }
      } else {
        messageApi.success('¡Sesión iniciada con éxito!');
        navigate('/home', { replace: true });
      }
    } catch (err) {
      console.error('Error inesperado:', err);
      messageApi.error('Ocurrió un error inesperado al iniciar sesión.');
    }
  };

  return (
    <>
      <SplashScreen visible={showSplash} />
      {showWelcome && (
        <WelcomeScreen onStart={() => setShowWelcome(false)} />
      )}
      {!showSplash && !showWelcome && (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px',
          }}
        >
          {contextHolder}
          <Card
            title="Iniciar sesión"
            style={{
              maxWidth: 500,
              minWidth: 'auto',
              width: '100%',
              margin: 0,
            }}
            styles={{
              header: { 
                fontSize: window.innerWidth <= 360 ? '1.2rem' : window.innerWidth <= 480 ? '1.3rem' : '1.5rem',
                padding: window.innerWidth <= 360 ? '12px 16px' : '16px 24px'
              },
              body: {
                padding: window.innerWidth <= 360 ? '12px 16px' : window.innerWidth <= 480 ? '16px 20px' : '24px'
              }
            }}
          >
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                name="username"
                label="Email"
                rules={[
                  { required: true, message: 'Por favor ingresa tu email!' },
                  { type: 'email', message: 'El formato del email no es válido!' }
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="tu@email.com" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Contraseña"
                rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}
              >
                <Input prefix={<LockOutlined />} type="password" placeholder="Contraseña" />
              </Form.Item>
              <Form.Item>
                <Button block type="primary" htmlType="submit" style={{ margin: '1rem 0' }}>
                  Iniciar sesión
                </Button>
                <span>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></span>
              </Form.Item>
            </Form>
          </Card>
        </div>
      )}
    </>
  );
};

export default Login;