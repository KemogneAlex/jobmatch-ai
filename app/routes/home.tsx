import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Navbar from '~/components/Navbar';
import ResumeCard from '~/components/ResumeCard';
import { usePuterStore } from '~/lib/puter';
import { resumes as staticResumes } from '../../constants';
import type { Route } from './+types/home';

// Type local qui correspond à la structure dans constants/index.ts
interface Resume {
  id: string;
  companyName?: string;
  jobTitle?: string;
  imagePath: string;
  resumePath: string;
  feedback: {
    overallScore: number;
    ATS: {
      score: number;
      tips: any[];
    };
    toneAndStyle: {
      score: number;
      tips: any[];
    };
    content: {
      score: number;
      tips: any[];
    };
    structure: {
      score: number;
      tips: any[];
    };
    skills: {
      score: number;
      tips: any[];
    };
  };
}

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
  const { auth, kv, fs } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  
  const deleteResume = async (id: string): Promise<void> => {
    try {
      // Supprimer le CV du stockage KV
      await kv.delete(`resume:${id}`);
      
      // Mettre à jour l'état local pour refléter la suppression
      setResumes(prevResumes => prevResumes.filter(resume => resume.id !== id));
      
      // Supprimer les fichiers associés s'ils existent
      try {
        const resume = resumes.find(r => r.id === id);
        if (resume) {
          if (resume.imagePath && !resume.imagePath.startsWith('http') && !resume.imagePath.startsWith('/images/')) {
            await fs.delete(resume.imagePath).catch(console.error);
          }
          if (resume.resumePath) {
            await fs.delete(resume.resumePath).catch(console.error);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la suppression des fichiers associés :', error);
      }
      
      return;
    } catch (error) {
      console.error('Erreur lors de la suppression du CV :', error);
      throw error;
    }
  };

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      
      try {
        // Charger uniquement les CV du stockage KV
        const kvResumes = (await kv.list('resume:*', true)) as KVItem[];
        const parsedKvResumes = kvResumes?.map((resume) => JSON.parse(resume.value) as Resume) || [];
        
        // Utiliser uniquement les CV du stockage local
        setResumes(parsedKvResumes);
      } catch (error) {
        console.error('Erreur lors du chargement des CV depuis le stockage KV:', error);
        // En cas d'erreur, on n'affiche aucun CV
        setResumes([]);
      }
      
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className='main-section'>
        <div className='page-heading py-16'>
          <h1>Boostez vos candidatures avec l’IA</h1>
          {!loadingResumes && resumes?.length === 0 ? (
            <h2>Aucun CV trouvé. Téléversez votre premier CV pour obtenir un retour.</h2>
          ) : (
            <h2>Recevez un feedback instantané sur vos CV et décrochez le job de vos rêves.</h2>
          )}
        </div>
        {loadingResumes && (
          <div className='flex flex-col items-center justify-center'>
            <img src='/images/resume-scan-2.gif' className='w-[200px]' />
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className='resumes-section'>
            {resumes.map((resume) => (
              <ResumeCard 
                key={resume.id} 
                resume={resume} 
                onDelete={deleteResume}
              />
            ))}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className='mt-10 flex flex-col items-center justify-center gap-4'>
            <Link to='/upload' className='primary-button w-fit text-xl font-semibold'>
              Téléverser un CV
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
