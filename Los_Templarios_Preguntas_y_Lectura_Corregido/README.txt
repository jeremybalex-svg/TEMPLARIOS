LOS TEMPLARIOS — VERSIÓN 2.0 SEGURA

Incluye el proyecto HTML/PWA, los 18 versículos de julio y agosto 2026, los 66 libros bíblicos y una carpeta contenido/ editable.

NUEVO:
- Login de administrador validado por servidor.
- Contraseña fuera del código del navegador.
- Cookie HttpOnly + SameSite para la sesión.
- Protección básica contra múltiples intentos de acceso.
- Panel web de administración que puede guardar cambios directamente en contenido/.
- Se pueden agregar, editar o quitar versículos, preguntas, lugares y libros desde el panel.

INSTALACIÓN:
1. Node.js 18+.
2. npm install
3. Define ADMIN_PASSWORD (y opcionalmente ADMIN_USER, SESSION_SECRET, PORT).
4. npm start
5. Abre http://localhost:3000
6. Para administrar, abre http://localhost:3000/?admin=1

PARA PUBLICAR:
Usa un hosting que permita Node.js y variables de entorno. Activa HTTPS.

SEGURIDAD:
La clave NO está en index.html. Aun así, para un sistema con usuarios/ranking compartido entre muchos dispositivos se necesita una base de datos y autenticación de usuarios.

ACTUALIZACIÓN — OPERACIONES EN LIBROS DE LA BIBLIA
- Las operaciones matemáticas están integradas dentro de “Libros de la Biblia”.
- Usan la cantidad real de capítulos de contenido/libros.json.
- Incluyen suma, resta, multiplicación y división.
- Las restas evitan resultados negativos.
- Las divisiones solo generan resultados enteros.
- Cada respuesta correcta otorga 10 puntos/XP.
- Se eliminó la sección matemática independiente.

ACTUALIZACIÓN — ENCUENTRA LA LECTURA CON LA BIBLIA COMPLETA
- Se integró la Santa Biblia Valera 1602 Purificada del PDF suministrado.
- Total integrado: 66 libros y 1,189 capítulos.
- Al entrar en “Encuentra la Lectura”, el sistema selecciona un capítulo al azar.
- El nombre del libro y el número del capítulo permanecen ocultos.
- El navegador lee el capítulo en voz alta y no anuncia la referencia.
- El usuario debe escribir el libro y el capítulo.
- Si la respuesta es incorrecta, la solución permanece oculta.
- Si acierta, se muestra la referencia y se otorgan 30 XP.
- Se puede pausar, reanudar, detener y repetir la lectura.
- Archivos: contenido/biblia.js y contenido/biblia.json.

CORRECCIÓN — BIBLIA EN “ENCUENTRA LA LECTURA”
- Se corrigió el error “No se pudo cargar la Biblia completa”.
- Los 1,189 capítulos ahora están integrados directamente dentro de index.html.
- “Encuentra la Lectura” ya no depende de que el navegador cargue contenido/biblia.js.
- Se renovó la caché del PWA para evitar que el navegador conserve una versión antigua.
- contenido/biblia.js y contenido/biblia.json se mantienen como copias editables/de respaldo.
- Si ya habías abierto una versión anterior instalada como PWA, cierra la aplicación y vuelve a abrirla para que se actualice.

CORRECCIÓN — LECTOR EN ESPAÑOL LATINO
- “Encuentra la Lectura” ahora solicita español latinoamericano (es-419).
- Prioriza voces es-MX, es-US, es-419, es-PA, es-CO y otros países de Latinoamérica.
- Evita seleccionar una voz inglesa por defecto.
- Si el dispositivo no tiene ninguna voz en español instalada, el programa muestra una advertencia en vez de leer el capítulo con voz inglesa.
- También se actualizó la caché del PWA para que no conserve el lector anterior.

ACTUALIZACIÓN — PREGUNTAS GENERALES
- Se integraron las 175 preguntas del documento “IGLESIA BIBLICA COLON — PREGUNTAS GENERALES”.
- Cada registro conserva número, pregunta, respuesta y referencia bíblica.
- El sistema selecciona preguntas al azar.
- La respuesta correcta revela la respuesta oficial y la referencia.
- Una respuesta correcta otorga 20 XP.
- El contenido editable está en contenido/preguntas_generales.json.
- También se integró una copia dentro de index.html para que funcione al abrirse localmente.

CORRECCIÓN — ENCUENTRA LA LECTURA RESTAURADA
- Se restauraron las variables internas de “Encuentra la Lectura”.
- Se restauraron las funciones que preparan y dividen el capítulo para el lector.
- Se conservan la Biblia completa de 1,189 capítulos, el lector en español latino y las 175 Preguntas Generales.
- Se renovó la caché del PWA para evitar que aparezca la versión dañada anterior.
