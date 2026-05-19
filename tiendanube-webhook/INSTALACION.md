# 🚀 GUÍA DE INSTALACIÓN - TiendaNube + Claude API Integration

## PASO 1: Preparar Vercel (5 minutos)

### 1.1 Crear cuenta en Vercel (si no tienes)
- Ir a: https://vercel.com
- Click en "Sign Up"
- Conectar con GitHub (es lo más fácil)

### 1.2 Crear nuevo proyecto en Vercel
- En Vercel, click en "New Project"
- Seleccionar "Create Git Repository"
- Nombre: `tiendanube-webhook`
- Crear

### 1.3 Estructura de carpetas en tu proyecto
```
tiendanube-webhook/
├── api/
│   └── webhooks.js
├── vercel.json
├── package.json
└── README.md
```

### 1.4 Crear `package.json`
```json
{
  "name": "tiendanube-webhook",
  "version": "1.0.0",
  "description": "TiendaNube Webhook Server",
  "private": true
}
```

---

## PASO 2: Configurar Variables de Entorno en Vercel

1. En tu proyecto de Vercel, ve a **Settings**
2. Click en **Environment Variables**
3. Agrega estas variables:

```
TIENDANUBE_APP_ID = [tu_app_id_aquí]
TIENDANUBE_APP_SECRET = [tu_app_secret_aquí]
```

(Verás estos valores en el panel de partners cuando crees la app)

---

## PASO 3: Deploy en Vercel

1. Push tu código a GitHub
2. Vercel automáticamente detecta cambios y redeploya
3. Tu URL será algo como: `https://tiendanube-webhook.vercel.app`

---

## PASO 4: URLs de Webhooks para TiendaNube

Una vez desplegado en Vercel, usa estas URLs en el panel de partners:

### URL webhook store redact:
```
https://tiendanube-webhook.vercel.app/api/webhooks?type=stores_redact
```

### URL webhook customers redact:
```
https://tiendanube-webhook.vercel.app/api/webhooks?type=customers_redact
```

### URL webhook customers data request:
```
https://tiendanube-webhook.vercel.app/api/webhooks?type=customers_data_request
```

---

## PASO 5: Crear APP en TiendaNube Partners

1. Ir a: https://partners.tiendanube.com
2. Click en "Apps"
3. Click en "Nueva App"
4. Llenar datos:
   - **Nombre**: SimonaShop Manager
   - **URL de redirección**: https://tiendanube-webhook.vercel.app/callback
   - **Permisos**: 
     - ✅ products:read
     - ✅ products:write
     - ✅ scripts:write
     - ✅ orders:read
   - **URLs de Webhooks**: (las de arriba)

5. Guardar → Te dará `app_id` y `app_secret`

---

## PASO 6: Instalar APP en tu Tienda (Simona Shop)

1. En el panel de partners, busca el botón **"Generate Install Link"**
2. Copia el link
3. Abre en incógnito (o desde otra cuenta)
4. Pega el link
5. Si te pide loguear en TiendaNube, hazlo
6. Autoriza los permisos
7. ✅ La app está instalada

---

## PASO 7: Obtener ACCESS_TOKEN

Después de instalar, TiendaNube te enviará un webhook de instalación que contendrá:
```json
{
  "event": "app/installed",
  "store_id": 123456,
  "access_token": "token_muy_largo_aqui"
}
```

**Guarda ese `access_token`** - lo necesitaremos para hacer cambios en tu tienda.

---

## ✅ YA ESTÁ TODO LISTO

Ahora yo puedo:
- Recibir eventos de tu tienda
- Hacer cambios automáticos en productos
- Inyectar scripts JavaScript
- Automatizar cualquier cosa que necesites

---

## DUDAS?

Si algo no funciona:
1. Verifica que el código esté en Vercel
2. Chequea las Environment Variables
3. Confirma que las URLs de webhooks sean exactas
4. Revisa los logs en Vercel (Deployment → Logs)
