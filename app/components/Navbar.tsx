import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='flex items-center space-x-4'>
        <Link to='/'>
          <p className='text-gradient text-2xl font-bold'>JobMatch-AI</p>
        </Link>
      </div>
      <div className='flex items-center space-x-4'>
        <Link to='/upload' className='primary-button w-fit'>
          Importer mon CV
        </Link>
        <Link 
          to='/wipe' 
          className='flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
          title='Supprimer toutes les données'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span className='hidden sm:inline'>Supprimer les données</span>
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
