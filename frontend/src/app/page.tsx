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
axios.defaults.withCredentials = true;
export default function Home() {
  const apiUrl = 'http://13.235.75.89:4000'
  const [users, setUsers] = useState([]);
  const [newUser, setUpdateUser] = useState({id: '', name: '', email: ''})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios({
        method: 'get',
        url: `${apiUrl}/users`
      });
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
