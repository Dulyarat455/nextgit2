import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-green-500 p-4">
      <ul className="flex items-center">
        <li className="mr-6">
          <Link href="/">
            <p className="text-white font-semibold">Home</p>
          </Link>
        </li>
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
        {/* Add more navigation links here */}
      </ul>
    </nav>
  );
};

export default Navbar;