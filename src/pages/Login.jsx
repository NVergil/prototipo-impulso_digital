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
    }, 500); // 1.2s splash
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
            background: '#f9f6f2',
            padding: '0',
          }}
        >
          {contextHolder}
          <div style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
              <img src="/logo_2.svg" alt="Logo Impulso Digital" style={{ height: 64, width: 'auto', marginBottom: 12, objectFit: 'contain', background: 'none' }} />
            </div>
            <Card
              style={{
                borderRadius: 18,
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                border: 'none',
                background: '#fff',
                padding: 0,
              }}
              bodyStyle={{ padding: window.innerWidth <= 360 ? '16px 10px' : window.innerWidth <= 480 ? '20px 16px' : '32px 24px' }}
            >
              <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 8, color: '#1a2947' }}>Log in <span role="img" aria-label="sparkles">✨</span></h2>
              <div style={{ color: '#888', fontSize: 15, marginBottom: 18 }}>Welcome back! Please enter your details</div>
              <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
              >
                <Form.Item
                  name="username"
                  label={<span style={{ fontWeight: 600, color: '#1a2947' }}>Email</span>}
                  rules={[
                    { required: true, message: 'Por favor ingresa tu email!' },
                    { type: 'email', message: 'El formato del email no es válido!' }
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Enter your email" size="large" style={{ borderRadius: 12, fontSize: 16, padding: '10px 12px' }} />
                </Form.Item>
                <Form.Item
                  name="password"
                  label={<span style={{ fontWeight: 600, color: '#1a2947' }}>Password</span>}
                  rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}
                >
                  <Input prefix={<LockOutlined />} type="password" placeholder="Password" size="large" style={{ borderRadius: 12, fontSize: 16, padding: '10px 12px' }} />
                </Form.Item>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                  <Link to="/forgot-password" style={{ color: '#4a90e2', fontSize: 14 }}>Forgot password</Link>
                </div>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Button block type="primary" htmlType="submit" style={{ margin: '12px 0 8px 0', borderRadius: 12, fontWeight: 700, fontSize: 18, background: '#4a90e2', border: 'none', height: 48 }}>
                    Log in
                  </Button>
                </Form.Item>
              </Form>
              <div style={{ textAlign: 'center', margin: '18px 0 8px 0', color: '#888', fontSize: 15 }}>
                Or log in with <span style={{ margin: '0 8px' }}>────────────</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginBottom: 8 }}>
                <Button icon={<img src="login/google.svg" alt="Google" style={{ height: 24, verticalAlign: 'middle', marginTop: 2 }} />} shape="circle" size="large" style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                <Button icon={<img src="login/facebook.svg" alt="Facebook" style={{ height: 24, verticalAlign: 'middle', marginTop: 2 }} />} shape="circle" size="large" style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                <Button icon={<img src="login/apple.svg" alt="Apple" style={{ height: 24, verticalAlign: 'middle', marginTop: 2 }} />} shape="circle" size="large" style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
              </div>
              <div style={{ textAlign: 'center', marginTop: 10, color: '#888', fontSize: 14 }}>
                Don´t have an account? <Link to="/register" style={{ color: '#4a90e2', fontWeight: 500 }}>Sign up</Link>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;