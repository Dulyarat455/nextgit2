import Link from 'next/link';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import jwt from "jsonwebtoken";


const Navbar = () => {
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    // if(!token){
    //   router.push("/login");
    // }
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
            <p className="text-white font-semibold">register</p>
          </Link>
        </li>
        </>)
      }
      { token && (
      <>
        <li className="mr-6">
          <Link href="/lists">
            <p className="text-white font-semibold">lists</p>
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/account">
            <p className="text-white font-semibold">account</p>
          </Link>
        </li>
        <li className="mr-6">
          <Link href="" onClick={logout}>
            <p className="text-white font-semibold">Logout</p>
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