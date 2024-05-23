import axios from "axios";
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);
    const [listOfUsers, setListOfUsers] = useState([]);
    
    useEffect(() => {

      axios.post("http://localhost:3000/api/v1/user/me", {}, {headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }}).then((resp) => {
        if(resp.data.msg != "Authenticated"){
          navigate("/signin");
        }
        else{
          console.log(resp.data.msg)
          console.log("Auth");
        }
      })

      console.log(localStorage.getItem("token"));
      axios.get("http://localhost:3000/api/v1/account/balance", { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} }).then((resp)=> {
      setBalance(resp.data.balance);
      });

      // axios.get(`http://localhost:3000/api/v1/user/bulk?filter=`).then((resp2)=>{
      //   setListOfUsers(resp2.data.users);
      // });
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
      <div className="flex items-center justify-center text-3xl font-bold m-4"> Users </div>

      <div className="flex items-center justify-center">
      <div className="inline-block m-3"> <input placeholder="Search username to send money" onChange={async (e)=>{
        const currFilterVal = e.target.value;
        const resp = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${currFilterVal}`);
        setListOfUsers(resp.data.users)
      }} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"></input></div>
      </div>
      <div></div>

      <div className="m-3"> {listOfUsers.map((user) => {
        return (
          <div className="flex justify-between items-center">
            <div className="px-5 py-2" key ={user._id}> {user.username} </div>
            <div className="my-2"> <button onClick= {()=>{
              navigate("/send?" + "name=" + user.firstName + "&userid=" + user._id);
            }}className="w-full text-white bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center"> Send </button></div>
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

