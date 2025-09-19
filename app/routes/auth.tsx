import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter';

export const meta = () => [
  { title: 'JobMatch AI | Authentification' },
  { name: 'description', content: 'Connectez-vous à votre compte' },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split('next=')[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[url('/images/bg-auth.svg')] bg-cover">
      <div className='gradient-border shadow-lg'>
        <section className='flex flex-col gap-8 rounded-2xl bg-white p-10'>
          <div className='flex flex-col items-center gap-2 text-center'>
            <h1>Bienvenue</h1>
            <h2>Connectez-vous pour continuer votre recherche d'emploi</h2>
          </div>
          <div className="flex justify-center">
            {isLoading ? (
              <button className='auth-button animate-pulse'>
                <p>Connexion en cours...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className='auth-button' onClick={auth.signOut}>
                    <p>Se déconnecter</p>
                  </button>
                ) : (
                  <button className='auth-button' onClick={auth.signIn}>
                    <p>Se connecter</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
