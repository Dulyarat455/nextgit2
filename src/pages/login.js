import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";


function LoginPage() {
  const router = useRouter();

  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [messagestatus, setMessagestatus] = useState(false);


  const submitHandler = (e) => {
    e.preventDefault();
    const res = fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage(data.message);
          setMessagestatus(true);
          // set token to local storage
          localStorage.setItem("token", data?.token);
          // wait 2 seconds and redirect to home
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          setMessage(data.message);
        }
      });
  };

  const  changeHandler  =  (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
    console.log(info)
  };
  

    return (
        <>
        <Navbar/>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="data:image/png;base64,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"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {message && <p className={`${messagestatus ? "text-green-400": "text-red-500"} w-full text-left text-sm`}>{message}</p>}
            <form  onSubmit={submitHandler} className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={changeHandler}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={changeHandler}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
          
          </div>
        </div>
        


      </>
    
      )

}
export default LoginPage;