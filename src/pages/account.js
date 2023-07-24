import React, { useState,useEffect } from 'react';
import Navbar from '@/components/Navbar';


function Account() {

    const [selectedDate, setSelectedDate] = useState('');
    const [buttonEx, setButtonEx] = useState(false);
    const [buttonIn, setButtonIn] = useState(false);
    const [token, setToken] = useState("")

    const [info, setInfo] = useState({
        topic_name: "",
        balance: 0,
        date: "",
        description: "",
        trans_type: 0,
      });

      useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
      }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    let selectDate
    selectDate = new Date(e.target.value).toISOString().split("T")[0];
    setInfo({ ...info, ["date"]: selectDate });
  };

  console.log(info)

    const submitHandler = async (e) => {
        const res = await fetch("/api/transactions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
            body: JSON.stringify(info),
          });
          const data = await res.json();
  

    }

    const changeHandler = (e) => {
        if(e.target.name === "balance")
            setInfo({ ...info, [e.target.name]: parseFloat (e.target.value) });
        else{
            setInfo({ ...info, [e.target.name]: e.target.value });
        }
       
      }



    return (

        <div>
            <Navbar/>
            <form onSubmit={submitHandler} >
                <div className="mx-30" > 
                        <input className=" "/>
                </div>
                {/* class="flex justify-center items-center h-screen" */}
                <div class="flex justify-center items-center h-90">
                        <div class="w-64 ">
                            <label for="tags" class="block mb-2 font-medium">Topics :</label>
                            <input type="text" id="tags" name="topic_name" class="  w-full px-4 py-1 border-2 border-black-500 rounded" onChange={changeHandler} />
                            <label for="tags" class="text-blue-800 block mb-2 font-medium">Balance :</label>
                            <input type="number" id="tags" name="balance"  class="  w-full px-4 py-1 border-2 border-black-500 rounded" onChange={changeHandler}/>
                            <label for="tags" class="text-blue-800 block mb-2 font-medium">Description :</label>
                            <textarea id="message" rows="4" name='description' class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." onChange={changeHandler}></textarea>
                            
                            <br/>
                            <label htmlFor="dateInput" className="text-gray-700 mr-2">Select a date:</label>
                            <input
                                type="date"
                                id="dateInput"
                                value={selectedDate}
                                onChange={handleDateChange}
        
                                className="px-1 py-1  border border-red-300 rounded"
                            />
                            <br/>
                            <br/>
                            <span>
                                <button  type="button"   className = {`  bg-red-500 m-2 p-2 font-medium  ${ buttonEx && "border-4"}   border-blue-800 rounded mr-8 ml-3`} onClick={()=>{setButtonEx(true) 
                                    setButtonIn(false)
                                    setInfo({ ...info, ["trans_type"]: 1 });
                                
                                    }}>Expenses</button>
                            
                           
                                <button  type="button"  className={`bg-green-500 m-2 p-2 font-medium ${ buttonIn && "border-4"}  border-blue-800 rounded ml-10`} onClick={()=>{setButtonIn(true)
                                setButtonEx(false)
                                setInfo({ ...info, ["trans_type"]: 0 });
                                }}>Income</button>
                            </span>
                           <br/>
                           <br/>
                           <hr className='border-1  border-black-300'/>
                           <br />

                           <div>
                            <button  type='submit' className='bg-blue-500 text-white  border-2 m-2 p-2 border-black-500 rounded-lg'>Submit</button>
                           </div>
                        </div>
                </div>

            </form>

        </div>
    )
}
export default Account;