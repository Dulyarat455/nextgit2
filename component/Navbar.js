import React from "react";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();

    return(
    // <nav>   
    <div>
        
             <div className="flex items-center">
   <h1 className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white text-4xl font-bold rounded-lg shadow-lg">
  Changing

</h1>

</div>

<br/>

        
        {/* // </nav>  */}
        </div>
    )
    }
    
export default Navbar;