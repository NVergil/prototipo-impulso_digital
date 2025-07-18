import { Card, Typography } from 'antd';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const { Title } = Typography;
const monthlyData = [
  { name: 'Ene', Ingresos: 4000, Gastos: 2400, Beneficio: 1600 },
  { name: 'Feb', Ingresos: 3000, Gastos: 1398, Beneficio: 1602 },
  { name: 'Mar', Ingresos: 5000, Gastos: 3800, Beneficio: 1200 },
  { name: 'Abr', Ingresos: 4500, Gastos: 3908, Beneficio: 592 },
  { name: 'May', Ingresos: 6000, Gastos: 4800, Beneficio: 1200 },
  { name: 'Jun', Ingresos: 5500, Gastos: 4300, Beneficio: 1200 },
];

function GraficaBeneficioMensual() {
  return (
    <Card title="Beneficio Neto Mensual (Simulado)" variant={false} style={{ marginBottom: 24, borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
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
      <div style={{ marginTop: 8, color: '#888', fontSize: 14 }}>
        Proyección simulada del beneficio neto que tu negocio podría generar cada mes.
      </div>
    </Card>
  );
}

export default GraficaBeneficioMensual;