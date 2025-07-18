// src/components/Layout/AppLayout.jsx
import React from 'react';
import { Layout, Menu, theme, Button, message } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DashboardOutlined, LogoutOutlined } from '@ant-design/icons'; // Importa DashboardOutlined
// Importar useAuth para acceder al contexto de autenticación
import { useAuth } from '../../contexts/AuthContext';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  const handleLogout = async () => {
    try {
      await signOut(); // Si signOut lanza un error, el control saltará al bloque catch
      messageApi.success('Sesión cerrada con éxito.'); // Solo se ejecuta si signOut fue exitoso
      navigate('/login', { replace: true });
    } catch (error) {
      // Este bloque catch se ejecutará si signOut lanza un error
      console.error('Error al cerrar sesión:', error);
      messageApi.error('Hubo un error al cerrar la sesión.');
    }
  };

  const menuItems = [
    {
      key: '/dashboard', // <--- Ruta del Dashboard
      icon: <DashboardOutlined />, //  Icono del Dashboard
      label: <Link to="/dashboard">Dashboard</Link>, // Texto del Dashboard
    }, // Queda abierta la posibilidad de agregar más rutas aquí en el menu del dashboard
  ];

  if (!user) {
    return null;
  }

  return (
    <Layout>
      {contextHolder}
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', marginRight: '20px' }}>
          Impulso Digital
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{ marginLeft: 'auto' }}
        >
          Cerrar Sesión
        </Button>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
            marginTop: 16,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Impulso Digital ©{new Date().getFullYear()} Creado con Vite + React
      </Footer>
    </Layout>
  );
};

export default React.memo(AppLayout); // Usar React.memo para evitar re-renderizados innecesarios