import { Card } from 'antd';
import useResponsive from '../../hooks/useResponsive';


const rutas = [
    {
        title: 'Marketing Digital Enfocado a Restaurantes',
        img: '/learning/image_1.svg',
    },
    {
        title: 'Cuentas Claras, Restaurante Próspero',
        img: '/learning/image_2.svg',
    },
    {
        title: 'Integra WhatsApp Business a tu Negocio',
        img: '/learning/image_3.svg',
    },
];


function Aprendizaje() {
    const { isMedium } = useResponsive();
    return (
        <div style={{ padding: 0 }}>
            <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 24 }}>Rutas de Aprendizaje</h2>
            <div style={{ display: 'flex', flexDirection: isMedium ? 'column' : 'row', gap: 18 }}>
                {rutas.map((ruta, idx) => (
                    <Card
                        key={idx}
                        style={{
                            borderRadius: 16,
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                            padding: 0,
                            overflow: 'hidden',
                        }}
                        styles={{ padding: 0 }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: 110, height: 80, borderRadius: 12, overflow: 'hidden', margin: 12, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={ruta.img} alt={ruta.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ flex: 1, padding: '0 12px' }}>
                                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>{ruta.title}</div>
                                {/* Puedes agregar subtítulo aquí si lo necesitas */}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            <div style={{ marginTop: 32, position: 'relative' }}>
                <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Mision del día:</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, color: '#222' }}>
                            "Conoce tu platillo estrella y cuánto te deja."
                        </div>
                    </div>
                    <div>
                        <div style={{ background: '#a020f0', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>✓</span>
                        </div>
                    </div>
                </div>
                <div style={{ fontSize: 14, color: '#555', marginTop: 8 }}>
                    Hoy vas a registrar el costo exacto de uno de tus platillos más vendidos. Usa la herramienta de costo y descubre si realmente estás ganando lo que crees.<br />
                    ¡Spoiler: la tecnología puede ayudarte a ajustar precios sin perder clientes!
                </div>
            </div>
        </div>
    );
}

export default Aprendizaje;
