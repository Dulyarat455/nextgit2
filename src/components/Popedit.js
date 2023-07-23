import React from "react";
import { useState,useEffect } from "react";
import { useRouter } from 'next/router';

import DropdownInput from "./Dropdown";

const Popedit =  (prop) => {
    const { isOpen, onClose ,itemNumber, itemName, token, tranId} = prop ;
    if (!isOpen) {
      return null;
    }
    console.log("tranId = ",tranId)
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState('');
    
    
    const [info, setInfo] = useState({
      tran_id : tranId,
      topic_name: null,
      balance: null,
      date: null,
      description: null,
      trans_type: null,
    })

    const handleDateChange = (e) => {
      setSelectedDate(e.target.value);

      let selectDate
      selectDate = new Date(e.target.value).toISOString().split("T")[0];
      setInfo({ ...info, ["date"]: selectDate });
     
    };

    const handleDropdownChange = (event) => {
      const selectedValue = event.target.value;
      setInfo({ ...info, ["trans_type"]: parseInt( selectedValue) });
      console.log('Selected value:', selectedValue);
    };

    const options = [
      {label: 'default', value: -1},
      { label: 'Expenses', value: 1 },
      { label: 'Income', value: 0 },
      
    ];


    const changeHandler = (e) => {
      if(e.target.name === "balance")
          setInfo({ ...info, [e.target.name]: parseFloat (e.target.value) });
      else{
          setInfo({ ...info, [e.target.name]: e.target.value });
      }
     
    }

    const clearInfo = () => {

      setInfo({ ...info, ["topic_name"]: null, ["balance"]: null,["date"]: null,["description"]: null
      ,["trans_type"]: null
      
      
      
      });

    }

    const handleSubmit = async () => {
      console.log("handleSubmit")
      const res = await fetch("/api/edittran", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
            
        },
        body: JSON.stringify(info),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {

              console.log(data)
               router.reload();
           
          } else {
              console.log(data)
            
          }
        }
        );


    }

    console.log(info)

    return (

        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-4 rounded border-2 border-red-500 rounded">
                <h1 className="text-xl font-bold mb-2">Warning!</h1>
         
                <p> Do you want edit item  " {itemNumber}. {itemName} ".</p> 
           
                <label for="tags" class="block mb-2 font-medium">Topics :</label>
               <input name="topic_name"  className="  w-full px-4 py-0 border-2 border-black-500 rounded" onChange={changeHandler}/>
               <label for="tags" class="text-blue-800 block mb-2 font-medium">Balance :</label>
               <input name="balance"  className="  w-full px-4 py-0 border-2 border-black-500 rounded" onChange={changeHandler}/>
               <label for="tags" class="text-blue-800 block mb-2 font-medium">Description :</label>
               <textarea id="message" rows="4" name='description' class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."  onChange={changeHandler}></textarea>
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
              
                  <label for="tags" class="text-blue-800 block mb-2 font-medium">Status :</label>
                  <DropdownInput options={options} onChange={handleDropdownChange} />
                
               
               
               <br/>
                <button className="mr-2 mt-4 p-2 bg-blue-500 text-white rounded" onClick={async () => {
                  await clearInfo()
                  onClose()
                }}>
                  Cancel
                </button>
                
                <button  type="submit" className=" mt-4 p-2 pl-3 pr-4 bg-blue-500 text-white rounded " onClick={ ()=>{
          
                  handleSubmit()
                }}>
                  Edit
                </button>
          </div>
  
        </div>
  
      
  
      
    
    );



}
export default Popedit;