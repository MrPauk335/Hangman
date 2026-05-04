export default {
async fetch(req, env) {
const url=new URL(req.url);

if(url.pathname==="/api/create"){
const {roomId,word}=await req.json();
await env.ROOMS.put(roomId,JSON.stringify({word,guessed:[]}));
return new Response("ok");
}

if(url.pathname==="/api/state"){
const id=url.searchParams.get("roomId");
const data=await env.ROOMS.get(id);
return new Response(data||"{}");
}

if(url.pathname==="/api/guess"){
const {roomId,letter}=await req.json();
let data=JSON.parse(await env.ROOMS.get(roomId));

if(!data.guessed.includes(letter)){
data.guessed.push(letter);
}

await env.ROOMS.put(roomId,JSON.stringify(data));
return new Response("ok");
}

return new Response("not found",{status:404});
}
}
