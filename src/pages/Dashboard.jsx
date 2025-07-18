// src/pages/Dashboard.jsx
import React, { useState } from 'react'; // Importa useState
import { Card, Row, Col } from 'antd';
import { RocketOutlined, DollarOutlined, DropboxOutlined } from '@ant-design/icons'; // Importa íconos más descriptivos

// Módulos a renderizar
import Marketing from '../components/modules/Marketing';  
import Finanzas from '../components/modules/Finance';    
import Inventario from '../components/modules/Inventory'; 

// Color del indicador de modulo activo
const activeIndicatorColor = '#722ed1';

const dashboardCards = [
  {
    title: 'Marketing',
    icon: <RocketOutlined style={{ fontSize: 40, color: '#fff' }} />,
    key: 'marketing',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  },
  {
    title: 'Finanzas',
    icon: <DollarOutlined style={{ fontSize: 40, color: '#fff' }} />,
    key: 'finanzas',
    gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
  },
  {
    title: 'Inventario',
    icon: <DropboxOutlined style={{ fontSize: 40, color: '#fff' }} />,
    key: 'inventario',
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  },
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
    <div style={{ padding: 24 }}>
      <Row gutter={[24, 24]} justify="center">
        {dashboardCards.map(card => (
          <Col xs={24} sm={12} md={8} key={card.key}>
            <Card
              hoverable
              onClick={() => setSelectedModule(card.key)}
              style={{
                borderRadius: 24,
                background: card.gradient,
                color: '#fff',
                textAlign: 'center',
                minHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: selectedModule === card.key ? `0 8px 32px ${activeIndicatorColor}40` : '0 4px 24px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s',
                cursor: 'pointer',
                // Eliminamos el 'border' condicional que teníamos aquí si solo quieres la sombra
              }}
            >
              <div style={{ marginBottom: 16 }}>{card.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 600 }}>{card.title}</div>
              {/* <--- NUEVO BLOQUE: Indicador dentro de la tarjeta activa --- */}
              {selectedModule === card.key && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0, // Posiciona en la parte inferior de la tarjeta
                    left: '50%', // Centra horizontalmente
                    transform: 'translateX(-50%)', // Ajuste para centrar
                    width: '60%', // Ancho de la línea
                    height: '4px',
                    background: activeIndicatorColor,
                    borderRadius: '2px',
                    // Animación suave para la aparición
                    opacity: 0, // Inicialmente oculto
                    animation: 'fadeInLine 0.3s forwards', // Animación CSS
                  }}
                />
              )}
              {/* ----------------------------------------------------------- */}
            </Card>
          </Col>
        ))}
      </Row>

      {/* REMOVER ESTE BLOQUE: Ya no es necesario el indicador globalmente centrado */}
      {/* {selectedModule && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '4px',
              background: activeIndicatorColor,
              borderRadius: '2px',
            }}
          />
        </div>
      )} */}

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