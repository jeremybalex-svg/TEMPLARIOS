LOS TEMPLARIOS — ADMINISTRACIÓN SEGURA

Esta versión ya NO guarda la contraseña del administrador en index.html.
El acceso se valida en el servidor mediante /api/admin/login y una cookie HttpOnly.

Para iniciar:
1. Instala Node.js 18 o superior.
2. Abre una terminal dentro de esta carpeta.
3. Ejecuta: npm install
4. Define ADMIN_PASSWORD y, opcionalmente, ADMIN_USER y SESSION_SECRET.
5. Ejecuta: npm start
6. Abre http://localhost:3000
7. Entra a ?admin=1 para abrir la pantalla privada.

IMPORTANTE:
- Nunca pongas tu contraseña real dentro de index.html.
- Usa HTTPS cuando publiques el programa en Internet.
- Configura una contraseña larga y única.
- SESSION_SECRET debe ser aleatoria y privada.
- La carpeta contenido/ es el contenido maestro. El administrador también puede editarlo desde la pantalla web y guardar directamente en el servidor.
- Los usuarios normales no reciben las credenciales ni pueden guardar cambios en contenido porque el servidor exige una sesión de administrador.

Nota: este proyecto protege la administración, pero el progreso/ranking de usuarios sigue siendo local al dispositivo. Para ranking global entre todos los usuarios habría que añadir una base de datos y cuentas de usuario.
