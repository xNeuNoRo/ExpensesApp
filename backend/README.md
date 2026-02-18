# 💰 Expenses App - Sistema de Registro de Gastos Personales

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Status](https://img.shields.io/badge/status-development-orange.svg) ![Frontend](https://img.shields.io/badge/frontend-Next.js%2016-black) ![Backend](https://img.shields.io/badge/backend-.NET-purple)

**Expenses App** es una solución integral para el control de finanzas personales. Permite a los usuarios registrar gastos, administrar categorías personalizadas y visualizar reportes detallados para una mejor planificación financiera.

El proyecto destaca por su implementación rigurosa de una **Arquitectura en N-Capas** en el backend y una **SPA moderna** en el frontend, garantizando escalabilidad, mantenimiento y una experiencia de usuario fluida.

---

## 🚀 Características Principales

### 📊 Gestión Financiera
* **Dashboard Interactivo:** Vista rápida de los últimos movimientos, métricas clave y gráficos de progreso.
* **Control de Gastos:** Registro detallado con validaciones de negocio (monto, fecha, categoría).
* **Categorías Personalizables:** CRUD completo de categorías con selección de colores e iconos dinámicos.
* **Reportes Mensuales:** Análisis de gastos por categoría y evolución mensual con filtros por año/mes.
* **Exportación de Datos:** Descarga de reportes mensuales en formato JSON.

### 🛠️ Aspectos Técnicos
* **Arquitectura Limpia (Backend):** Separación estricta de responsabilidades en capas (API, BLL, DAL, Entities).
* **Persistencia JSON:** Sistema de almacenamiento de datos en archivos JSON locales (sin bases de datos externas), implementado con repositorios genéricos para portabilidad.
* **Frontend Reactivo:** Interfaz construida con **Next.js 16 (App Router)**, **Tailwind CSS v4** y **TanStack Query** para un manejo de estado eficiente y sincronización con el servidor.
* **Estado en URL:** Filtros, búsquedas, ordenamiento y paginación sincronizados con la URL (`useQueryString`) para facilitar el *deep linking* y la persistencia al recargar.

---

## 🏗️ Arquitectura del Proyecto

El sistema sigue una arquitectura modular distribuida en dos grandes bloques:

### 🖥️ Frontend (`/frontend`)
Desarrollado con **Next.js 16** y **React 19**.
* **Framework:** Next.js (App Directory)
* **Estilos:** Tailwind CSS v4 + PostCSS
* **Gestión de Estado:** TanStack Query v5 (Server State) + Zustand (Client State)
* **Formularios:** React Hook Form + Zod (Validación de esquemas)
* **Componentes UI:** Headless UI, React Icons, React Circular Progressbar
* **Virtualización:** TanStack Virtual (para tablas de alto rendimiento)

### 🔙 Backend (`/backend`)
Desarrollado con **.NET (C#)** siguiendo el patrón N-Capas.
* **Expenses.API:** Controladores RESTful, Middlewares de error y Configuración de Inyección de Dependencias.
* **Expenses.BLL:** Lógica de negocio, validaciones y mapeo de DTOs.
* **Expenses.DAL:** Acceso a datos y persistencia en archivos JSON.
* **Expenses.Entities:** Modelos de dominio, DTOs y Excepciones personalizadas.
* **Data:** Carpeta autogenerada donde se almacenan `gastos.json` y `categorias.json`.

---

## 📸 Capturas de Pantalla
| Dashboard | Reportes Mensuales |
| :---: | :---: |
| ![Dashboard](/preview/dashboard_preview.png) *Vista principal con resumen* | ![Reportes](/preview/reportes_preview.png) *Gráficos y desglose* | 
![Categorias](/preview/categorias_preview.png) *Gestor de Categorias de Gastos* | ![Gastos](/preview/gastos_preview.png) *Gestor de Gastos* |

---

## 🛠️ Requisitos Previos

Asegúrate de tener instalado lo siguiente:

* **Runtime JS:** [Bun](https://bun.sh/) (v1.3+ recomendado) o Node.js.
* **SDK .NET:** [.NET SDK](https://dotnet.microsoft.com/download) (versión 8.0 o superior).
* **(Opcional pero recomendado):** [mise-en-place](https://mise.jdx.dev/) para la gestión automática del entorno y tareas.

### ⚙️ Variables de Entorno (Frontend)
El archivo `.env.local` debe contener la URL base de tu API Backend.

| Variable | Descripción | Valor por Defecto |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | URL base del Backend (.NET) | `http://localhost:4000` |

---

## ⚡ Guía de Inicio Rápido (Setup)

### Opción A: Usando `mise` (Recomendado) ✨
El proyecto incluye un archivo `mise.toml` configurado. Esta es la forma más rápida de levantar todo el entorno.

1.  **Instalar dependencias (Backend y Frontend):**
    ```bash
    mise run install_backend
    mise run install_frontend
    ```

2.  **Ejecutar la aplicación (Backend + Frontend en paralelo):**
    ```bash
    mise run dev
    ```
    * **Frontend:** Disponible en `http://localhost:3000`
    * **Backend:** Disponible en `http://localhost:4000`
    * **Backend (Swagger):** Disponible en `http://localhost:5038/swagger`

### Opción B: Setup Manual (Tradicional)

Si prefieres ejecutar los comandos manualmente paso a paso:

#### 1. Configurar el Backend
```bash
cd backend
# Restaurar paquetes NuGet
dotnet restore
# Ejecutar la API (con Hot Reload)
dotnet watch run --project Expenses.API
```

#### 2. Configurar el Frontend
```bash
cd frontend
# Instalar dependencias
bun install
# Ejecutar el frontend
bun run dev
```

## 💾 Datos de Prueba (Seed Data)

El repositorio incluye archivos con datos de ejemplo (`gastos.json` y `categorias.json`) ubicados en la raíz de la carpeta `backend/`.

**Para utilizarlos:**
1. Inicia el backend al menos una vez para que se cree la estructura de carpetas automáticamente.
2. Copia los archivos `.json` provistos en `backend/`.
3. Pégalos en la carpeta de persistencia activa (revisa la pregunta *"¿Dónde se guardan mis datos?"* en la sección siguiente) reemplazando los archivos vacíos.
4. Reinicia el backend para ver los reportes y gastos reflejados en el Dashboard.


## ❓ Solución de Problemas

**¿Dónde se guardan mis datos?**
Los archivos `gastos.json` y `categorias.json` se generan automáticamente en la carpeta de salida del binario del backend (generalmente `backend/Expenses.API/bin/Debug/net8.0/Data/`).

**La API no responde en el puerto 4000**
Verifica el archivo `launchSettings.json` en el backend o asegúrate de que el puerto no esté ocupado. Si usas `mise`, revisa los logs de la terminal para ver el puerto asignado.

**Advertencia en terminal / Frontend Next.js: `[DEP0169] url.parse() behavior is not standardized...`**
Si ves este mensaje al ejecutar el Frontend, **puedes ignorarlo**. Es una advertencia informativa de Node.js relacionada con dependencias internas y no afecta en absoluto el funcionamiento ni la estabilidad de la aplicación.