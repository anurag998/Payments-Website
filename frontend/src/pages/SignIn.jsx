import { useState, useEffect } from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function SignIn(){
  const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
      axios.post("http://localhost:3000/api/v1/user/me", {}, {headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }}).then((resp) => {
        if(resp.data.msg == "Authenticated"){
          navigate("/dashboard");
        }
        else{
          console.log(resp.data.msg)
          console.log("Not auth");
        }
      })

      

    }, [])

    


    return (
      <>
      <section className="bg-gray-100">
      <div className="flex flex-col justify-center items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="inline-block bg-white rounded-lg px-6 py-2 mx-auto shadow-lg ">
      <div className="flex flex-col justify-center items-center my-5">
      <h1 className="text-3xl font-bold">Sign In</h1>
      </div>
      <div className="block m-2 text-m font-medium text-gray-900 ">Username</div>
        <div className="mb-5"><input value={username} onChange={(e)=>{
          setUsername(e.target.value);
        }} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"></input></div>

        <div className="block m-2 text-m font-medium text-gray-900">Password</div>

        <div className="mb-5"><input value={password} onChange={(e)=>{
          setPassword(e.target.value);
        }} type="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"></input></div>
        
        <div className="mt-7 mb-2">
        <button onClick = {async ()=> {
          const resp = await axios.post("http://localhost:3000/api/v1/user/signin", {
            username,
            password
          })
          if(resp.data.msg == "Signed In Successfully"){
            console.log(resp.data.msg);
            localStorage.setItem("token", resp.data.token);
            navigate("/dashboard");
          }
        }} className="w-full text-white bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"> Sign In</button>
        </div>

        <div className="flex justify-center"> 
        <div className="mr-2"> Don't have an account? </div>
        <Link className="underline" to={"/signup"}> Sign Up </Link></div>
        </div>
        </div>
        </section>
      </>
    );
  }