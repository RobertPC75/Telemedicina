# Plataforma de Telemedicina para Zonas Rurales

Una plataforma de telemedicina diseñada para facilitar consultas médicas virtuales, gestión de citas y almacenamiento de documentos en zonas rurales.

## Tecnologías y Servicios Utilizados

- **Frontend**: React (GitHub Pages)
- **Backend**: Node.js (Render)
- **Base de datos**: PostgreSQL (Render)
- **Almacenamiento**: Amazon S3 (en implementación)
- **Videoconferencia**: Zoom Meeting SDK
- **Autenticación**: OAuth con Zoom

## Requisitos

- Node.js (v16+)
- npm (v7+)
- Cuenta en [Render.com](https://render.com/) y [Zoom Marketplace](https://marketplace.zoom.us/)

---

## Instrucciones de Instalación

### 1. Clonar el Repositorio

`git clone <URL_DEL_REPOSITORIO>`

### 2. Backend (Node.js)

1. **Instalar dependencias**:

`cd backend`  
`npm install`

2. **Configurar variables de entorno**: Crea un archivo `.env` con las credenciales de la base de datos y Zoom.

3. **Iniciar el servidor**:

`npm run dev`

### 3. Frontend (React)

1. **Instalar dependencias**:

`cd frontend`  
`npm install`

2. **Iniciar el servidor**:

`npm run dev`

---

## Configurar Zoom

1. **Crear una app OAuth en Zoom Marketplace** y copiar el **Client ID** y **Client Secret**.
2. **Configurar backend** con las credenciales en el archivo `.env`.
3. El frontend usará el **Zoom Meeting SDK** para las videollamadas.

---

## Endpoints de la API

### Médicos:

- `GET /api/medicos` - Obtener lista de médicos.
- `POST /api/medico` - Crear un médico.

### Pacientes:

- `GET /api/paciente/cedula/:cedula` - Obtener información de paciente.

### Citas:

- `GET /api/citas/paciente/:cedula` - Obtener citas de un paciente.
- `POST /api/citas` - Crear una cita.

---

## Despliegue en Producción

### Frontend (GitHub Pages)

1. **Generar build optimizado**:

`npm run build`

2. **Desplegar a GitHub Pages**:

`npm run deploy`

### Backend (Render)

1. Configura el servicio web de backend en [Render](https://render.com/).
2. Conecta tu repositorio y configura el despliegue automático.

---

## Comandos Comunes

| Comando              | Descripción                                      |
| -------------------- | ------------------------------------------------ |
| `npm install`         | Instala dependencias.                            |
| `npm run dev`         | Inicia el servidor de desarrollo.                |
| `npm run build`       | Crea una versión optimizada del frontend.        |
| `npm run deploy`      | Despliega el frontend a GitHub Pages.            |
