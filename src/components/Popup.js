import React from "react";
import { useRouter } from 'next/router';


const Popup =  (prop) => {
    const { isOpen, onClose ,itemNumber, itemName, token, tranId} = prop ;
    if (!isOpen) {
      return null;
    }
    const router = useRouter();
    
    const deleteItem = async() => {
     
      // console.log("info = ",info)
      const res = await fetch("/api/deletetran", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
                
            },
            body: JSON.stringify({
              tran_id: tranId
            }),
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
            
    };
  
    console.log( itemName)
    return (
  
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-4 rounded border-2 border-red-500 rounded">
                <h1 className="text-xl font-bold mb-2">Warning!</h1>
         
                <p> Do you want delete item  " {itemNumber}. {itemName} ".</p> 
           
                
               
               
               {/* <input type="text" className="bg-yellow-200  w-full px-4 py-1 border-2 border-red-500 rounded"/> */}
               <br/>
                <button className="mr-2 mt-4 p-2 bg-blue-500 text-white rounded" onClick={onClose}>
                  Cancel
                </button>
                
                <button className=" mt-4 p-2 pl-3 pr-4 bg-blue-500 text-white rounded " onClick={()=>{
                  
                  deleteItem()
                }}>
                  Ok
                </button>
          </div>
  
        </div>
  
      
  
      
    
    );
  };
  
  export default Popup;
  
  