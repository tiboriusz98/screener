const C="scr-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","index.html","manifest.json","icon-192.png","icon-512.png"])));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET"||new URL(e.request.url).origin!==location.origin)return;
e.respondWith(caches.open(C).then(async c=>{const m=await c.match(e.request);const n=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}).catch(()=>m);return m||n}))});
