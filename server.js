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

// Ruta 1: Interfaz Visual Interactiva para la demostración y video
app.get('/', (req, res) => {
  // Si el cliente solicita explícitamente JSON (ej. curl o axios)
  if (req.headers.accept && req.headers.accept.includes('application/json') && !req.headers.accept.includes('text/html')) {
    return res.json({
      status: 'online',
      project: 'DevSecOps Bearer SAST Demo',
      description: 'API demostrativa para análisis de vulnerabilidades con Bearer CLI en CI/CD',
      endpoints: [
        { method: 'GET', path: '/', description: 'Dashboard interactivo de la API' },
        { method: 'GET', path: '/health', description: 'Health check' },
        { method: 'GET', path: '/api/users', description: 'Listado de usuarios' },
        { method: 'POST', path: '/api/login', description: 'Endpoint de autenticación' }
      ]
    });
  }

  // Interfaz HTML moderna para el navegador y video
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevSecOps Bearer SAST - Dashboard</title>
  <style>
    :root {
      --bg: #0b0f19;
      --card-bg: #111827;
      --card-border: #1f2937;
      --accent: #10b981;
      --accent-blue: #3b82f6;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --code-bg: #030712;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      display: flex;
      justify-content: center;
      padding: 30px 15px;
      min-height: 100vh;
    }
    .container {
      width: 100%;
      max-width: 900px;
    }
    .header {
      text-align: center;
      margin-bottom: 25px;
    }
    .header h1 {
      font-size: 2rem;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 8px;
    }
    .header p {
      color: var(--text-muted);
      font-size: 1rem;
    }
    .badges {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 15px;
      flex-wrap: wrap;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .badge-green { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
    .badge-blue { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }
    .badge-purple { background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); }
    
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 20px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);
    }
    .card-title {
      font-size: 1.15rem;
      font-weight: 700;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .authors-box {
      background: #1e293b;
      padding: 12px 18px;
      border-radius: 8px;
      border-left: 4px solid var(--accent);
      margin-bottom: 15px;
      font-size: 0.95rem;
    }
    .buttons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
      margin-bottom: 15px;
    }
    button {
      background: #1f2937;
      color: #fff;
      border: 1px solid #374151;
      padding: 12px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 600;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    button:hover {
      background: #374151;
      border-color: var(--accent);
      transform: translateY(-2px);
    }
    button.btn-primary { background: #059669; border-color: #10b981; }
    button.btn-primary:hover { background: #10b981; }
    
    .response-container {
      background: var(--code-bg);
      border: 1px solid #1f2937;
      border-radius: 8px;
      padding: 15px;
      position: relative;
    }
    .response-header {
      display: flex;
      justify-content: space-between;
      color: var(--text-muted);
      font-size: 0.8rem;
      margin-bottom: 8px;
      text-transform: uppercase;
      font-weight: 700;
    }
    pre {
      color: #38bdf8;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 0.9rem;
      overflow-x: auto;
      max-height: 250px;
    }
    .links-grid {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }
    .link-btn {
      color: #93c5fd;
      text-decoration: none;
      font-size: 0.9rem;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(59, 130, 246, 0.1);
      padding: 8px 14px;
      border-radius: 6px;
      border: 1px solid rgba(59, 130, 246, 0.2);
      transition: all 0.2s;
    }
    .link-btn:hover {
      background: rgba(59, 130, 246, 0.2);
      color: #fff;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🛡️ DevSecOps Bearer SAST Demo</h1>
      <p>Pipeline de Seguridad Automatizado con Bearer CLI, GitHub Actions y Render</p>
      <div class="badges">
        <span class="badge badge-green">🟢 API Status: ONLINE</span>
        <span class="badge badge-blue">🛡️ Bearer SAST: 0 Vulnerabilities</span>
        <span class="badge badge-purple">☁️ Cloud: Render (Live)</span>
      </div>
    </div>

    <div class="card">
      <div class="card-title">👥 Equipo del Proyecto</div>
      <div class="authors-box">
        <strong>Autores:</strong> Saúl José Alvarado Urbano &bull; Ana Cecilia Esteban Ramos<br>
        <span style="color: #9ca3af; font-size: 0.85rem;">Laboratorio DevSecOps: Implementación de Escaneo Estático SAST en SSDLC</span>
      </div>
      <div class="links-grid">
        <a class="link-btn" href="https://dev.to/saul_josealvaradourbano/implementacion-de-devsecops-con-bearer-sast-y-github-actions-de-la-deteccion-a-la-remediacion-16k" target="_blank">
          📄 Leer Artículo en Dev.to ↗
        </a>
        <a class="link-btn" href="https://github.com/saulalvarado1/Bearer_Articulo" target="_blank">
          💻 Ver Código en GitHub ↗
        </a>
      </div>
    </div>

    <div class="card">
      <div class="card-title">🧪 Consola Interactiva de Pruebas (Endpoints)</div>
      <div class="buttons-grid">
        <button onclick="testEndpoint('/health')">🩺 Probar /health</button>
        <button onclick="testEndpoint('/api/users')">👥 Listar /api/users</button>
        <button class="btn-primary" onclick="testLogin()">🔐 Login Seguro (/api/login)</button>
      </div>

      <div class="response-container">
        <div class="response-header">
          <span id="response-status">Respuesta de la API</span>
          <span id="response-time">Listo</span>
        </div>
        <pre id="json-output">// Haz clic en cualquiera de los botones superiores para probar la API en vivo...</pre>
      </div>
    </div>
  </div>

  <script>
    async function testEndpoint(endpoint) {
      const output = document.getElementById('json-output');
      const status = document.getElementById('response-status');
      const time = document.getElementById('response-time');
      
      output.textContent = 'Consultando ' + endpoint + '...';
      const start = performance.now();
      
      try {
        const res = await fetch(endpoint);
        const data = await res.json();
        const duration = Math.round(performance.now() - start);
        status.textContent = 'Status: ' + res.status + ' OK';
        time.textContent = duration + ' ms';
        output.textContent = JSON.stringify(data, null, 2);
      } catch (err) {
        status.textContent = 'Error';
        output.textContent = err.message;
      }
    }

    async function testLogin() {
      const output = document.getElementById('json-output');
      const status = document.getElementById('response-status');
      const time = document.getElementById('response-time');
      
      output.textContent = 'Enviando petición POST segura a /api/login...';
      const start = performance.now();
      
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'alice@example.com', password: 'admin123' })
        });
        const data = await res.json();
        const duration = Math.round(performance.now() - start);
        status.textContent = 'Status: ' + res.status + ' OK (Autenticado)';
        time.textContent = duration + ' ms';
        output.textContent = JSON.stringify(data, null, 2);
      } catch (err) {
        status.textContent = 'Error';
        output.textContent = err.message;
      }
    }
  </script>
</body>
</html>`;

  res.send(html);
});

// Ruta 2: Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

// Ruta 3: Listar usuarios
app.get('/api/users', (req, res) => {
  res.json({ success: true, count: users.length, data: users });
});

// Ruta 4: Login seguro (Remediado para Bearer SAST)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  }

  // PRÁCTICA SEGURA: Registro de eventos sin exponer credenciales ni datos sin sanitizar
  console.log('[AUTH-LOG] Intento de login recibido');

  const user = users.find(u => u.email === email);
  if (user && password === 'admin123') {
    return res.json({
      message: 'Autenticación exitosa',
      token: 'jwt-simulated-token-bearer-demo',
      user: { id: user.id, email: user.email, name: user.name }
    });
  }

  return res.status(401).json({ error: 'Credenciales inválidas' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(` Servidor corriendo en el puerto ${PORT}`);
});
