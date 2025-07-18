import { Card, Button } from 'antd';
import { FireOutlined } from '@ant-design/icons';
import GraficaBeneficioMensual from './GraficaBeneficioMensual'; // Importa el componente de gráfica amarilla

const diasSemana = [
  { key: 'lu', label: 'Lu' },
  { key: 'ma', label: 'Ma' },
  { key: 'mi', label: 'Mi' },
  { key: 'ju', label: 'Ju' },
  { key: 'vi', label: 'Vi' },
  { key: 'sa', label: 'Sa' },
  { key: 'do', label: 'Do' },
];

const metas = [true, true, true, true, true, false, false]; // Simulación de metas cumplidas

function Home() {
  return (
    <div style={{ padding: 16 }}>
      {/* Metas Diarias */}
      <Card style={{ marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', borderRadius: 16 }}>
        <h3 style={{ marginBottom: 16 }}>Metas Diarias</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          {diasSemana.map((dia, idx) => (
            <div key={dia.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FireOutlined style={{ fontSize: 32, color: metas[idx] ? '#722ed1' : '#ccc', marginBottom: 4 }} />
              <span style={{ fontSize: 14 }}>{dia.label}</span>
            </div>
          ))}
        </div>
        <Button type="primary" style={{ width: '100%', fontWeight: 600, fontSize: 16 }}>
          Haz tu mision del dia
        </Button>
      </Card>

      {/* Reporte Mensual */}
      <h3 style={{ marginBottom: 16 }}>Reporte Mensual</h3>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <Card style={{ flex: 1, minHeight: 120, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', borderRadius: 16, display: 'flex', alignItems: 'center', padding: '24px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 32, color: '#a259ff' }}>⏰</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 2 }}>
                Tiempo de Aprendizaje
              </div>
              <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                10 <span style={{ fontSize: 16, fontWeight: 'bold', color: '#888' }}>Horas</span>
              </div>
            </div>
          </div>
        </Card>
        
      </div>
      {/* Gráfica amarilla de Beneficio Neto Mensual */}
      <GraficaBeneficioMensual />
    </div>
  );
}

export default Home;
