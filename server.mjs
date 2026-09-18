import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,relative,extname} from 'node:path';
const root=resolve('dist');
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.mp4':'video/mp4','.webmanifest':'application/manifest+json'};
const configuration=JSON.parse(await readFile('vercel.json','utf8'));
createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');
    let path=decodeURIComponent(url.pathname);
    if(path.endsWith('/')&&path!=='/'){res.writeHead(308,{Location:path.slice(0,-1)+url.search});res.end();return;}
    if(path.endsWith('.html')&&path!=='/404.html'){res.writeHead(308,{Location:path==='/index.html'?'/':path.slice(0,-5)});res.end();return;}
    let file=resolve(root,'.'+(path==='/'?'/index.html':extname(path)?path:path+'.html'));
    if(relative(root,file).startsWith('..')){res.writeHead(403);res.end();return;}
    let status=200;
    try{if(!(await stat(file)).isFile())throw new Error('Not found');}catch{file=resolve(root,'404.html');status=404;}
    const content=await readFile(file);
    for(const header of configuration.headers.find(x=>x.source==='/(.*)').headers)res.setHeader(header.key,header.value);
    res.setHeader('Content-Type',types[extname(file)]||'application/octet-stream');res.setHeader('Cache-Control','no-store');
    const range=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if(range&&extname(file)==='.mp4'){
      const start=Number(range[1]);const end=Math.min(range[2]?Number(range[2]):content.length-1,content.length-1);
      if(start>=content.length||end<start){res.writeHead(416,{'Content-Range':`bytes */${content.length}`});res.end();return;}
      res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${content.length}`,'Accept-Ranges':'bytes','Content-Length':end-start+1});res.end(req.method==='HEAD'?undefined:content.subarray(start,end+1));return;
    }
    res.writeHead(status,{'Content-Length':content.length});res.end(req.method==='HEAD'?undefined:content);
  }catch{res.writeHead(400);res.end('Bad request');}
}).listen(port,'127.0.0.1',()=>console.log(`Beauty by Kyrin: http://127.0.0.1:${port}`));
