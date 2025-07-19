import { Card, Button } from 'antd';
import { FireOutlined, WarningOutlined } from '@ant-design/icons';
import { Input, Space, Flex } from 'antd';
import GraficaBeneficioMensual from './GraficaBeneficioMensual'; // Importa el componente de gráfica amarilla
import useResponsive from '../../hooks/useResponsive';

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
    const { isSmall } = useResponsive();
    return (
        <div style={{ padding: 16 }}>
            {/* Metas Diarias */}
            <Card
                style={{
                    marginBottom: 24,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    borderRadius: 16,
                }}
            >
                <h3 style={{ marginBottom: 16 }}>Metas Diarias</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    {diasSemana.map((dia, idx) => (
                        <div key={dia.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <FireOutlined style={{ fontSize: 32, color: metas[idx] ? '#722ed1' : '#ccc', marginBottom: 4 }} />
                            <span style={{ fontSize: 14 }}>{dia.label}</span>
                        </div>
                    ))}
                </div>
                <Button type="primary" style={{ width: '100%', fontWeight: 'bold', fontSize: 16, backgroundColor: '#82C0FF', color: '#1A365D' }}>
                    Haz tu mision del dia
                </Button>
            </Card>

            {/* Asistente Virtual y Alerta de stock bajo en una sola línea si pantalla < 768px */}
            <div
                style={{
                    display: !isSmall ? 'flex' : 'block',
                    flexDirection: !isSmall ? 'row' : 'unset',
                    gap: !isSmall ? 16 : 0,
                }}
            >
                <Card
                    style={{
                        marginBottom: !isSmall ? 0 : 24,
                        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                        borderRadius: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '18px 16px',
                        background: '#fff',
                        flex: !isSmall ? 1 : 'unset',
                        minWidth: !isSmall ? 0 : undefined,
                        maxWidth: !isSmall ? '300px' : '100%'
                    }}
                >
                    <Space align='center'>
                        <div flex={1}>
                            <h3 style={{ color: '#722ed1', fontWeight: 700, marginBottom: 4 }}>¡Hola Rosa!</h3>
                            <div style={{ color: '#222', fontSize: 15, marginBottom: 12 }}>¿Cómo estás hoy? Charlemos.</div>
                            <div>
                                <Input.Search placeholder="Buscar..." variant="filled" style={{ background: 'rgba(233, 211, 244, 0.5)', borderRadius: '0.3rem' }} />
                            </div>
                        </div>
                        <div flex={1}>
                            <Button style={{ background: 'none', border: 'none', boxShadow: 'none', padding: 0, minWidth: 0, height: 'auto' }}>
                                <img
                                    src="/home/robot.svg"
                                    alt="asistente"
                                    style={{
                                        height: 64,
                                        width: 64,
                                        maxHeight: 120,
                                        minHeight: 48,
                                        display: 'block'
                                    }}
                                />
                            </Button>
                        </div>
                    </Space>
                </Card>
                <Card style={{
                    marginBottom: !isSmall ? 0 : 24,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    borderRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '18px 16px',
                    background: '#fff',
                    flex: !isSmall ? 1 : 'unset',
                    minWidth: !isSmall ? 0 : undefined,
                }}>
                    <Flex align='center'>
                        <div style={{ marginRight: 16 }}>
                            {/* Aquí va la imagen del producto, puedes poner un */}
                            <img src="/home/arroz.svg" alt="producto" style={{ width: '100%', borderRadius: 12, objectFit: 'cover' }} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: 17, color: '#222' }}>Arroz Blanco</div>
                            <div style={{ fontSize: 15, color: '#888', marginBottom: 4 }}>100 gr</div>
                        </div>
                    </Flex>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            {/* Icono de alerta, lo puedes reemplazar */}
                            <img src="/home/alerta.svg" alt="alerta" />
                            {/* <WarningOutlined style={{color: '#F0D768', fontSize: 24}} /> */}
                            <span style={{ color: '#3E3C3C', fontWeight: 700, fontSize: 17 }}>Bajo Nivel de stock</span>
                        </div>
                    </div>
                </Card>
            </div>

        </div>
    );
}

export default Home;
