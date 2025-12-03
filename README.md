# 📚 De Gloria en Gloria - Tienda Web

Librería cristiana digital construida con Next.js 16 y Firebase.

## 🚀 Características

- ✅ Catálogo completo de libros digitales
- ✅ Sistema de autenticación con Firebase
- ✅ Carrito de compras
- ✅ Biblioteca personal de usuario
- ✅ Panel de administración
- ✅ Sistema de colecciones
- ✅ Libros gratuitos
- ✅ Checkout y gestión de pedidos

## 🛠️ Tecnologías

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Estilos**: CSS Modules + Tailwind CSS
- **Iconos**: Lucide React

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales de Firebase

# Iniciar servidor de desarrollo
npm run dev
```

## 🔧 Configuración de Firebase

Ver `FIREBASE_SETUP.md` y `OBTENER_CREDENCIALES_ADMIN.md` para instrucciones detalladas.

## 📝 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter

# Firebase
npm run firebase:deploy:firestore  # Desplegar reglas de Firestore
npm run firebase:deploy:storage    # Desplegar reglas de Storage
npm run deploy                      # Desplegar hosting
```

## 🌐 Despliegue

### Vercel (Recomendado para Next.js)
```bash
npm i -g vercel
vercel
```

### Firebase Hosting
Ver `DEPLOY_FIREBASE.md` para instrucciones.

## 📚 Estructura del Proyecto

```
tienda-web/
├── app/                 # Páginas de Next.js (App Router)
├── components/          # Componentes React
├── lib/                 # Utilidades y lógica
│   ├── context/        # Contextos (Auth, Cart)
│   ├── firebase/       # Funciones de Firebase
│   └── hooks/          # Hooks personalizados
├── public/             # Archivos estáticos
└── styles/             # Estilos CSS Modules
```

## 🔐 Variables de Entorno

Crea un archivo `.env.local` con:

```bash
# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...

# Firebase Admin (opcional)
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...
FIREBASE_STORAGE_BUCKET=...
```

## 📖 Documentación

- `FIREBASE_SETUP.md` - Configuración inicial de Firebase
- `MIGRACION_FIREBASE.md` - Guía de migración
- `IMPLEMENTACION_FIREBASE.md` - Funciones implementadas
- `DEPLOY_FIREBASE.md` - Guía de despliegue

## 👥 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado.

## 🙏 Agradecimientos

Proyecto desarrollado para "De Gloria en Gloria" - Librería Cristiana Digital.
