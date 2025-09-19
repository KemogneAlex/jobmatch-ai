import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/'>
        <p className='text-gradient text-2xl font-bold'>JobMatch-AI</p>
      </Link>
      <Link to='/upload' className='primary-button w-fit'>
        Importer mon CV
      </Link>
    </nav>
  );
};
export default Navbar;
