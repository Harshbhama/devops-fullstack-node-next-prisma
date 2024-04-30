'use client'
import Image from "next/image";
import axios from "axios";
import CardComonenet from "./components/CardComponent";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string
}
export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
  const [users, setUsers] = useState([]);
  const [newUser, setUpdateUser] = useState({id: '', name: '', email: ''})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${apiUrl}/users`);
      setUsers(response.data.reverse())
    }
    fetchData();
  },[apiUrl])
  useEffect(() => {
    console.log("users",users)
  },[users])
  return(
    <>
      User Management
      {!!users?.length && users?.map((val, index) => {
        return(
          <CardComonenet card={val} key={index}/>
        )
      })}
    </>
  )
}
