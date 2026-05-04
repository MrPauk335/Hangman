let roomId;
let guessed=[];

async function createRoom(){
roomId=Math.random().toString(36).slice(2,6);
const word=prompt("Слово");

await fetch("/api/create",{
method:"POST",
body:JSON.stringify({roomId,word})
});

start();
}

async function joinRoom(){
roomId=document.getElementById("roomInput").value;
start();
}

function start(){
document.getElementById("menu").classList.add("hidden");
document.getElementById("game").classList.remove("hidden");
document.getElementById("roomCode").innerText=roomId;

setInterval(update,1000);
renderKeyboard();
}

async function update(){
const res=await fetch("/api/state?roomId="+roomId);
const data=await res.json();
guessed=data.guessed;
renderWord(data.word);
}

function renderWord(w){
let out="";
for(let c of w){
out+=guessed.includes(c)?c:"_";
out+=" ";
}
document.getElementById("word").innerText=out;
}

function renderKeyboard(){
const div=document.getElementById("letters");
const abc="abcdefghijklmnopqrstuvwxyz";

for(let l of abc){
let b=document.createElement("button");
b.innerText=l;

b.onclick=async ()=>{
if(!guessed.includes(l)){
guessed.push(l);

await fetch("/api/guess",{
method:"POST",
body:JSON.stringify({roomId,letter:l})
});
}
};

div.appendChild(b);
}
}
