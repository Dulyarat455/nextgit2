import React,{useEffect,useState} from "react"
import { GenerateQRCode } from "../../utils/generateQR";

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
    <h1>11112222334455</h1>
   {test[0].ex_sample !== '' && (<h1>11111{test[0].ex_sample}</h1>)}

   <h1>QR Code Generator</h1>
      <input type="text" value={inputData} onChange={handleInputChange} />
      <button onClick={handleGenerateQRCode}>Generate QR Code</button>
      {qrCodeData && (
        <div>
          <img src={qrCodeData} alt="QR Code" />
          <a href={qrCodeData} download="qrcode.png">
            Download QR Code
          </a>
        </div>
      )}
   </div>
  )
}
