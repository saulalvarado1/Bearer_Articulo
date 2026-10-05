#  DevSecOps Bearer SAST Demo API

Aplicación web demostrativa creada para implementar un flujo **DevSecOps** completo: análisis estático de seguridad de código (SAST) mediante **Bearer CLI**, integración continua con **GitHub Actions** y despliegue automatizado en la nube pública.

---

##  Objetivos del Proyecto

- **Escaneo SAST:** Implementar [Bearer](https://www.bearer.com/) en el ciclo de vida del desarrollo de software (SSDLC) para detectar vulnerabilidades del OWASP Top 10 y riesgos de privacidad/fuga de datos (PII).
- **Automatización CI/CD:** Configurar un pipeline en GitHub Actions que escanee el código ante cada `push` o `pull request`.
- **Despliegue Continuo (CD):** Desplegar de forma automática en un proveedor Cloud/SaaS público una vez superado el análisis de seguridad.

---

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js & Express
- **Herramienta SAST:** Bearer CLI / Bearer GitHub Action
- **CI/CD:** GitHub Actions
- **Hosting Cloud:** Render / Cloud SaaS

---

## 🚀 Ejecución Local

### 1. Clonar el repositorio e instalar dependencias:
```bash
git clone <URL_DE_TU_REPOSITORIO>
cd <CARPETA_DEL_PROYECTO>
npm install
```

### 2. Iniciar el servidor:
```bash
npm start
```
El servidor estará disponible en `http://localhost:3000`.

---

## 🛡️ Escaneo de Seguridad con Bearer

Para ejecutar el escaneo localmente:

```bash
# Con Bearer CLI instalado:
bearer scan .

# O con Docker:
docker run --rm -v "$PWD:/path" bearer/bearer scan /path
```

---

## 📋 Endpoints de la API

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `GET` | `/` | Información general de la API |
| `GET` | `/health` | Endpoint de comprobación de salud |
| `GET` | `/api/users` | Listado de usuarios |
| `POST` | `/api/login` | Autenticación de usuarios (incluye caso de prueba SAST) |

---

## 🔗 Enlaces del Proyecto

- **Repositorio Público:** [https://github.com/saulalvarado1/Bearer_Articulo](https://github.com/saulalvarado1/Bearer_Articulo)
- **Aplicación en Vivo:** [https://bearer-articulo.onrender.com](https://bearer-articulo.onrender.com)
- **Artículo Técnico:** [https://dev.to/saul_josealvaradourbano/implementacion-de-devsecops-con-bearer-sast-y-github-actions-de-la-deteccion-a-la-remediacion-16k](https://dev.to/saul_josealvaradourbano/implementacion-de-devsecops-con-bearer-sast-y-github-actions-de-la-deteccion-a-la-remediacion-16k)
- **Video Demostrativo:** [YouTube (Pendiente de grabación)](https://youtube.com)
