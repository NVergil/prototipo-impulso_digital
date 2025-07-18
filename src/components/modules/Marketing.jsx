// src/components/modules/Marketing.jsx
import React, { useState, useEffect } from 'react'; // Importa useEffect
import { Typography, Input, Button, Card, Row, Col, Space, message } from 'antd';
import { BulbOutlined, CalendarOutlined, SolutionOutlined, SendOutlined, CopyOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons'; // Nuevos íconos
import useResponsive from '../../hooks/useResponsive'; // Importar hook responsive

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

// Datos de simulación
const simulatedContentIdeas = [
  "¡Oferta especial de la semana! Descuento X% en productos seleccionados. ¡No te lo pierdas! #Oferta #TuNegocio",
  "Detrás de cámaras: ¿Cómo elaboramos nuestros productos? Un vistazo a la pasión que ponemos en cada detalle. #HechoAMano #ProcesoCreativo",
  "Pregúntale a la comunidad: ¿Qué tema te gustaría que abordáramos la próxima semana? ¡Tu opinión importa! #Interacción #Comunidad",
  "¡Consejo del día para emprendedores! La constancia es clave. Sigue aprendiendo y mejorando cada día. #Emprendimiento #Motivación",
];

const initialSimulatedTemplates = [ // Cambiamos el nombre para distinguirlo del estado
  {
    id: 'template1', // Añadimos un ID único
    title: "Plantilla 1: Lanzamiento de Producto",
    description: "Ideal para presentar un nuevo artículo o servicio.",
    content: "¡NUEVO! 🎉 Descubre nuestro [Nombre del Producto/Servicio]. Hecho con [material/pasión], ideal para [beneficio]. Disponible ahora en [link]. #NuevoProducto #TuNegocio #Innovación",
  },
  {
    id: 'template2', // Añadimos un ID único
    title: "Plantilla 2: Testimonio de Cliente",
    description: "Comparte la experiencia positiva de tus clientes para generar confianza.",
    content: "¡Nos encanta cuando nuestros clientes comparten su felicidad! ✨ Gracias a [Nombre Cliente Opcional] por elegirnos. Tu satisfacción es nuestra prioridad. #ClientesFelices #TuNegocio #Reseñas",
  },
];

const simulatedEditorialCalendar = {
  Lunes: "Publicación de Oferta/Promoción",
  Martes: "Contenido Educativo/Consejo Rápido",
  Miércoles: "Pregunta a la Comunidad/Encuesta",
  Jueves: "Historia Detrás de Cámaras/Proceso",
  Viernes: "Testimonio de Cliente/Reseña",
  Sábado: "Contenido de Entretenimiento/Dato Curioso",
  Domingo: "Reflexión Semanal/Preparación para la próxima",
};

const engagementTips = [
  "Utiliza hashtags relevantes para aumentar la visibilidad de tus publicaciones.",
  "Publica regularmente y en horas donde tu audiencia esté más activa.",
  "Responde a todos los comentarios y mensajes para fomentar la interacción.",
  "Realiza encuestas o preguntas para involucrar a tu comunidad.",
  "Comparte contenido de valor que resuelva problemas o inspire a tu audiencia.",
];

const Marketing = () => {
  const [businessType, setBusinessType] = useState('');
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [editableTemplates, setEditableTemplates] = useState([]); // Nuevo estado para plantillas editables
  const [messageApi, contextHolder] = message.useMessage();
  const { isExtraSmall, isVerySmall, isSmall, getPadding } = useResponsive();

  // Usa useEffect para inicializar editableTemplates cuando el componente se monta
  useEffect(() => {
    // Crea una copia profunda de las plantillas iniciales para poder modificarlas
    setEditableTemplates(initialSimulatedTemplates.map(template => ({ ...template })));
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar

  const handleGenerateIdeas = () => {
    if (!businessType.trim()) {
      messageApi.warning('Por favor, ingresa tu tipo de negocio para generar ideas.');
      return;
    }
    setGeneratedIdeas(simulatedContentIdeas);
    messageApi.success('Ideas de contenido generadas.');
  };

  // Manejador para cuando el contenido de un TextArea cambia
  const handleTemplateChange = (id, newContent) => {
    setEditableTemplates(prevTemplates =>
      prevTemplates.map(template =>
        template.id === id ? { ...template, content: newContent } : template
      )
    );
  };

  // Manejador para copiar el contenido
  const handleCopyContent = (content) => {
    navigator.clipboard.writeText(content);
    messageApi.success('Contenido copiado al portapapeles.');
  };

  // Manejador para guardar la plantilla (simulado, por ahora)
  const handleSaveTemplate = (id) => {
    // Aquí es donde en una aplicación real guardarías el contenido en tu base de datos (Supabase)
    messageApi.success(`Plantilla ${id} guardada (simulado).`);
    console.log(`Guardando plantilla ${id}:`, editableTemplates.find(t => t.id === id)?.content);
  };

  // Función helper para crear títulos responsivos
  const createResponsiveTitle = (icon, fullText, shortText) => {
    const text = isExtraSmall ? shortText : isVerySmall ? shortText : fullText;
    const fontSize = isExtraSmall ? '14px' : isVerySmall ? '16px' : '18px';
    const iconSize = isExtraSmall ? '12px' : isVerySmall ? '14px' : '16px';
    
    return (
      <Title 
        level={4} 
        style={{ 
          fontSize, 
          margin: 0, 
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span style={{ fontSize: iconSize, flexShrink: 0 }}>{icon}</span>
        <span style={{ minWidth: 0 }}>{text}</span>
      </Title>
    );
  };

  return (
    <div>
      {contextHolder}
      <Title level={3}>Módulo de Marketing Digital</Title>
      <Paragraph>
        Genera ideas de contenido para tus redes sociales, accede a plantillas y organiza tus publicaciones.
      </Paragraph>

      {/* Sección de Generación de Contenido */}
      <Card
        title={createResponsiveTitle(<BulbOutlined />, "Generador de Ideas", "Ideas")}
        style={{ 
          marginBottom: isExtraSmall ? 16 : 24, 
          borderRadius: isExtraSmall ? 8 : 12 
        }}
        styles={{
          header: {
            padding: isExtraSmall ? '12px 16px' : isVerySmall ? '16px 20px' : '24px'
          },
          body: {
            padding: isExtraSmall ? '12px 16px' : isVerySmall ? '16px 20px' : '24px'
          }
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text strong>¿Qué tipo de negocio tienes o qué producto vendes?</Text>
          <Input
            placeholder={isExtraSmall ? "Ej: Repostería, artesanías" : "Ej: Repostería casera, artesanías de cuero, consultoría financiera"}
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
          />
          <Button 
            type="primary" 
            icon={<SendOutlined />} 
            onClick={handleGenerateIdeas}
            size={isExtraSmall ? 'small' : 'middle'}
          >
            {isExtraSmall ? "Generar" : "Generar Ideas"}
          </Button>
          {generatedIdeas.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <Title level={5}>Ideas Sugeridas:</Title>
              {generatedIdeas.map((idea, index) => (
                <Paragraph key={index} copyable={{ text: idea }}>{idea}</Paragraph>
              ))}
            </div>
          )}
        </Space>
      </Card>

      {/* Sección de Plantillas Prediseñadas */}
      <Card
        title={createResponsiveTitle(<SolutionOutlined />, "Plantillas Prediseñadas", "Plantillas")}
        style={{ 
          marginBottom: isExtraSmall ? 16 : 24, 
          borderRadius: isExtraSmall ? 8 : 12 
        }}
        styles={{
          header: {
            padding: isExtraSmall ? '12px 16px' : isVerySmall ? '16px 20px' : '24px'
          },
          body: {
            padding: isExtraSmall ? '12px 16px' : isVerySmall ? '16px 20px' : '24px'
          }
        }}
      >
        <Row gutter={[isExtraSmall ? 8 : 16, isExtraSmall ? 8 : 16]}>
          {editableTemplates.map((template) => ( // Usamos el nuevo estado editableTemplates
            <Col xs={24} md={12} key={template.id}> {/* Usamos template.id como key */}
              <Card 
                size="small" 
                title={
                  <div style={{ 
                    fontSize: isExtraSmall ? '12px' : isVerySmall ? '13px' : '14px',
                    lineHeight: '1.2',
                    wordBreak: 'break-word'
                  }}>
                    {template.title}
                  </div>
                } 
                style={{ 
                  borderRadius: isExtraSmall ? 6 : 8,
                  height: '100%'
                }}
                styles={{
                  header: {
                    padding: isExtraSmall ? '8px 12px' : '12px 16px',
                    minHeight: 'auto'
                  },
                  body: {
                    padding: isExtraSmall ? '8px 12px' : '12px 16px'
                  }
                }}
              >
                <Paragraph style={{ 
                  fontSize: isExtraSmall ? '11px' : isVerySmall ? '12px' : '14px',
                  marginBottom: isExtraSmall ? 8 : 12
                }}>
                  {template.description}
                </Paragraph>
                <TextArea
                  value={template.content} // Vinculado al estado
                  onChange={(e) => handleTemplateChange(template.id, e.target.value)} // Actualiza el estado al cambiar
                  autoSize={{ minRows: 2, maxRows: 4 }}
                  style={{ fontSize: isExtraSmall ? '11px' : '12px' }}
                />
                <Space style={{ marginTop: 8 }} size={isExtraSmall ? 'small' : 'middle'}>
                  <Button
                    type="default"
                    icon={<CopyOutlined />}
                    onClick={() => handleCopyContent(template.content)}
                    size={isExtraSmall ? 'small' : 'middle'}
                  >
                    {isExtraSmall ? "" : "Copiar"}
                  </Button>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={() => handleSaveTemplate(template.id)}
                    size={isExtraSmall ? 'small' : 'middle'}
                  >
                    {isExtraSmall ? "" : "Guardar"}
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Sección de Calendario Editorial y Consejos */}
      <Row gutter={[isExtraSmall ? 8 : isVerySmall ? 16 : 24, isExtraSmall ? 8 : isVerySmall ? 16 : 24]}>
        <Col xs={24} md={12}>
          <Card
            title={createResponsiveTitle(<CalendarOutlined />, "Calendario Editorial Básico", "Calendario")}
            style={{ 
              borderRadius: isExtraSmall ? 8 : 12,
              height: '100%'
            }}
            styles={{
              header: {
                padding: isExtraSmall ? '12px 16px' : isVerySmall ? '16px 20px' : '24px'
              },
              body: {
                padding: isExtraSmall ? '12px 16px' : isVerySmall ? '16px 20px' : '24px'
              }
            }}
          >
            {Object.entries(simulatedEditorialCalendar).map(([day, activity]) => (
              <Paragraph 
                key={day}
                style={{ 
                  fontSize: isExtraSmall ? '11px' : isVerySmall ? '12px' : '14px',
                  marginBottom: isExtraSmall ? 4 : 8
                }}
              >
                <Text strong>{day}:</Text> {activity}
              </Paragraph>
            ))}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title={createResponsiveTitle(<SolutionOutlined />, "Consejos para el Engagement", "Consejos")}
            style={{ 
              borderRadius: isExtraSmall ? 8 : 12,
              height: '100%'
            }}
            styles={{
              header: {
                padding: isExtraSmall ? '12px 16px' : isVerySmall ? '16px 20px' : '24px'
              },
              body: {
                padding: isExtraSmall ? '12px 16px' : isVerySmall ? '16px 20px' : '24px'
              }
            }}
          >
            <ul style={{ 
              paddingLeft: isExtraSmall ? 16 : 20,
              margin: 0
            }}>
              {engagementTips.map((tip, index) => (
                <li key={index}>
                  <Paragraph style={{ 
                    marginBottom: isExtraSmall ? 4 : 8,
                    fontSize: isExtraSmall ? '11px' : isVerySmall ? '12px' : '14px'
                  }}>
                    {tip}
                  </Paragraph>
                </li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Marketing;