import { Card, Button, Modal } from 'antd';
import { FireOutlined, WarningOutlined } from '@ant-design/icons';
import { Input, Space, Flex } from 'antd';
import useResponsive from '../../hooks/useResponsive';
import { useState } from 'react';

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
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const questions = [
        {
            q: '¿Qué publico hoy?',
            a: 'Hola Diana 👋 puedes publicar una foto de tu producto estrella, compartir una historia de tu emprendimiento o mostrar una promoción especial para hoy.'
        },
        {
            q: '¿Cómo calculo el precio de mis tamales?',
            a: 'Qué tal Diana! Suma el costo de los ingredientes, tiempo y gastos fijos. Añade tu margen de ganancia y compara con precios del mercado.'
        },
        {
            q: '¿Qué hago si no vendo esta semana?',
            a: 'Lo que debes hacer Diana es analizar qué productos no se vendieron, revisa tus promociones y busca nuevas formas de llegar a tus clientes, como redes sociales o promociones.'
        },
        // Puedes añadir más preguntas prefabricadas aquí
    ];
    return (
        <div style={{ padding: 0 }}>
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
                            <div style={{
                                width: 44,
                                height: 44,
                                borderRadius: '50%',
                                border: '2px solid #bbb',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 2,
                                background: '#fff',
                            }}>
                                {idx >= diasSemana.length - 2 && !metas[idx] ? (
                                    <img src="/home/fuego_2.svg" alt="fueguito apagado" style={{ width: 28, height: 28 }} />
                                ) : (
                                    <img src="/home/fuego.svg" alt="fueguito encendido" style={{ width: 28, height: 28 }} />
                                )}
                            </div>
                            <span style={{ fontSize: 14, fontWeight: 700, color: '#3E3C3C' }}>{dia.label}</span>
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
                            <h3 style={{ color: '#1A365D', fontWeight: 'bold', marginBottom: 4, fontSize: 18 }}>¡Hola Diana!</h3>
                            <div style={{ color: '#1A365D', fontSize: 16, marginBottom: 12, fontWeight: 600 }}>¿Cómo estás hoy? Charlemos.</div>
                        </div>
                        <div flex={1}>
                            <Button style={{ background: 'none', border: 'none', boxShadow: 'none', padding: 0, minWidth: 0, height: 'auto' }} onClick={() => setModalOpen(true)}>
                                <img
                                    src="/home/robot.svg"
                                    alt="asistente"
                                    style={{
                                        height: 64,
                                        width: 64,
                                        maxHeight: 120,
                                        minHeight: 48,
                                        display: 'block',
                                    }}
                                />
                            </Button>
                            {/* Modal Asistente Virtual */}
                            <Modal
                                open={modalOpen}
                                onCancel={() => { setModalOpen(false); setSelectedQuestion(null); }}
                                footer={null}
                                centered
                                width={380}
                                styles={{ body: { padding: 0, borderRadius: 16, background: '#f8f6ff' } }}
                                style={{ borderRadius: 16 }}
                                title={<div style={{ fontWeight: 700, fontSize: 20, color: '#722ed1', textAlign: 'center' }}>Asistente virtual con IA</div>}
                            >
                                <div style={{ padding: 20, minHeight: 320 }}>
                                    {!selectedQuestion ? (
                                        <>
                                            <div style={{ marginBottom: 18, color: '#1A365D', fontWeight: 600, fontSize: 18 }}>
                                                Diana puede preguntar:
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                                {questions.map((item, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setSelectedQuestion(item)}
                                                        style={{
                                                            background: '#fff',
                                                            border: '1px solid #e5e3f3',
                                                            borderRadius: 12,
                                                            padding: '12px 16px',
                                                            fontSize: 16,
                                                            color: '#722ed1',
                                                            textAlign: 'left',
                                                            cursor: 'pointer',
                                                            fontWeight: 600,
                                                            transition: 'background 0.2s',
                                                        }}
                                                    >
                                                        {item.q}
                                                    </button>
                                                ))}
                                            </div>
                                            <div style={{ marginTop: 24, color: '#888', fontSize: 13 }}>
                                                Recibe respuestas prácticas, inmediatas y fáciles de aplicar.
                                            </div>
                                        </>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                                            <div style={{ background: '#fff', borderRadius: 12, padding: '12px 16px', fontWeight: 600, color: '#722ed1', alignSelf: 'flex-end', maxWidth: '80%' }}>
                                                {selectedQuestion.q}
                                            </div>
                                            <div style={{ background: '#e9d3f4', borderRadius: 12, padding: '12px 16px', color: '#222', fontSize: 15, alignSelf: 'flex-start', maxWidth: '80%' }}>
                                                {selectedQuestion.a}
                                            </div>
                                            <button onClick={() => setSelectedQuestion(null)} style={{ marginTop: 12, background: 'none', border: 'none', color: '#722ed1', fontWeight: 600, cursor: 'pointer', fontSize: 15 }}>Volver a preguntas</button>
                                        </div>
                                    )}
                                </div>
                            </Modal>
                        </div>
                    </Space>
                    <div>
                        <Input.Search disabled placeholder="Buscar..." variant="filled" style={{ background: 'rgba(233, 211, 244, 0.5)', borderRadius: '0.3rem' }} />
                    </div>
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
