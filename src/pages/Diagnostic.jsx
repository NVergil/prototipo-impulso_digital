// src/pages/Diagnostico.jsx
import React, { useState } from 'react';
import { Typography, Form, Input, Button, Select, Space, Card, message } from 'antd';
import { QuestionCircleOutlined, ShopOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../contexts/AuthContext'; // Importar useAuth para obtener refreshDiagnosisStatus

const { Title, Paragraph, Text } = Typography; // Asegúrate de que Text esté importado

const Diagnostico = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ digitalToolsUsed: [], mainProductService: '' }} // Asegurar que el array esté inicializado
        >
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

          <Form.Item
            name="mainProductService"
            label={<Text strong>¿Cuál es tu principal producto o servicio?</Text>}
            rules={[{ required: true, message: 'Por favor, describe tu principal producto o servicio.' }]}
          >
            <Input placeholder="Ej: Pasteles personalizados, asesoría contable, jabones artesanales" />
          </Form.Item>

          <Form.Item
            name="digitalToolsUsed"
            label={<Text strong>¿Qué herramientas digitales usas actualmente? (Selecciona todas las que apliquen)</Text>}
          >
            <Select mode="multiple" placeholder="Ej: WhatsApp Business, Facebook, Instagram, Excel, etc.">
              <Option value="whatsapp_business">WhatsApp Business</Option>
              <Option value="facebook">Facebook</Option>
              <Option value="instagram">Instagram</Option>
              <Option value="tiktok">TikTok</Option>
              <Option value="google_my_business">Google My Business</Option>
              <Option value="excel">Hojas de cálculo (Excel/Google Sheets)</Option>
              <Option value="pos_system">Sistema de punto de venta (POS)</Option>
              <Option value="none">Ninguna</Option>
              <Option value="other">Otras</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large" icon={<CheckCircleOutlined />}>
              Completar Diagnóstico
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Diagnostico;