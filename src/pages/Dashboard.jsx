// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import BottomNav from '../components/BottomNav';
import { Card, Row, Col, Typography, Statistic } from 'antd';
import { RocketOutlined, DollarOutlined, DropboxOutlined, RiseOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons'; // Importa íconos más descriptivos

// Módulos a renderizar
import Marketing from '../components/modules/Marketing';  
import Finanzas from '../components/modules/Finance';    
import Inventario from '../components/modules/Inventory'; 
import Home from '../components/modules/Home';

const { Title, Text } = Typography;

// Color del indicador de modulo activo
const activeIndicatorColor = '#722ed1';

const dashboardCards = [
  {
    title: 'Marketing Digital',
    subtitle: 'Impulsa tu presencia online',
    icon: '/bottom_nav/marketing.svg',
    key: 'marketing',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    shadowColor: 'rgba(102, 126, 234, 0.4)',
  },
  {
    title: 'Gestión Financiera',
    subtitle: 'Controla tus ingresos y gastos',
    icon: '/bottom_nav/finanzas.svg',
    key: 'finanzas',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    shadowColor: 'rgba(240, 147, 251, 0.4)',
  },
  {
    title: 'Inicio',
    subtitle: 'Resumen y metas diarias',
    icon: '/bottom_nav/home.svg',
    key: 'home',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    shadowColor: 'rgba(252, 182, 159, 0.4)',
  },
  {
    title: 'Ajustes de Usuario',
    subtitle: '',
    icon: '/bottom_nav/user.svg',
    key: 'user-settings',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    shadowColor: 'rgba(79, 172, 254, 0.4)',
  },
  {
    title: 'Control de Inventario',
    subtitle: 'Administra tu stock eficientemente',
    icon: '/bottom_nav/inventario.svg',
    key: 'inventario',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    shadowColor: 'rgba(79, 172, 254, 0.4)',
  },
];

function Dashboard() {
  const [selectedModule, setSelectedModule] = useState(dashboardCards[2].key);

  // Renderiza el contenido del módulo seleccionado
  const renderModuleContent = () => {
    switch (selectedModule) {
      case 'marketing':
        return <Marketing />;
      case 'finanzas':
        return <Finanzas />;
      case 'inventario':
        return <Inventario />;
      case 'home':
        return <Home />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Módulos principales - solo desktop/tablet */}
      <div className="dashboard-modules-desktop">
        <Row gutter={[24, 24]} justify="center">
          {dashboardCards.map((card) => (
            <Col xs={24} sm={12} md={8} key={card.key} className="dashboard-module-card">
              <Card
                hoverable
                onClick={() => setSelectedModule(card.key)}
                className="card-hover"
                style={{
                  borderRadius: 24,
                  background: card.gradient,
                  color: '#fff',
                  textAlign: 'center',
                  minHeight: 220,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: selectedModule === card.key ? `0 12px 40px ${card.shadowColor}` : '0 6px 30px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: 'none',
                  transform: selectedModule === card.key ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  if (selectedModule !== card.key) {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)';
                    e.currentTarget.style.boxShadow = `0 8px 35px ${card.shadowColor}`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedModule !== card.key) {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 6px 30px rgba(0,0,0,0.1)';
                  }
                }}
              >
                <img src={card.icon} alt={card.key} style={{ filter: 'invert(1) brightness(2)', width: 48, height: 48 }} />
                <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{card.title}</div>
                <div style={{ fontSize: 14, opacity: 0.9, fontWeight: 400 }}>{card.subtitle}</div>
                {/* Indicador de módulo activo */}
                {selectedModule === card.key && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '70%',
                      height: '4px',
                      background: 'rgba(255,255,255,0.8)',
                      borderRadius: '2px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      animation: 'fadeInLine 0.3s ease-out forwards',
                    }}
                  />
                )}
                {/* Efecto de brillo en hover */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.6s',
                  }}
                  className="shine-effect"
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Menú inferior - solo móvil */}
      <div className="dashboard-modules-mobile">
        <BottomNav
          items={dashboardCards}
          selected={selectedModule}
          onSelect={setSelectedModule}
        />
      </div>

      {/* Contenido del módulo seleccionado */}
      {selectedModule && (
        <div
          style={{
            marginTop: 48,
            padding: 24,
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            minHeight: 400,
            marginBottom: '80px', // espacio para el menú inferior en móvil
          }}
        >
          {renderModuleContent()}
        </div>
      )}
    </div>
  );
}

export default Dashboard;