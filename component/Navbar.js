// components/Navbar.js
import React from "react";
import Link from 'next/link';
import { useRouter } from "next/router";

const Navbar = () => {
    const router = useRouter();
  return (
//     <div>
//     <div className="bg-green-500 p-4">
//     <div className="flex items-center">
//       <div className="mr-6">
//         <Link href="/">
//           <p className="text-white font-semibold">Home</p>
//         </Link>
//       </div>
//       <div className="mr-6">
//         <Link href="/login">
//           <p className="text-white font-semibold">Login</p>
//         </Link>
//       </div>
//       <div className="mr-6">
//         <Link href="/register">
//           <p className="text-white font-semibold">Register</p>
//         </Link>
//       </div>
//       {/* Add more navigation links here */}
//     </div>
//   </div>
//   </div>




// <nav>   
<div>
    
         <div className="flex items-center">
<h1 className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white text-4xl font-bold rounded-lg shadow-lg">
Changing
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-8 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>
</h1>

</div>

<br/>
<div className="flex items-start justify-center ">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
         onClick={() => { router.push("/physics")}}>
          Physics
        </button>
        <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        onClick={()=> {  router.push("/money");}}>
          Money
        </button>
        <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border border-gray-200   hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        onClick={()=> {  router.push("/qrcode");}}>
          QRcode
        </button>
        <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        onClick={()=> {  router.push("/temperature");}}>
          Temperature
        </button>
        
      </div>

     
</div>
    
    {/* // </nav>  */}
    </div>

  );
};

export default Navbar;
