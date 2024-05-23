import axios from "axios";
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";


export default function SignUp(){
  const navigate = useNavigate();

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

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");


    return (
      <>
      <section className="bg-gray-100">
      <div className="flex flex-col justify-center items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="inline-block bg-white rounded-lg px-6 py-2 mx-auto  shadow-lg">
          <div className="flex justify-center items-center my-5">
          <h1 className="text-3xl font-bold text-gray-900">Sign Up</h1>
          </div>
          <div className="block m-2 text-m font-medium text-gray-900">First Name</div>
          <div className="mb-5"><input value={firstName} onChange = {(e) => {
            setFirstName(e.target.value)
          }} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"></input></div>

          <div className="block m-2 text-m font-medium text-gray-900">Last Name</div>
          <div className="mb-5"><input value = {lastName} onChange = {(e) => {
            setLastName(e.target.value);
          }} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"></input></div>

          <div className="block m-2 text-m font-medium text-gray-900">User Name</div>
          <div className="mb-5"><input onChange = {(e) => {
            setUserName(e.target.value);
          }} value={userName} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"></input></div>

          <div className="block m-2 text-m font-medium text-gray-900">Password</div>
          <div className="mb-5"><input type="password" onChange = {(e) => {
            setPassword(e.target.value);
          }} value={password} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"></input></div>

          <div className="m-3">
              <button onClick={async ()=>{
                const resp = await axios.post("http://localhost:3000/api/v1/user/signup", {
                  username: userName,
                  firstName: firstName,
                  lastName: lastName,
                  password: password
                });
                console.log(resp.data);
                if(resp.data.msg == "User created successfully"){
                  localStorage.setItem("token", resp.data.token);
                  navigate("/dashboard");
                }
                else{
                  console.log("Failed to sign up");
                }
              }} className="w-full text-white bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"> Sign Up</button>
          </div>
          <div className="flex justify-center "> 
          <div className="mr-2"> Already have an account? </div>
          <Link className="underline" to={"/signin"}> Sign In </Link>
          </div>
          </div>
        </div>
        </section>

      </>
    )

  }