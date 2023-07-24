import React,{useEffect,useState} from "react"
import { GenerateQRCode } from "../../utils/generateQR";
import Navbar from "@/components/Navbar";
import Link from 'next/link';

export default function Home() {
  const [test,setTest] = useState([{"ex_sample": ""
  }])
  const [qrCodeData, setQRCodeData] = useState('');
  const [inputData, setInputData] = useState('');

  
  useEffect(() => {

    
 
     
      fetch("/api/test", {
          method: "GET"
        })
        .then((res) => res.json())
        .then((data) => {
        
        console.log("data = ",data)
        setTest(data.ans)
        });

      
    
  
  }, []);

  console.log("test = ",test)
  console.log("test[0] = ",test[0].ex_sample)


  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const handleGenerateQRCode = async () => {
    const qrCodeDataUrl = await GenerateQRCode(inputData);
    setQRCodeData(qrCodeDataUrl);
  };





  return (
    <div>
      <Navbar/>
     
{/*      
    <h1>11112222334455</h1> */}
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-4 shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-4">Welcome to income and Expenses system!</h1>
        <p className="text-lg">You can start listing your account now.</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 20" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
</svg>
      
      </div>
    </div>
   {/* {test[0].ex_sample !== '' && (<h1>11111{test[0].ex_sample}</h1>)} */}

   


   </div>
  )
}
