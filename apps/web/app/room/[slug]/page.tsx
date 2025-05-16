import axios from "axios";
import { BACKEND_URL } from "../../config";

// Helper function to fetch room id
async function getRoomId(slug: string) {
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
    return response.data.room.id;
}

// Explicitly typing params
type PageProps = {
    params: {
        slug: string;
    };
};

export default async function({
    params,
}: PageProps) {
    // Destructure slug from params
    const { slug } = params;

    // Fetch the room ID using the slug
    const roomId = await getRoomId(slug);

    // Return the ChatRoom component with the roomId
    // return <ChatRoom id={roomId} />;
    return <div>

    </div>
}
