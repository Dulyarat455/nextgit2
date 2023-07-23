import React from "react";
import { useState,useEffect } from "react";
import Navbar from "@/components/Navbar";
import List from "@/components/List";


import DropdownSearchInput from "@/components/DropdownSearch";

function Lists() {


    const [token, setToken] = useState("")
    const [show, setShow] = useState(true)
    const [inputSearch,setInputSearch] = useState('')
    const [dow,setDow] = useState()
    const [selectedDateIn,setSelectedDateIn] = useState('')
    const [selectedDateOut,setSelectedDateOut] = useState('')
    const [list, setList] = useState([{
        "topic_name":"",
        "balance": 0,
        "date":"",
        "description":"",
        "trans_type": 0
    }])
   
 

    const SelectBar = async (selectedValue) => {
      console.log("selectedValue = ",selectedValue)
      fetch(`/api/gettransactionsfillter?trans_type=${selectedValue}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      ).then((res) => res.json())
      .then((data) => {
        console.log(data)
        setList(data.getTran)
      }
      );
    }

  

    
    const handleDropdownChange = async (event) => {
      const selectedValue = parseInt(event.target.value);
      if(selectedValue === 1 || selectedValue === 0){
         console.log('Selected value:', selectedValue);
        await SelectBar(selectedValue)
         setDow(selectedValue)
      }
      else if(selectedValue === 2){
        await Listall()
         setDow(selectedValue)
      }
      // console.log('Selected value:', selectedValue);
    };

    const options = [
      {label: 'All', value: 2},
      { label: 'Expenses', value: 1 },
      { label: 'Income', value: 0 },
      
    ];

    const Listall = async () => {
      fetch("/api/gettransactions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
          },
      })
      .then((res) => res.json())
      .then((data) => {
      
      console.log("data = ",data)
      setList(data.getTran)
      });
    }

  
    
    


    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
        if (token) {
        //   const decoded = jwtdecode(token);
         
          fetch("/api/gettransactions", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "auth-token": token,
                },
            })
            .then((res) => res.json())
            .then((data) => {
            
            console.log("data = ",data)
            setList(data.getTran)
            });

          
        }
      
      }, []);

      console.log("List = ",list)

      console.log(inputSearch)

      const handleClick = async () => {
       
        fetch(`/api/gettransactionsfillter?trans_type=${dow}&topic_name=${inputSearch}&dateIn=${selectedDateIn}&dateOut=${selectedDateOut}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        ).then((res) => res.json())
        .then((data) => {
          console.log(data)
          setList(data.getTran)
        }
        );



      }

      const handleDateInChange = (e) => {
        
        let selectDate
        selectDate = new Date(e.target.value).toISOString().split("T")[0];
        setSelectedDateIn(selectDate);
        // setInfo({ ...info, ["date"]: selectDate });
      };


      const handleDateOutChange = (e) => {
        let selectDate
        selectDate = new Date(e.target.value).toISOString().split("T")[0];
        setSelectedDateOut(selectDate);
     
        
        // setInfo({ ...info, ["date"]: selectDate });
      };

      console.log(selectedDateIn)
      console.log(selectedDateOut)

    return (

        <div>
            
            <Navbar/>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              List
            </h2>
            <br/>
          
            
            
            <div class="flex items-center justify-center ">
  <form>   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
        <svg aria-hidden="true" class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
      
      <input type="search" id="default-search" class="block w-80 p-3 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search " required  onChange={(e)=>setInputSearch(e.target.value)}/>
      
      <button type="button" class="text-white absolute right-2 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleClick}>Search</button>
     
    </div>   
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <label
          htmlFor="tags"
          className="text-blue-800 block mb-2 font-medium"
          style={{ marginRight: '10px' }}
        >
          Status :
        </label>
        <DropdownSearchInput options={options} onChange={handleDropdownChange} />
        
       
    </div>
    <label htmlFor="dateInput" className="text-blue-800 mr-2 font-medium ">Select a date:</label>
    <br/>
    
                            <input
                                type="date"
                                id="dateInput"
                                value={selectedDateIn}
                                onChange={handleDateInChange}
        
                                className="px-1 py-1  border border-black-300 rounded"
                            />
   <label htmlFor="dateInput" className="text-blue-800 mr-2 font-medium"> - </label>
                             <input
                                type="date"
                                id="dateInput"
                                value={selectedDateOut}
                                onChange={handleDateOutChange}
        
                                className="px-1 py-1  border border-black-300 rounded"
                            />


  </form>
</div>

<br/>


             
            <List  
            
            items = {list}
            />

        </div>


    )
}
export default Lists;
