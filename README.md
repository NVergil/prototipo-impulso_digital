# Impulso Digital 🚀

Plataforma web de diagnóstico y digitalización empresarial diseñada para ayudar a pequeñas empresas y emprendedores a evaluar y mejorar su presencia digital.

## 📖 Descripción

Impulso Digital es una aplicación web que permite a los usuarios:
- Registrarse y autenticarse de forma segura
- Completar un diagnóstico empresarial personalizado
- Acceder a un dashboard con módulos de gestión
- Obtener recomendaciones para la digitalización de su negocio

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.1.0** - Librería para construcción de interfaces de usuario
- **Vite 7.0.4** - Build tool y servidor de desarrollo ultrarrápido
- **Ant Design 5.26.5** - Librería de componentes UI empresariales
- **React Router Dom 7.6.3** - Enrutamiento para aplicaciones SPA

### Backend & Database
- **Supabase 2.51.0** - Backend como servicio (BaaS)
  - Autenticación de usuarios
  - Base de datos PostgreSQL
  - API REST automática

### Herramientas de Desarrollo
- **ESLint 9.30.1** - Linter para mantener calidad del código
- **Vite Plugin React 4.6.0** - Soporte para React en Vite

## 📋 Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)
- Cuenta en [Supabase](https://supabase.com/) para la base de datos

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/NVergil/impulso-digital.git
cd impulso-digital
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

### 4. Configurar Supabase
1. Crea un proyecto en [Supabase](https://app.supabase.com/)
2. Obtén tu URL y API Key desde Settings → API
3. Crea la tabla `user_diagnostics` con los campos necesarios

### 5. Iniciar el servidor de desarrollo
```bash
npm run dev
```

## 🎯 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo en modo watch |
| `npm run build` | Construye la aplicación para producción |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Ejecuta ESLint para revisar el código |

## 📁 Estructura del Proyecto

```
impulso_digital/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   └── AppLayout.jsx          # Layout principal de la aplicación
│   │   └── modules/
│   │       ├── Finance.jsx            # Módulo de finanzas
│   │       ├── Inventory.jsx          # Módulo de inventario
│   │       └── Marketing.jsx          # Módulo de marketing
│   ├── contexts/
│   │   └── AuthContext.jsx            # Context para autenticación
│   ├── pages/
│   │   ├── Dashboard.jsx              # Dashboard principal
│   │   ├── Diagnostic.jsx             # Página de diagnóstico
│   │   ├── Login.jsx                  # Página de login
│   │   ├── Register.jsx               # Página de registro
│   │   └── NotFound.jsx              # Página 404
│   ├── utils/
│   │   └── supabaseClient.js         # Cliente de Supabase
│   ├── debug/
│   │   └── testSupabase.js           # Utilidad para probar conexión
│   ├── App.jsx                       # Componente principal
│   ├── App.css                       # Estilos principales
│   ├── main.jsx                      # Punto de entrada
│   └── index.css                     # Estilos globales
├── .env                              # Variables de entorno (no versionado)
├── .gitignore                        # Archivos ignorados por Git
├── netlify.toml                      # Configuración de Netlify
├── package.json                      # Dependencias y scripts
├── vite.config.js                    # Configuración de Vite
└── README.md                         # Este archivo
```

## 🎨 Funcionalidades

### Autenticación
- ✅ Registro de usuarios
- ✅ Inicio de sesión
- ✅ Protección de rutas privadas
- ✅ Context para manejo de estado de autenticación

### Diagnóstico Empresarial
- ✅ Formulario de diagnóstico personalizado
- ✅ Almacenamiento de respuestas en base de datos
- ✅ Validación de formularios
- ✅ Redirección automática post-diagnóstico

### Dashboard
- ✅ Módulos de gestión (Finanzas, Inventario, Marketing)
- ✅ Layout responsive con Ant Design
- ✅ Navegación intuitiva

### Técnicas
- ✅ Single Page Application (SPA)
- ✅ Lazy loading de componentes
- ✅ Manejo de errores
- ✅ Optimización de builds

## 🔧 Configuración de Producción

### Netlify
El proyecto incluye configuración para Netlify en `netlify.toml`:
- Build automático desde GitHub
- Redirects para SPA
- Headers de seguridad
- Variables de entorno

### Variables de Entorno en Producción
Configura estas variables en tu proveedor de hosting:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🚀 Deployment

### Netlify (Recomendado)
1. Conecta tu repositorio de GitHub
2. Configura las variables de entorno
3. Deploy automático en cada push

### Build Manual
```bash
npm run build
# Los archivos se generan en la carpeta 'dist'
```

## 🧪 Testing y Debugging

### Probar conexión con Supabase
```javascript
// En la consola del navegador
import { testSupabaseConnection } from './src/debug/testSupabase.js';
testSupabaseConnection();
```

## 🐛 Solución de Problemas Comunes

### Error: "No API key found in request"
- Verifica que las variables de entorno estén configuradas correctamente
- Asegúrate que la API key de Supabase esté completa
- Reinicia el servidor de desarrollo después de cambiar `.env`

### Error de autenticación
- Verifica la configuración de Supabase
- Revisa que la URL del proyecto sea correcta
- Confirma que RLS esté configurado apropiadamente

## 📚 Recursos Adicionales

- [Documentación de React](https://react.dev/)
- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de Ant Design](https://ant.design/)
- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de React Router](https://reactrouter.com/)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

Para preguntas o sugerencias, puedes contactar a través de:
- GitHub Issues
- Email: [tu-email@ejemplo.com]

---

**Desarrollado con ❤️ para impulsar la digitalización empresarial**
