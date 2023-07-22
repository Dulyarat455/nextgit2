import React,{useEffect,useState} from "react"
import { GenerateQRCode } from "../../utils/generateQR";
import Navbar from "../../component/Navbar";

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
    <h1>11112222334455</h1>
   {test[0].ex_sample !== '' && (<h1>11111{test[0].ex_sample}</h1>)}

   {/* <h1>QR Code Generator</h1>
      <input type="text" value={inputData} onChange={handleInputChange} />
      <button onClick={handleGenerateQRCode}>Generate QR Code</button>
      {qrCodeData && (
        <div>
          <img src={qrCodeData} alt="QR Code" />
          <a href={qrCodeData} download="qrcode.png">
            Download QR Code
          </a>
        </div>
      )} */}
      {/* <div
  class="relative flex w-full flex-nowrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:flex-wrap lg:justify-start lg:py-4"
  data-te-navbar-ref>
  <div class="flex w-full flex-wrap items-center justify-between px-3">
    <div class="ml-2">
      <a class="text-xl text-neutral-800 dark:text-neutral-200" href="#"
        >Navbar</a
      >
    </div>
  
    <button
      class="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
      type="button"
      data-te-collapse-init
      data-te-target="#navbarSupportedContent3"
      aria-controls="navbarSupportedContent3"
      aria-expanded="false"
      aria-label="Toggle navigation">
      
      <span class="[&>svg]:w-7">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-7 w-7">
          <path
            fill-rule="evenodd"
            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
            clip-rule="evenodd" />
        </svg>
      </span>
    </button>

    
    <div
      class="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
      id="navbarSupportedContent3"
      data-te-collapse-item>
     
      <div
        class="list-style-none mr-auto flex flex-col pl-0 lg:mt-1 lg:flex-row"
        data-te-navbar-nav-ref>
        
        <div
          class="my-4 pl-2 lg:my-0 lg:pl-2 lg:pr-1"
          data-te-nav-item-ref>
          <a
            class="active disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
            aria-current="page"
            href="#"
            data-te-nav-link-ref
            >Home</a
          >
        </div>
   
        <div
          class="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
          data-te-nav-item-ref>
          <a
            class="p-0 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
            href="#"
            data-te-nav-link-ref
            >Features</a
          >
        </div>
      
        <div
          class="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
          data-te-nav-item-ref>
          <a
            class="p-0 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
            href="#"
            data-te-nav-link-ref
            >Pricing</a
          >
        </div>
        
        <div
          class="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
          data-te-nav-link-ref>
          <a
            class="text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
            >Disabled</a
          >
        </div>
      </div>
    </div>
  </div>
</div> */}


   </div>
  )
}
