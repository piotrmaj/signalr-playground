import * as signalR from "@microsoft/signalr";
// import "./css/main.css";

const body: HTMLBodyElement = document.querySelector("body")!;
const divMessages: HTMLDivElement = document.querySelector("#divMessages")!;
const tbMessage: HTMLInputElement = document.querySelector("#tbMessage")!;
const btnSend: HTMLButtonElement = document.querySelector("#btnSend")!;
const canvas: HTMLCanvasElement = document.getElementById("myCanvas")! as any;
const ctx = canvas.getContext("2d")!;
const username = new Date().getTime();

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7063/mainHub")
    .build();

connection.on("messageReceived", (payload) => {
//   const m = document.createElement("div");
//   m.innerHTML = `<div class="message-author">${username}</div><div>${message}</div>`;

//   divMessages.appendChild(m);
//   divMessages.scrollTop = divMessages.scrollHeight;
 
  console.log('payload', payload);

//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;

//   ctx.clearRect(0,0, canvas.width, canvas.height);

//   ctx.beginPath();
//   ctx.rect(payload.x, payload.y, payload.width, payload.height);
//   ctx.stroke();

  drawClicks(payload);

  //canvas.width  = canvas.offsetWidth;
  //canvas.height = canvas.offsetHeight;
});

connection.start().catch((err) => document.write(err));

tbMessage.addEventListener("keyup", (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    send();
  }
});

btnSend.addEventListener("click", send);

function send() {
  connection.send("newMessage", username, tbMessage.value)
    .then(() => (tbMessage.value = ""));
}

let isClicked = false;

let clicks: {x: number, y: number}[] = [];


body.addEventListener('mousemove', (e: any) => {
    if(isClicked){
        console.log("move", e);
        if(!clicks.some(c => c.x === e.x && c.y === e.y)){
            clicks.push({x: e.offsetX, y:e.offsetY});
            drawClicks(clicks);
        }
    }
    //     if (e.pageX!==currentPos[0] && e.pageY !==currentPos[1]){
    //         currentPos=[e.pageX,e.pageY];
    //     this.innerHTML = "Event: " + e.type;
    //     console.log("move");
    //     }
    // }
});

function clearCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

function point(x: any, y: any, ctx: CanvasRenderingContext2D){
    console.log('point', x, y);
    ctx.fillRect(x,y,1,1);
}

const drawClicks = (pixels: {x: number, y: number}[] ) => {
    pixels.forEach(p => point(p.x, p.y, ctx));
}

const sendClicks = (pixels: {x: number, y: number}[] ) => {
    fetch("https://localhost:7063/Points", {
        method: "POST",
        body: JSON.stringify({
            points: pixels
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}

body.addEventListener('mousedown', (e: any) => {
    console.log("mousedown", e);
    isClicked = true;
    clicks=[];
});
body.addEventListener('mouseup', (e: any) => {
    console.log("mouseup", e);
    console.log('finished', clicks);
    sendClicks(clicks);
    isClicked = false;
});
