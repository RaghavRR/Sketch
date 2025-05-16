import { Tool } from "@/app/components/Canvas";
import { getExistingShapes } from "./http";

type Shape = {
    type : "react";
    x: number;
    y: number;
    width: number;
    height: number
} | {
    type : "circle";
    centerX : number;
    centerY : number;
    radius : number;
} | {
    type : "pencil",
    startX :number,
    startY : number,
    endX : number,
    endY : number
}


export class Game{
    private canvas: HTMLCanvasElement
    private ctx : CanvasRenderingContext2D
    private existingShapes : Shape[]
    private roomId : string
    private clicked: boolean
    private isSocketOpen: boolean;
    private startX = 0
    private startY = 0
    private selectedTool: Tool = "circle";
    socket : WebSocket

    constructor(canvas: HTMLCanvasElement, roomId: string, socket : WebSocket){
        this.canvas = canvas;
        this.isSocketOpen = false
        this.ctx = canvas.getContext("2d")!
        this.existingShapes = []
        this.roomId = roomId
        this.socket = socket
        this.clicked = false
        this.init()
        this.initHandlers()
        this.initMouseHandlers();
    }

    destroy(){
        this.canvas.removeEventListener("mousedown", this.mouseDownHadler)
        
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler)

        this.canvas.removeEventListener("mousemove",this.mouseMoveHandler)
    }

    setTool(tool: "circle" | "pencil" | "react"){
        this.selectedTool = tool
    }

    async init(){
        this.existingShapes = await getExistingShapes(this.roomId)
        this.clearCanvas()
    };

    initHandlers(){
        this.socket.onopen = () => {
            this.isSocketOpen = true;
        };

        this.initMouseHandlers();

        this.socket.onclose = () => {
            this.isSocketOpen = false;
            console.warn("WebSocket closed.");
        };

        this.socket.onerror = (e) => {
            console.error("WebSocket error:", e);
        };

        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "chat") {
                const parsedShape = JSON.parse(message.message);
                this.existingShapes.push(parsedShape.shape);
                this.clearCanvas();
            }
        };
    }

    clearCanvas(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0, 0, 0)"
        this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);

        this.existingShapes.map((shape)=>{
        if(shape.type === "react"){
                this.ctx.strokeStyle = "rgba(255, 255, 255)"
                this.ctx.strokeRect(shape.x,shape.y, shape.width, shape.height)
        }else if(shape.type === "circle"){
                this.ctx.beginPath()
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath()
            }
        })
    }

    mouseUpHandler = (e) => {
        this.clicked = false
                const width = e.clientX - this.startX;
                const height = e.clientY - this.startY;
                
                const selectedTool = this.selectedTool;
                let shape: Shape | null = null
                if(selectedTool === "react"){
                    shape= {
                        type: "react",
                        x : this.startX,
                        y : this.startY,
                        height,
                        width 
                    }
                    
                }else if(selectedTool === "circle"){
                    const radius = Math.max(width, height)/2;
                    shape = {
                        type: "circle",
                        radius,
                        centerX: this.startX + radius,
                        centerY: this.startY + radius
                };
}

                if(!shape){
                    return
                }
                this.existingShapes.push(shape);
                

                if (this.socket.readyState === WebSocket.OPEN) {
                    this.socket.send(JSON.stringify({
                    type : "chat",
                    message: JSON.stringify({ shape }),
                    roomId : this.roomId
                }));
                } else {
                    console.warn("WebSocket not open. Message not sent.");
                }

    }
    mouseDownHadler = (e) => {
        this.clicked = true
        this.startX = e.clientX
        this.startY = e.clientY
    }
    mouseMoveHandler = (e) => {
        if(this.clicked){
                    const width = e.clientX - this.startX;
                    const height = e.clientY - this.startY;
                    this.clearCanvas()
                    this.ctx.strokeStyle = "rgba(255, 255, 255)"
                    const selectedTool = this.selectedTool
                    if(selectedTool === "react"){
                        this.ctx.strokeRect(this.startX,this.startY, width, height)
                    }else if(selectedTool === "circle"){
                        const radius = Math.max(width, height) /2;
                        const centerX = this.startX + radius;
                        const centerY = this.startY + radius;
                        this.ctx.beginPath()
                        this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
                        this.ctx.stroke();
                        this.ctx.closePath()

                    }
                }
    }

    initMouseHandlers(){
        this.canvas.addEventListener("mousedown", this.mouseDownHadler)
        
        this.canvas.addEventListener("mouseup", this.mouseUpHandler)

        this.canvas.addEventListener("mousemove",this.mouseMoveHandler)
    }
}