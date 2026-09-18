const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
const CONTENT_DIR = path.join(__dirname, 'contenido');
const PUBLIC_DIR = __dirname;

if (!ADMIN_PASSWORD) {
  console.error('Falta ADMIN_PASSWORD. Define una contraseña antes de iniciar el servidor.');
  process.exit(1);
}

app.disable('x-powered-by');
app.use(express.json({ limit: '2mb' }));

const attempts = new Map();
const sessions = new Map();

function cleanAttempts(ip) {
  const now = Date.now();
  const x = attempts.get(ip);
  if (x && now - x.started > 15 * 60 * 1000) attempts.delete(ip);
}
function same(a,b){
  const aa=Buffer.from(String(a)); const bb=Buffer.from(String(b));
  return aa.length===bb.length && crypto.timingSafeEqual(aa,bb);
}
function cookieOpts(){ return ['HttpOnly','SameSite=Strict','Path=/','Max-Age=28800', process.env.NODE_ENV==='production' ? 'Secure' : ''].filter(Boolean).join('; '); }
function parseCookies(header=''){
  return Object.fromEntries(header.split(';').map(x=>x.trim()).filter(Boolean).map(x=>{const i=x.indexOf('=');return [x.slice(0,i),decodeURIComponent(x.slice(i+1))]}));
}
function makeToken(){ return crypto.randomBytes(32).toString('hex'); }
function requireAdmin(req,res,next){
  const token=parseCookies(req.headers.cookie).templarios_admin;
  const s=token && sessions.get(token);
  if(!s || s.expires < Date.now()){ if(token) sessions.delete(token); return res.status(401).json({ok:false,error:'No autorizado'}); }
  req.admin=s; next();
}
function validContentName(name){ return ['versiculos.json','libros.json','preguntas_generales.json','lugares.json','config.json'].includes(name); }

app.post('/api/admin/login',(req,res)=>{
  const ip=req.ip || req.socket.remoteAddress || 'unknown'; cleanAttempts(ip);
  let x=attempts.get(ip); if(!x){x={count:0,started:Date.now()};attempts.set(ip,x);}
  if(x.count>=8) return res.status(429).json({ok:false,error:'Demasiados intentos. Espera 15 minutos.'});
  const {user,password}=req.body||{};
  if(!same(user,ADMIN_USER) || !same(password,ADMIN_PASSWORD)){x.count++; return res.status(401).json({ok:false,error:'Credenciales incorrectas'});}
  x.count=0;
  const token=makeToken(); sessions.set(token,{user:ADMIN_USER,expires:Date.now()+8*60*60*1000});
  res.setHeader('Set-Cookie',`templarios_admin=${encodeURIComponent(token)}; ${cookieOpts()}`);
  res.json({ok:true,user:ADMIN_USER});
});
app.post('/api/admin/logout',requireAdmin,(req,res)=>{
  const token=parseCookies(req.headers.cookie).templarios_admin; sessions.delete(token);
  res.setHeader('Set-Cookie','templarios_admin=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');
  res.json({ok:true});
});
app.get('/api/admin/me',(req,res)=>{
  const token=parseCookies(req.headers.cookie).templarios_admin; const s=token&&sessions.get(token);
  if(!s || s.expires<Date.now()) return res.status(401).json({ok:false});
  res.json({ok:true,user:s.user});
});

app.get('/api/content',(req,res)=>{
  try{
    const names=['versiculos.json','libros.json','preguntas_generales.json','lugares.json','config.json'];
    const out={}; for(const n of names) out[n]=JSON.parse(fs.readFileSync(path.join(CONTENT_DIR,n),'utf8'));
    res.json(out);
  }catch(e){res.status(500).json({ok:false,error:'No se pudo cargar el contenido'});}
});
app.put('/api/content/:name',requireAdmin,(req,res)=>{
  const name=req.params.name;
  if(!validContentName(name)) return res.status(400).json({ok:false,error:'Archivo no permitido'});
  try{
    const data=req.body;
    if(data===undefined) throw new Error('sin datos');
    const pretty=JSON.stringify(data,null,2)+'\n';
    const tmp=path.join(CONTENT_DIR,`.${name}.tmp`);
    fs.writeFileSync(tmp,pretty,'utf8');
    JSON.parse(fs.readFileSync(tmp,'utf8'));
    fs.renameSync(tmp,path.join(CONTENT_DIR,name));
    res.json({ok:true,name});
  }catch(e){res.status(400).json({ok:false,error:'JSON inválido o contenido no válido'});}
});

app.use(express.static(PUBLIC_DIR,{extensions:['html']}));
app.get('*',(req,res)=>res.sendFile(path.join(PUBLIC_DIR,'index.html')));
app.listen(PORT,()=>console.log(`Los Templarios en http://localhost:${PORT}`));
