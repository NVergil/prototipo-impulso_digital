import { Button } from 'antd';

const WelcomeScreen = ({ onStart }) => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9998,
      background: '#f8f6f3',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '32px 16px',
      minHeight: '100vh',
    }}
  >
    <div style={{ width: '100%', maxWidth: 400 }}>
      <h1 style={{
        fontSize: 32,
        fontWeight: 700,
        marginBottom: 8,
        lineHeight: 1.1,
        color: '#222',
      }}>
        Mejora tu <span style={{ color: '#4f8cff' }}>negocio</span> con<br />Impulso Digital
        <span style={{ float: 'right', marginTop: -8 }}>
          <img src="/sparkles_1.svg" alt="sparkles" style={{ width: 32 }} />
        </span>
      </h1>
      <div style={{ textAlign: 'center', margin: '32px 0', position: 'relative', width: '100%', maxWidth: 260, marginLeft: 'auto', marginRight: 'auto' }}>
        <img src="/image_1.svg" alt="Ilustración principal" style={{ width: '100%', maxWidth: 260, position: 'relative', zIndex: 2 }} />
        <img src="/vector_1.svg" alt="Decoración vector" style={{ width: '100%', maxWidth: 260, position: 'absolute', left: 0, top: '0', zIndex: 1 }} />
      </div>
      <Button
        type="primary"
        block
        size="large"
        style={{ borderRadius: 12, fontWeight: 600, fontSize: 18 }}
        onClick={onStart}
      >
        Empezar
      </Button>
    </div>
  </div>
);

export default WelcomeScreen;
