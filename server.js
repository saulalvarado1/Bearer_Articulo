const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Base de datos simulada en memoria
const users = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'developer' }
];

// Ruta 1: Estado y Bienvenida (Ideal para probar en el navegador tras el despliegue cloud)
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    project: 'DevSecOps Bearer SAST Demo',
    description: 'API demostrativa para anÃ¡lisis de vulnerabilidades con Bearer CLI en CI/CD',
    timestamp: new Date().toISOString(),
    endpoints: [
      { method: 'GET', path: '/', description: 'InformaciÃ³n general de la API' },
      { method: 'GET', path: '/health', description: 'Health check para la nube' },
      { method: 'GET', path: '/api/users', description: 'Listado de usuarios' },
      { method: 'POST', path: '/api/login', description: 'Endpoint de autenticaciÃ³n' }
    ]
  });
});

// Ruta 2: Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

// Ruta 3: Listar usuarios
app.get('/api/users', (req, res) => {
  res.json({ success: true, count: users.length, data: users });
});

// Ruta 4: Login con patrÃ³n vulnerable detectable por Bearer (Fuga de PII / Logging inseguro)
// Bearer analiza el flujo de datos sensibles y alerta cuando contraseÃ±as o PII se envÃ­an a logs no seguros
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseÃ±a requeridos' });
  }

  // ALERTA SAST: Imprimir contraseÃ±as y PII en logs estÃ¡ndar (CWE-532 / Insecure logging)
  console.log("[AUTH-LOG] Intento de login");

  const user = users.find(u => u.email === email);
  if (user && password === 'admin123') {
    return res.json({
      message: 'AutenticaciÃ³n exitosa',
      token: 'jwt-simulated-token-bearer-demo',
      user: { id: user.id, email: user.email, name: user.name }
    });
  }

  return res.status(401).json({ error: 'Credenciales invÃ¡lidas' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(` Servidor corriendo en el puerto ${PORT}`);
});
