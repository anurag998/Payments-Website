import axios from "axios";
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"

export default function Dashboard(){

    const [balance, setBalance] = useState(0);
    const [listOfUsers, setListOfUsers] = useState([]);
    
    useEffect(() => {
      console.log(localStorage.getItem("token"));
      axios.get("http://localhost:3000/api/v1/account/balance", { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} }).then((resp)=> {
      setBalance(resp.data.balance);
      });

      axios.get(`http://localhost:3000/api/v1/user/bulk?filter=`).then((resp2)=>{
        setListOfUsers(resp2.data.users);
      });
    }, []);

    console.log(listOfUsers)

    // const balance = 1000
    return (
      <>
      <section className="bg-gray-100">
      <div className="m-5 md:h-screen">
        <div className="flex  items-center justify-center">
      <div className="inline-block m-3 px-4 py-4 shadow-lg bg-white">
        <div className="text-3xl font-bold">
        Balance: {balance} 
        </div>
      </div>
      <div className="inline-block m-3 px-4 py-4 shadow-lg bg-white">
        <div className="text-3xl font-bold">
          Transaction History:
        </div>
      </div>
      </div>

      <div className="flex items-center justify-center">
      <div className="inline-block m-3 px-4 py-4 shadow-lg bg-white">
      <div> Users </div>

      <div className="inline-block"> <input onChange={async (e)=>{
        const currFilterVal = e.target.value;
        const resp = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${currFilterVal}`);
        setListOfUsers(resp.data.users)
      }} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"></input></div>
      
      <div></div>

      <div> {listOfUsers.map((user) => {
        return (
          <div className="flex">
            <div key ={user._id}> {user.username} </div>
            <div> <button> Send </button></div>
          </div>
      );
      })} </div>
      </div>
      </div>
      </div>
      </section>
      </>
    );
  }

