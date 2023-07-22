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
        <li>
          <Link href="/register">
            <p className="text-white font-semibold">About</p>
          </Link>
        </li>
        {/* Add more navigation links here */}
      </ul>
    </nav>
  );
};

export default Navbar;