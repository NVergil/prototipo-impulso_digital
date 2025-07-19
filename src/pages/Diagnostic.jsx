// src/pages/Diagnostico.jsx
import React, { useState } from 'react';
import { Typography, Form, Input, Button, Select, Card, message } from 'antd';
import { QuestionCircleOutlined, ShopOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../contexts/AuthContext'; // Importar useAuth para obtener refreshDiagnosisStatus
import WelcomeQuiz from '../components/modules/WelcomeQuiz';

const { Title, Paragraph, Text } = Typography; // Asegúrate de que Text esté importado

const Diagnostico = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true); // Estado para controlar la pantalla de Quiz de bienvenida
  const [messageApi, contextHolder] = message.useMessage();
  const { refreshDiagnosisStatus } = useAuth(); // Obtener la función de refresco del contexto

  const businessTypes = [
    'Repostería', 'Artesanías', 'Comida Preparada (Catering/Delivery)', 'Ropa y Accesorios',
    'Consultoría/Servicios Profesionales', 'Belleza y Cuidado Personal', 'Tienda de Abarrotes/Local',
    'Educación/Talleres', 'Otros'
  ];

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        messageApi.error('No se encontró el usuario. Por favor, inicia sesión de nuevo.');
        navigate('/login');
        return;
      }

      const { error } = await supabase
        .from('user_diagnostics')
        .upsert({
          id: user.id,
          business_type: values.businessType,
          main_product_service: values.mainProductService,
          digital_tools_used: values.digitalToolsUsed || [],
          diagnosis_completed: true,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        throw error;
      }

      messageApi.success('Diagnóstico completado con éxito. ¡Bienvenido!');
      await refreshDiagnosisStatus(); // <--- ¡LLAMADA CLAVE AQUÍ! Refresca el estado global
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Error al guardar el diagnóstico:', error.message);
      messageApi.error(`Error al guardar diagnóstico: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const isVerySmall = window.innerWidth <= 480;
  const isExtraSmall = window.innerWidth <= 360;

  return (
    <>
      {showWelcome && <WelcomeQuiz onFinish={() => setShowWelcome(false)} />}
      {!showWelcome && (
        <div style={{
          padding: isExtraSmall ? 8 : isVerySmall ? 16 : 24,
          maxWidth: 800,
          margin: 'auto',
          width: '100%'
        }}>
          {contextHolder}
          <Card
            style={{
              borderRadius: isExtraSmall ? 8 : 12,
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              margin: isExtraSmall ? '8px 0' : '16px 0'
            }}
            styles={{
              header: {
                padding: isExtraSmall ? '12px 16px' : isVerySmall ? '16px 20px' : '24px'
              },
              body: {
                padding: isExtraSmall ? '12px 16px' : isVerySmall ? '16px 20px' : '24px'
              }
            }}
            title={
              <Title
                level={3}
                style={{
                  textAlign: 'center',
                  marginBottom: 0,
                  fontSize: isExtraSmall ? '16px' : isVerySmall ? '18px' : '20px'
                }}
              >
                <QuestionCircleOutlined /> ¡Cuéntanos de tu negocio!
              </Title>
            }
          >
            <Paragraph style={{ textAlign: 'center', marginBottom: 24 }}>
              Este breve cuestionario nos ayudará a personalizar tu experiencia en Impulso Digital.
            </Paragraph>

            {/* Secciones adicionales del diagnóstico (visual en su mayoría, conexion parcial a supabase) */}

            <Form
              layout="vertical"
              form={form}
              onFinish={handleFinish}
              initialValues={{ digitalToolsUsed: [], mainProductService: '' }} // Asegurar que el array esté inicializado
            >

              {/* 1. Identificación del negocio */}
              <Title level={5} style={{ color: '#1a2947', marginBottom: 8 }}>1. Identificación del negocio</Title>
              <Form.Item
                name="businessType"
                label={<Text strong><ShopOutlined /> Tipo de negocio:</Text>}
                rules={[{ required: true, message: 'Por favor, selecciona tu tipo de negocio.' }]}
              >
                <Select placeholder="Selecciona el tipo de negocio principal">
                  {businessTypes.map(type => (
                    <Option key={type} value={type}>{type}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label={<Text strong>¿Cuál es el nombre de tu emprendimiento?</Text>} name="businessName" rules={[{ required: true, message: 'Por favor ingresa el nombre de tu emprendimiento.' }]}>
                <Input placeholder="Ej: Pastelería Dulce Vida" />
              </Form.Item>
              <Form.Item label={<Text strong>¿Qué productos o servicios ofreces?</Text>} name="mainProductService" rules={[{ required: true, message: 'Por favor describe tus productos o servicios.' }]}>
                <Input.TextArea placeholder="Ej: Pasteles, cupcakes, asesoría, etc." rows={2} />
              </Form.Item>
              <Form.Item label={<Text strong>¿Dónde vendes actualmente?</Text>} name="whereSell" rules={[{ required: true, message: 'Por favor selecciona dónde vendes actualmente.' }]}>
                <Select mode="multiple" placeholder="Selecciona una o varias opciones">
                  <Select.Option value="casa">Desde casa</Select.Option>
                  <Select.Option value="local">En un local</Select.Option>
                  <Select.Option value="linea">En línea</Select.Option>
                  <Select.Option value="otro">Otro</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label={<Text strong>¿A través de qué canales vendes?</Text>} name="digitalToolsUsed" rules={[{ required: true, message: 'Por favor selecciona los canales de venta.' }]}>
                <Select mode="multiple" placeholder="Selecciona los canales">
                  <Select.Option value="whatsapp">WhatsApp</Select.Option>
                  <Select.Option value="facebook">Facebook</Select.Option>
                  <Select.Option value="instagram">Instagram</Select.Option>
                  <Select.Option value="mercado_fisico">Mercado físico</Select.Option>
                  <Select.Option value="otro">Otro</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label={<Text strong>¿Hace cuánto iniciaste tu emprendimiento?</Text>} name="businessTime" rules={[{ required: true, message: 'Por favor selecciona el tiempo de tu emprendimiento.' }]}>
                <Select placeholder="Selecciona una opción">
                  <Select.Option value="menos_6_meses">Menos de 6 meses</Select.Option>
                  <Select.Option value="6m_1a">Entre 6 meses y 1 año</Select.Option>
                  <Select.Option value="mas_1a">Más de 1 año</Select.Option>
                </Select>
              </Form.Item>

              {/* 2. Nivel de conocimiento digital */}
              <Title level={5} style={{ color: '#1a2947', margin: '24px 0 8px 0' }}>2. Nivel de conocimiento digital</Title>
              <Form.Item label={<Text strong>¿Publicas contenido en redes sociales?</Text>} name="publishSocial" rules={[{ required: true, message: 'Por favor selecciona una opción.' }]}>
                <Select placeholder="Selecciona una opción">
                  <Select.Option value="si">Sí</Select.Option>
                  <Select.Option value="no">No</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label={<Text strong>¿Qué tanto sabes sobre cómo usar redes para vender?</Text>} name="knowledgeSocial" rules={[{ required: true, message: 'Por favor selecciona tu nivel de conocimiento.' }]}>
                <Select placeholder="Selecciona una opción">
                  <Select.Option value="nada">Nada</Select.Option>
                  <Select.Option value="poco">Un poco</Select.Option>
                  <Select.Option value="bien">Bien</Select.Option>
                  <Select.Option value="muy_bien">Muy bien</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label={<Text strong>¿Has usado herramientas como Canva o alguna app para editar imágenes?</Text>} name="useCanva" rules={[{ required: true, message: 'Por favor selecciona una opción.' }]}>
                <Select placeholder="Selecciona una opción">
                  <Select.Option value="si">Sí</Select.Option>
                  <Select.Option value="no">No</Select.Option>
                </Select>
              </Form.Item>

              {/* 4. Control operativo */}
              <Title level={5} style={{ color: '#1a2947', margin: '24px 0 8px 0' }}>4. Control operativo</Title>
              <Form.Item label={<Text strong>¿Llevas un control de tu inventario o productos disponibles?</Text>} name="inventoryControl" rules={[{ required: true, message: 'Por favor selecciona una opción.' }]}>
                <Select placeholder="Selecciona una opción">
                  <Select.Option value="si">Sí</Select.Option>
                  <Select.Option value="no">No</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label={<Text strong>¿Tienes metas claras de cuánto quieres vender al día o a la semana?</Text>} name="clearGoals" rules={[{ required: true, message: 'Por favor selecciona una opción.' }]}>
                <Select placeholder="Selecciona una opción">
                  <Select.Option value="si">Sí</Select.Option>
                  <Select.Option value="no">No</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label={<Text strong>¿Te gustaría recibir alertas cuando se esté acabando algún producto o ingrediente?</Text>} name="alerts" rules={[{ required: true, message: 'Por favor selecciona una opción.' }]}>
                <Select placeholder="Selecciona una opción">
                  <Select.Option value="si">Sí</Select.Option>
                  <Select.Option value="no">No</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block size="large" icon={<CheckCircleOutlined />}>
                  Completar Diagnóstico
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>)
      };
    </>
  );
};

export default Diagnostico;