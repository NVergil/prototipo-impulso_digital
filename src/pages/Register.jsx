import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
// Importamos la instancia de supabase creada en utils
import { supabase } from '../utils/supabaseClient';

const Register = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values) => { // La función debe ser asíncrona
    const { email, password, username } = values; // Mantendremos username para un perfil si lo necesitas, aunque Supabase usa email para auth.

    try {
      // Usamos el método signUp de Supabase.
      // Supabase registra el usuario con email y contraseña.
      // El 'username' se puede guardar en una tabla 'profiles' separada si es necesario.
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username, // Puedes pasar datos adicionales para el perfil de usuario aquí
          },
        },
      });

      if (error) {
        // Manejo de errores de Supabase
        // Ejemplos de errores comunes: email ya registrado, contraseña débil, etc.
        messageApi.error(`Error al registrar: ${error.message}`);
      } else {
        // Registro exitoso. Supabase envía un email de confirmación por defecto.
        messageApi.success('¡Registro exitoso! Por favor, revisa tu email para confirmar tu cuenta.');
        
        // Opcional: Redirigir al usuario después de un registro exitoso
        // Si activaste la confirmación por email en Supabase, el usuario no podrá iniciar sesión
        // hasta que haga clic en el enlace del email, por lo que es mejor redirigirlo a /login.
        setTimeout(() => {
          navigate('/login');
        }, 4000); // Pequeño retraso para que el mensaje se vea
      }
    } catch (err) {
      console.error('Error inesperado durante el registro:', err);
      messageApi.error('Ocurrió un error inesperado al intentar registrarte.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {contextHolder} {/* Para mostrar los mensajes de Ant Design */}
      <Card
        title="Registro"
        style={{
          maxWidth: 500,
          minWidth: 300,
          width: '100%',
          margin: '0 2rem',
        }}
        styles={{
          header: { fontSize: '1.5rem' },
        }}
      >
        <Form
          name="register" // Cambié el nombre del formulario a 'register' para ser más específico
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          {/* Ingresar Nombre de Usuario (opcional, si lo quieres para perfil) */}
          <Form.Item
            name="username"
            label="Nombre de usuario"
            rules={[
              { required: true, message: 'Por favor ingresa un nombre de usuario!' }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nombre de usuario" />
          </Form.Item>
          {/* Ingresar Email */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: 'email', message: 'Ingresa un email válido!' },
              { required: true, message: 'Por favor ingresa un Email!' }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="tu@email.com" />
          </Form.Item>
          {/* Ingresar Contraseña */}
          <Form.Item
            name="password"
            label="Contraseña"
            rules={[
              { required: true, message: 'Por favor ingresa una contraseña!' },
              { min: 6, message: 'La contraseña debe tener al menos 6 caracteres.' } // Supabase por defecto requiere mínimo 6 caracteres
            ]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Contraseña" />
          </Form.Item>
          {/* Confirmar Contraseña (Buena práctica de UX) */}
          <Form.Item
            name="confirm"
            label="Confirmar Contraseña"
            dependencies={['password']} // Esto hace que se revalide cuando 'password' cambia
            hasFeedback // Muestra un icono de éxito/fallo
            rules={[
              { required: true, message: 'Por favor confirma tu contraseña!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve(); // Las contraseñas coinciden
                  }
                  return Promise.reject(new Error('¡Las dos contraseñas que ingresaste no coinciden!'));
                },
              }),
            ]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Confirmar Contraseña" />
          </Form.Item>
          {/* Envío de datos */}
          <Form.Item>
            <Button block type="primary" htmlType="submit" style={{ margin: '1rem 0' }}>
              Registrarse
            </Button>
            <Link to="/login">¿Ya tienes una cuenta?</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;