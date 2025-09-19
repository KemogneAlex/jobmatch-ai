import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter';
import { resumes } from '../../constants';
import Navbar from '../components/Navbar';
import ResumeCard from '../components/ResumeCard';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Jobmatch-ai' },
    {
      name: 'description',
      content:
        'Analyse de CV et matching intelligent grâce à l’IA. Trouvez les meilleurs talents ou décrochez l’emploi idéal.',
    },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className='main-section'>
        <div className='page-heading py-16'>
          <h1>Boostez vos candidatures avec l’IA</h1>
          <h2>Recevez un feedback instantané sur vos CV et décrochez le job de vos rêves.</h2>
        </div>

        {resumes.length > 0 && (
          <div className='resumes-section'>
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
