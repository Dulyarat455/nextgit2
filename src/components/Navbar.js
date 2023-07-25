import Link from 'next/link';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import jwt from "jsonwebtoken";


const Navbar = () => {
  const [token, setToken] = useState("");
  const [emailShow, setEmailShow] = useState("");
  const router = useRouter();
   
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    if(token){
      const decoded =   jwt.decode(token)
    const { email } = decoded || {};
      setEmailShow(email)
   
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    // window.location.reload();
    router.push("/login");
    
      
   
  };


  return (
    <nav className="bg-green-500 p-4">
      <ul className="flex items-center">
      <li className="mr-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

        </li>
        <li className="mr-6">
          <Link href="/">
            <p className="text-white font-semibold">Home</p>
          </Link>
        </li>
       { !token && (
       <>
       <li className="mr-6">
          <Link href="/login">
            <p className="text-white font-semibold">Login</p>
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/register">
            <p className="text-white font-semibold">Register</p>
          </Link>
        </li>
        </>)
      }
      { token && (
      <>
        <li className="mr-6">
          <Link href="/lists">
            <p className="text-white font-semibold">Lists</p>
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/account">
            <p className="text-white font-semibold">Add</p>
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/pagedash">
            <p className="text-white font-semibold">Dashboard</p>
          </Link>
        </li>
        <li className="mr-10">
          <Link href="" onClick={logout}>
            <p className="text-white font-semibold">Logout</p>
          </Link>
        </li>
        
        <li className="ml-15 ">
          <Link href="" >
            <p className="text-black font-semibold">Account : {emailShow}</p>
          </Link>
        </li>
        </> )   
        }
        {/* Add more navigation links here */}
      
      </ul>
      
    </nav>
  );
};

export default Navbar;