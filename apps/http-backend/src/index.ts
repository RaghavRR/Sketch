import express from  "express"
import jwt  from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware.js";
import {CreateUserSchema, SigninSchema, CreateRoomSchema} from "@repo/common/types";
import {prismaClient} from "@repo/db/client"
import cors from "cors"
import { Request, Response } from "express";


const app = express();
app.use(express.json())
app.use(cors())

app.post("/signup", async (req,res) => {
    
    const parseData  = CreateUserSchema.safeParse(req.body);
    if(!parseData.success){
        res.json({
            message  : "Incorrect inputs"
        })
        return
    }

    try{
        const user = await prismaClient.user.create({
        data:{
                email: parseData.data?.username,
                password: parseData.data.password,
                name : parseData.data.name
            }
        })
        res.json({
            userId : user.id
        })
    }catch(e){
        res.status(411).json({
            message : "User already exists with this username"
        })
    }

    
})

app.post("/signin", async (req, res) => {
  const parseData = SigninSchema.safeParse(req.body);
  if (!parseData.success) {
    res.status(400).json({ message: "Incorrect inputs" });
    return;
  }

  const { username, password } = parseData.data;

  const user = await prismaClient.user.findFirst({
    where: {
      email: username,
      password: password,
    },
  });

  if (!user) {
    res.status(403).json({ message: "Not authorized" }); // fixed typo
    return;
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);

  res.json({
    token,
    name: user.name,
  });
});


app.post("/room", middleware,async(req,res) => {
    const parseData  = CreateRoomSchema.safeParse(req.body);
    if(!parseData.success){
        res.json({
            message  : "Incorrect inputs"
        })
        return
    }
    
    //@ts-ignore
    const userId = req.userId;

    try{
        const room = await prismaClient.room.create({
            data:{
                slug : parseData.data.name,
                adminId : userId
            }
        })

        res.json({
            roomId : room.id
        })
    }catch(e){
        res.status(411).json({
            "message" : "Room already exist by this name"
        })
    }
})


app.get("/chats/:roomId",async(req,res)=>{
    try{
        const roomId = Number(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where:{
                roomId : roomId
            },
            orderBy: {
                id : "desc"
            },
            take : 10000
        })
        res.json({
            messages
        })
    }catch(e){
        res.json({
            messages: []
        })
    }
})

app.get("/room/:slug",async(req,res)=>{
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where:{
            slug
        }
    })
    res.json({
        room
    })
})

app.get("/my-rooms", middleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;

  try {
    const rooms = await prismaClient.room.findMany({
      where: {
        adminId: userId,
      },
    });

    res.json({ rooms });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
});


//@ts-ignore
app.delete('/room/:id', middleware, async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.userId;

  // Parse the id param to number because your model uses Int
//@ts-ignore
  const roomId = parseInt(req.params.id, 10);

  if (isNaN(roomId)) {
    return res.status(400).json({ message: "Invalid room id" });
  }

  try {
    const room = await prismaClient.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.adminId !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this room" });
    }

    const deletedRoom = await prismaClient.room.delete({
      where: { id: roomId },
    });

    res.status(200).json({ message: "Room deleted successfully", deletedRoom });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.listen(3001)