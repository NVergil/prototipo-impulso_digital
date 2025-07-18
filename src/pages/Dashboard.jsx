// src/pages/Dashboard.jsx
import React, { useState } from 'react'; // Importa useState
import { Card, Row, Col, Typography, Statistic } from 'antd';
import { RocketOutlined, DollarOutlined, DropboxOutlined, RiseOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons'; // Importa íconos más descriptivos

// Módulos a renderizar
import Marketing from '../components/modules/Marketing';  
import Finanzas from '../components/modules/Finance';    
import Inventario from '../components/modules/Inventory'; 

const { Title, Text } = Typography;

// Color del indicador de modulo activo
const activeIndicatorColor = '#722ed1';

const dashboardCards = [
  {
    title: 'Marketing Digital',
    subtitle: 'Impulsa tu presencia online',
    icon: <RocketOutlined style={{ fontSize: 48, color: '#fff' }} />,
    key: 'marketing',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    shadowColor: 'rgba(102, 126, 234, 0.4)',
  },
  {
    title: 'Gestión Financiera',
    subtitle: 'Controla tus ingresos y gastos',
    icon: <DollarOutlined style={{ fontSize: 48, color: '#fff' }} />,
    key: 'finanzas',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    shadowColor: 'rgba(240, 147, 251, 0.4)',
  },
  {
    title: 'Control de Inventario',
    subtitle: 'Administra tu stock eficientemente',
    icon: <DropboxOutlined style={{ fontSize: 48, color: '#fff' }} />,
    key: 'inventario',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    shadowColor: 'rgba(79, 172, 254, 0.4)',
  },
];

// Datos simulados para estadísticas rápidas
const quickStats = [
  { title: 'Ventas del Mes', value: '12,450', prefix: '$', suffix: '', icon: <RiseOutlined />, color: '#52c41a' },
  { title: 'Clientes Activos', value: '2,340', prefix: '', suffix: '', icon: <UserOutlined />, color: '#1890ff' },
  { title: 'Productos Vendidos', value: '89', prefix: '', suffix: '', icon: <CheckCircleOutlined />, color: '#722ed1' },
];

const Dashboard = () => {
  const [selectedModule, setSelectedModule] = useState(null);

  const renderModuleContent = () => {
    switch (selectedModule) {
      case 'marketing':
        return <Marketing />;
      case 'finanzas':
        return <Finanzas />;
      case 'inventario':
        return <Inventario />;
      default:
        return (
          <div style={{ textAlign: 'center', padding: '50px 0', color: '#888' }}>
            <p>Selecciona una tarjeta para ver el contenido del módulo.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header con título y estadísticas */}
      <div className="dashboard-header">
        <Title level={2} style={{ textAlign: 'center', color: '#1a1a1a', marginBottom: 8 }}>
          Dashboard de Impulso Digital
        </Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', fontSize: 16, marginBottom: 24 }}>
          Centraliza la gestión de tu negocio en un solo lugar
        </Text>
        
        {/* Estadísticas rápidas */}
        <Row gutter={[16, 16]} justify="center" className="dashboard-stats">
          {quickStats.map((stat, index) => (
            <Col xs={24} sm={8} md={8} key={index}>
              <Card
                style={{
                  borderRadius: 16,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  border: 'none',
                  background: '#fff',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                hoverable
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                }}
              >
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  prefix={<span style={{ color: stat.color, marginRight: 8 }}>{stat.icon}{stat.prefix}</span>}
                  suffix={stat.suffix}
                  valueStyle={{ color: stat.color, fontSize: '24px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Módulos principales */}
      <Row gutter={[24, 24]} justify="center">
        {dashboardCards.map((card, index) => (
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
              <div style={{ marginBottom: 16 }}>{card.icon}</div>
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

      {selectedModule && (
        <div
          style={{
            marginTop: 48,
            padding: 24,
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            minHeight: 400,
          }}
        >
          {renderModuleContent()}
        </div>
      )}
    </div>
  );
};

export default Dashboard;