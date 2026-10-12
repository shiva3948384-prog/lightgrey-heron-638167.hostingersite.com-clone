const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);
const productMap = {"b360f7bd633df":"freedom-fk/products/index.php","d3ae32bfa5521":"freedom-fk/products/index-1.php","a7ebec5ac987b":"freedom-fk/products/index-2.php","a77f4d8cdcc21":"freedom-fk/products/index-3.php","3c7095e46b323":"freedom-fk/products/index-4.php","57de2486b28f2":"freedom-fk/products/index-5.php","051622ce4fc31":"freedom-fk/products/index-6.php","cc814d239bcae":"freedom-fk/products/index-7.php","ea0583c5b9ae3":"freedom-fk/products/index-8.php","iphone17":"freedom-fk/products/index-9.php","iphone16":"freedom-fk/products/index-10.php","48dc90ee60e84":"freedom-fk/products/index-11.php","25d20c2b1dc5c":"freedom-fk/products/index-12.php","3d56e5edf6f38":"freedom-fk/products/index-13.php","0616698f3836c":"freedom-fk/products/index-14.php","fe98d1b39b938":"freedom-fk/products/index-15.php","1b127c7e3ff53":"freedom-fk/products/index-16.php","2bc6ece01411b":"freedom-fk/products/index-17.php","f0c4f2268d872":"freedom-fk/products/index-18.php","2ce01e777f0ff":"freedom-fk/products/index-19.php","03bec70674cef":"freedom-fk/products/index-20.php","92787842293f6":"freedom-fk/products/index-21.php","49a62e6801665":"freedom-fk/products/index-22.php","3d137704666aa":"freedom-fk/products/index-23.php","17437576b5e8f":"freedom-fk/products/index-24.php","0467e5a892406":"freedom-fk/products/index-25.php","dac72273679cb":"freedom-fk/products/index-26.php","b2f01fa8aaf09":"freedom-fk/products/index-27.php","4ab42480d26ab":"freedom-fk/products/index-28.php","ed572399d7ed0":"freedom-fk/products/index-29.php","373f04b573c81":"freedom-fk/products/index-30.php","156b72f954ad8":"freedom-fk/products/index-31.php","571dd48a19540":"freedom-fk/products/index-32.php","923d3541c3f98":"freedom-fk/products/index-33.php","b327846273eae":"freedom-fk/products/index-34.php","000f3dabc1f59":"freedom-fk/products/index-35.php","6771088295a8e":"freedom-fk/products/index-36.php","a69a084d6f401":"freedom-fk/products/index-37.php"};
const mime = {'.html':'text/html; charset=utf-8','.php':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.ico':'image/x-icon','.txt':'text/plain; charset=utf-8'};
function send(res, status, body, type='text/plain; charset=utf-8') { res.writeHead(status, {'Content-Type':type,'X-Content-Type-Options':'nosniff'}); res.end(body); }
http.createServer((req,res)=>{
  let url;
  try { url = new URL(req.url, 'http://localhost'); } catch { return send(res,400,'Bad request'); }
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch { return send(res,400,'Bad path'); }
  if (pathname === '/' || pathname === '/index.html') pathname = '/freedom-fk/index.html';
  if (pathname === '/freedom-fk' || pathname === '/freedom-fk/') pathname = '/freedom-fk/index.html';
  if (pathname === '/freedom-fk/products/' || pathname === '/freedom-fk/products') pathname = '/freedom-fk/products/index.php';
  if (pathname === '/freedom-fk/products/index.php' && url.searchParams.get('id')) {
    const target = productMap[url.searchParams.get('id')];
    if (target) pathname = '/' + target;
  }
  const file = path.resolve(ROOT, '.' + pathname);
  if (!file.startsWith(ROOT + path.sep)) return send(res,403,'Forbidden');
  fs.readFile(file,(err,data)=>{
    if (err) return send(res,404,'Page not found');
    const ext = path.extname(file).toLowerCase();
    send(res,200,data,mime[ext] || 'application/octet-stream');
  });
}).listen(PORT,'0.0.0.0',()=>console.log(`Freedom FK site running on port ${PORT}`));
