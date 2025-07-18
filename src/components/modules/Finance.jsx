// src/modules/FinanceModule.jsx
import React from 'react';
import { Card, Typography, Space, Row, Col } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const { Title, Paragraph } = Typography;

// --- Datos Ficticios para Ingresos y Gastos ---
const monthlyData = [
  { name: 'Ene', Ingresos: 4000, Gastos: 2400, Beneficio: 1600 },
  { name: 'Feb', Ingresos: 3000, Gastos: 1398, Beneficio: 1602 },
  { name: 'Mar', Ingresos: 5000, Gastos: 3800, Beneficio: 1200 },
  { name: 'Abr', Ingresos: 4500, Gastos: 3908, Beneficio: 592 },
  { name: 'May', Ingresos: 6000, Gastos: 4800, Beneficio: 1200 },
  { name: 'Jun', Ingresos: 5500, Gastos: 4300, Beneficio: 1200 },
];

// --- Datos Ficticios para Proyección de Flujo de Caja ---
const cashFlowProjection = [
  { name: 'Mes 1', Entradas: 7000, Salidas: 3500 },
  { name: 'Mes 2', Entradas: 6500, Salidas: 4000 },
  { name: 'Mes 3', Entradas: 7200, Salidas: 3800 },
  { name: 'Mes 4', Entradas: 8000, Salidas: 4500 },
  { name: 'Mes 5', Entradas: 7500, Salidas: 4200 },
];

const Finanzas = () => {
  return (
    <Card style={{ margin: '16px 0', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <Title level={3}>Módulo de Finanzas</Title>
      <Paragraph>
        Aquí puedes visualizar simulaciones de tus finanzas para tener una mejor perspectiva de la salud económica de tu negocio.
      </Paragraph>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Gráfica de Ingresos y Gastos Mensuales */}
        <Card title="Ingresos y Gastos Mensuales (Simulado)" bordered={false}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={monthlyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Ingresos" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Gastos" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <Paragraph type="secondary">
            Esta gráfica muestra una simulación de tus ingresos y gastos a lo largo de los últimos meses.
          </Paragraph>
        </Card>

        {/* Gráfica de Beneficio Mensual */}
        <Card title="Beneficio Neto Mensual (Simulado)" bordered={false}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={monthlyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Beneficio" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
          <Paragraph type="secondary">
            Proyección simulada del beneficio neto que tu negocio podría generar cada mes.
          </Paragraph>
        </Card>

        {/* Gráfica de Proyección de Flujo de Caja */}
        <Card title="Proyección de Flujo de Caja (Simulado)" bordered={false}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={cashFlowProjection}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Entradas" stroke="#4CAF50" />
              <Line type="monotone" dataKey="Salidas" stroke="#F44336" />
            </LineChart>
          </ResponsiveContainer>
          <Paragraph type="secondary">
            Simulación de entradas y salidas de efectivo proyectadas para los próximos meses.
          </Paragraph>
        </Card>

        {/* Sección de Resumen Financiero (ejemplo) */}
        <Card title="Resumen Financiero Clave (Simulado)" bordered={false}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Card size="small" title="Ingresos Totales (Año)">
                <Title level={4}>$30,500</Title>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card size="small" title="Gastos Totales (Año)">
                <Title level={4}>$20,606</Title>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card size="small" title="Margen de Beneficio">
                <Title level={4}>32%</Title>
              </Card>
            </Col>
          </Row>
          <Paragraph type="secondary" style={{ marginTop: '1rem' }}>
            Estos son indicadores financieros clave basados en los datos simulados.
          </Paragraph>
        </Card>
      </Space>
    </Card>
  );
};

export default Finanzas;