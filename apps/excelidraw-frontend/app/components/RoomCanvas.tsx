"use client"

import { WS_URL } from "@/config"
import { useRef, useEffect, useState } from "react"
import { Canvas } from "./Canvas"

export function RoomCanvas({roomId}: {roomId : string}){
    const [socket, setSocket] = useState<WebSocket | null>(null)

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3OWY5ZmYzOC0wNWMxLTQzNDYtYThhMS0zZTFkMWRjNTAwMTUiLCJpYXQiOjE3NDczMTE4Mjd9.p0fPz3J3HqN_1GuC7FDv0mkacqFGVkgYifUvRSpiG5o`)

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