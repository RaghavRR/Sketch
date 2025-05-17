"use client"

import { WS_URL } from "@/config"
import { useRef, useEffect, useState } from "react"
import { Canvas } from "./Canvas"

export function RoomCanvas({roomId}: {roomId : string}){
    const [socket, setSocket] = useState<WebSocket | null>(null)

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDQ5OWJlOC1kOTFiLTQ1OWEtYTgxNi1mMGU2OGYwYjM0NTciLCJpYXQiOjE3NDczOTIxNDJ9.UE_BP6-mdNVDKkx9ClJO4LeBinUEaYWLB1g4G1JRdlQ`)

        ws.onopen = () => {
            setSocket(ws);
            const data = JSON.stringify({
                type : "join-room",
                roomId
            })
            ws.send(data)
        }
    },[])

    

    if(!socket){
        return <div>
            Connection to server...
        </div>
    }

    return <div>
        <Canvas roomId={roomId} socket={socket}/>
        
    </div>
}