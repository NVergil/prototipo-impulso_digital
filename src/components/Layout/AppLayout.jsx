// src/components/Layout/AppLayout.jsx
import React, { useState, useEffect } from 'react';
import { Layout, Menu, theme, Button, message, Drawer } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DashboardOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
// Importar useAuth para acceder al contexto de autenticación
import { useAuth } from '../../contexts/AuthContext';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  // Detectar si es dispositivo muy pequeño
  const isVerySmall = window.innerWidth <= 480;
  const isExtraSmall = window.innerWidth <= 360;
  
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

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
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
      <Header 
        style={{ 
          display: 'flex', 
          alignItems: 'center',
          padding: isExtraSmall ? '0 8px' : isVerySmall ? '0 12px' : isMobile ? '0 16px' : '0 50px',
          height: 'auto',
          minHeight: isExtraSmall ? '56px' : '64px'
        }}
      >
        <div 
          style={{ 
            color: 'white', 
            fontSize: isExtraSmall ? '14px' : isVerySmall ? '15px' : isMobile ? '16px' : '18px', 
            fontWeight: 'bold', 
            marginRight: isExtraSmall ? '6px' : isVerySmall ? '8px' : isMobile ? '10px' : '20px',
            flex: isMobile ? '1' : 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {isExtraSmall ? 'Impulso' : 'Impulso Digital'}
        </div>
        
        {isMobile ? (
          <>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={showDrawer}
              style={{ 
                color: 'white', 
                marginRight: isExtraSmall ? '4px' : '8px',
                padding: isExtraSmall ? '2px 4px' : '4px 8px'
              }}
              size={isExtraSmall ? 'small' : 'middle'}
            />
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              size={isExtraSmall ? 'small' : 'middle'}
              style={{
                padding: isExtraSmall ? '2px 6px' : '4px 8px',
                fontSize: isExtraSmall ? '11px' : '12px'
              }}
            >
              {isExtraSmall ? '' : 'Salir'}
            </Button>
          </>
        ) : (
          <>
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
          </>
        )}
      </Header>
      
      {/* Drawer para móvil */}
      <Drawer
        title="Navegación"
        placement="right"
        onClose={onClose}
        open={drawerVisible}
        width={isExtraSmall ? 200 : 250}
        styles={{
          body: { padding: isExtraSmall ? '12px' : '16px' }
        }}
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={onClose}
          style={{ border: 'none' }}
        />
      </Drawer>
      
      <Content 
        style={{ 
          padding: isExtraSmall ? '0 8px' : isVerySmall ? '0 12px' : isMobile ? '0 16px' : '0 48px',
          minHeight: `calc(100vh - ${isExtraSmall ? '56px' : '64px'} - 69px)` // Altura total - header - footer
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: isExtraSmall ? 8 : isVerySmall ? 12 : isMobile ? 16 : 24,
            borderRadius: isExtraSmall ? 8 : borderRadiusLG,
            marginTop: isExtraSmall ? 8 : 16,
            overflow: 'auto'
          }}
        >
          {children}
        </div>
      </Content>
      
      <Footer 
        style={{ 
          textAlign: 'center',
          fontSize: isExtraSmall ? '10px' : isVerySmall ? '11px' : isMobile ? '12px' : '14px',
          padding: isExtraSmall ? '8px' : isVerySmall ? '10px' : isMobile ? '12px' : '24px 50px'
        }}
      >
        Impulso Digital ©{new Date().getFullYear()}
        {!isMobile && ' Creado con Vite + React'}
      </Footer>
    </Layout>
  );
};

export default React.memo(AppLayout); // Usar React.memo para evitar re-renderizados innecesarios