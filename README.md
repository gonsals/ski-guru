# SkiGuru - Encuentra tu Instructor de Esquí Perfecto 🎿

SkiGuru es una Progressive Web App (PWA) diseñada para conectar clientes con instructores de esquí y snowboard. Los usuarios pueden buscar, filtrar y reservar instructores según sus preferencias. El proyecto está en desarrollo y planea migrar a React Native para soportar aplicaciones móviles nativas en el futuro.

---

## 🚀 Características

### Instructores

-   Creación de perfiles para instructores.
-   Información de perfil incluye:
    -   **Nombre**.
    -   **Biografía**.
    -   **Certificaciones**.
    -   **Experiencia laboral** (empresa, rol, ubicación, duración).
    -   **Deportes** que enseña (e.g., esquí, snowboard).
    -   **Foto de perfil**.
-   Capacidad para listar y mostrar instructores destacados en la página principal.
-   Funcionalidad de búsqueda basada en nombre, certificaciones o deportes.

### Clientes

-   Creación de perfiles para clientes.
-   Información de perfil incluye:
    -   **Nombre**.
    -   **Biografía**.
    -   **Preferencias**.
    -   **Deportes de interés**.
    -   **Foto de perfil**.

### Funciones adicionales en desarrollo

-   **Sistema de "match"**: Recomendación de instructores según las preferencias del cliente.
-   **Reservas**: Los usuarios podrán reservar clases directamente desde la app.

---

## 🛠️ Tecnologías Usadas

### Frontend

-   **React.js** con **React Router** para navegación.
-   **Tailwind CSS** para diseño responsivo y estilizado.
-   **React Icons** para iconos accesibles.

### Backend y Servicios

-   **Firebase**:
    -   **Firestore** para almacenamiento de datos (instructores y clientes).
    -   **Storage** para gestión de imágenes de perfil.
    -   **Authentication** (en desarrollo).

### Estado Actual

-   **PWA funcional**: Permite buscar y mostrar perfiles de instructores.
-   **Planeado**: Migrar a React Native con Expo Go para soportar aplicaciones móviles nativas.

---

## 📂 Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables (e.g., Navbar).
├── context/        # Context API para Onboarding y estado global.
├── pages/          # Vistas principales (Home, Profile, Onboarding).
├── services/       # Funciones para interactuar con Firebase.
├── types/          # Tipos definidos con TypeScript.
└── AppRouter.tsx   # Configuración de rutas.
```

---

## 🌐 Cómo Empezar

### Requisitos previos

-   **Node.js** y **npm** instalados.
-   Acceso a un proyecto de Firebase configurado.

### Configuración del proyecto

1. Clonar el repositorio:

    ```bash
    git clone <URL-DEL-REPOSITORIO>
    cd SkiGuru
    ```

2. Instalar dependencias:

    ```bash
    npm install
    ```

3. Crear un archivo `.env` con las credenciales de Firebase:

    ```env
    REACT_APP_FIREBASE_API_KEY=<API_KEY>
    REACT_APP_FIREBASE_AUTH_DOMAIN=<AUTH_DOMAIN>
    REACT_APP_FIREBASE_PROJECT_ID=<PROJECT_ID>
    REACT_APP_FIREBASE_STORAGE_BUCKET=<STORAGE_BUCKET>
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<MESSAGING_SENDER_ID>
    REACT_APP_FIREBASE_APP_ID=<APP_ID>
    ```

4. Iniciar el servidor de desarrollo:
    ```bash
    npm start
    ```

---

## 📱 Migración a React Native (Futuro)

### Tecnologías planeadas

-   **Expo Go**: Para facilitar el desarrollo multiplataforma.
-   **React Navigation**: Reemplazará React Router.
-   **Async Storage**: Para persistencia de datos en dispositivos móviles.
-   **Firebase**: Continuará como backend.

### Pasos iniciales para migrar

1. Crear un nuevo proyecto con Expo:
    ```bash
    npx create-expo-app SkiGuruMobile
    ```
2. Integrar componentes principales (Home, Profile, Login).
3. Configurar navegación con React Navigation.
4. Ajustar estilos usando **StyleSheet** en lugar de Tailwind CSS.

---

## 💻 Rutas y Componentes Principales

### **Rutas**

-   `/` - Página principal con listado de instructores destacados.
-   `/profile/:userType/:id` - Perfil del usuario (cliente o instructor).
-   `/login` - Pantalla de inicio de sesión.
-   `/signup` - Pantalla de registro.
-   `/onboarding/role` - Selección de rol (instructor o cliente).
-   `/onboarding/sport` - Selección de deportes favoritos.

### **Componentes Clave**

1. **`Home`**: Muestra instructores destacados con búsqueda integrada.
2. **`Profile`**: Información detallada del usuario.
3. **`Onboarding`**: Flujo para registrar nuevas cuentas.

---

## 📋 Estado Actual y Próximos Pasos

### Completado

-   Listado y búsqueda de instructores.
-   Diseño responsivo con Tailwind CSS.

### En Desarrollo

-   Sistema de "match" entre clientes e instructores.
-   Integración de reservas con pagos.
-   Onboarding completo con Firebase Authentication.

### Planeado

-   Migración a React Native.
-   Implementación de notificaciones push.
-   Soporte offline en dispositivos móviles.

---

## 🧑‍🤝‍🧑 Contribuir

¡Contribuciones son bienvenidas! Por favor, sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una rama nueva:
    ```bash
    git checkout -b feature/nueva-funcionalidad
    ```
3. Haz tus cambios y realiza un commit:
    ```bash
    git commit -m "Descripción de los cambios"
    ```
4. Envía tu PR para revisión.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
