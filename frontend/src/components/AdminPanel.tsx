import { useEffect, useState } from "react"
import { apiFetch } from "../lib/api.ts";
import UserCard from "./UserCard.tsx";

interface UserDetails {
    _id: number;
    name: string;
    email: string;
    role: string;
    isBlocked: boolean;
    createdAt: Date;
}
const [userData, setuserData] = useState([]);

const userDetails = async () => {
    const res: { users: [], message: string } = await apiFetch('/admin/dashboard');
    setuserData(res.users);
}

useEffect(() => {
    userDetails();
}, [])



export const Admin = () => {
    return (
        <section className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 flex  flex-wrap justify-evenly gap-5">
            {userData.length && userData.map((user: UserDetails) => (
                <UserCard key={user._id} name={user.name} email={user.email} role={user.role} _id={user._id} createdAt={new Date(user.createdAt).toDateString()} />
            ))}
        </section>
    )
}
