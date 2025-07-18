// src/components/initialComponent/SplashScreen.jsx
import { Spin } from 'antd'; // Componente Spin de Ant Design para mostrar un spinner mientras carga
import { Space } from 'antd'; // Componente Space para alinear elementos

const SplashScreen = ({ visible = true }) => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#f8f8f3',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? 'auto' : 'none',
      transition: 'opacity 1s',
    }}
  >
    {/* ¡CAMBIA ESTA LÍNEA! */}
    <Space direction='vertical' align='center'>
      <img
        src="/logo.svg" // <-- Ruta corregida
        alt="Impulso Digital"
        style={{ width: '100%' }}
      />
      <Spin size="large" tip="Cargando..." />
    </Space>
  </div>
);

export default SplashScreen;