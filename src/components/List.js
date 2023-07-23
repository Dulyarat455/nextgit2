import React from "react";
import { useState,useEffect } from "react";
import Popedit from "./Popedit";
import Popup from "./Popup";


export default function List(props) {
    const { items } = props ;
    console.log("component = ",items)

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isPopeditOpen, setPopeditOpen] = useState(false);
    const [itemNumber, setItemNumber] = useState();
    const [itemName, setItemName] = useState('');
    const [tranId,setTranId] = useState('');
    const [token, setToken] = useState('');

    
    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
       
      
      }, []);

    const openPopup = () => {
      setPopupOpen(true);
    
    };
  
    const closePopup = () => {
      setPopupOpen(false);
    };

    const openPopedit = () =>{
        setPopeditOpen(true)
    }

    const closePopedit = () => {
        setPopeditOpen(false)
    }


    

   

    let type
    console.log(itemName)
    console.log(itemNumber)


    return (       
       
        

           <div className="relative overflow-x-auto pl-10 pr-10">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-20 ">
                            <tr >
                            <th scope="col" className="px-6 py-3">
                                    Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Topic name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Balance
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Transaction type
                                </th>
                              
                            </tr>
                            
                            
                        </thead>
                       
                       

                       { items.length  && (<tbody>
                       
                        {items.map ((item,index) => {
                                 {console.log(item.topic_name)
                                if(item.trans_type === 1){
                                    type = "expenses"
                                    
                                }
                                else if(item.trans_type === 0)
                                    type ="income"
                                    
                                }
                                 return (
                                
                                
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                                     <td className="px-6 py-4">
                                        {index+1}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.topic_name}
                                        
                                    </th>
                                   
                                    <td className="px-6 py-4">
                                        {item.balance}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.description}
                                    </td>

                                    {type === "income" && (<td className="font-medium text-green-400 px-6 py-4">
                                        
                                        {type}
                                    </td>)}
                                    {type === "expenses" && (<td className="font-medium text-red-500 px-6 py-4">
                                        
                                        {type}
                                    </td>)}


                                    <td>
                                        <button className='bg-red-500 text-white  border-2 m-2 p-2 border-black-500 rounded-lg' type="submit" onClick={() => { setItemNumber(index+1)
                                            setItemName(item.topic_name)  
                                            setTranId(item.tran_id)  
                                            openPopup() }}>
                                       
                                         <p>delete</p>
                                        </button>
                                     
                                   </td>
                                    <td>
                                        <button className='bg-blue-500 text-white  border-2 m-2 p-2 border-black-500 rounded-lg' type="submit" onClick={() => {
                                            setItemNumber(index+1)
                                            setItemName(item.topic_name)  
                                            setTranId(item.tran_id)  
                                            openPopedit()
                                        }} >
                                           
                                            <p>Edit</p>
                                        </button>
                                    </td>
                                    
                                </tr>)
                               
                             }
                          )
                        }
                           
                          
                        </tbody>)
                          
                        }
                        
                       
                    </table>
                    <Popup  tranId = {tranId} token={token} itemNumber={itemNumber} itemName={itemName} isOpen={isPopupOpen} onClose={closePopup} />
                    <Popedit  tranId = {tranId} token={token} itemNumber={itemNumber} itemName={itemName} isOpen={isPopeditOpen} onClose={closePopedit} />
                </div>
           
        )

}