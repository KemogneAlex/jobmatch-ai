import { Link, useNavigate } from 'react-router';
import ScoreCircle from './ScoreCircle';
import { usePuterStore } from '~/lib/puter';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath, resumePath },
  onDelete,
}: {
  resume: Resume;
  onDelete: (id: string) => Promise<void>;
}) => {
  const { fs } = usePuterStore();
  const [imageUrl, setImageUrl] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const confirmDelete = await new Promise<boolean>((resolve) => {
      toast.custom(
        (t) => (
          <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'} ring-opacity-5 pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black`}
          >
            <div className='w-0 flex-1 p-4'>
              <div className='flex items-start'>
                <div className='flex-shrink-0 pt-0.5'>
                  <svg
                    className='h-6 w-6 text-red-500'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                    />
                  </svg>
                </div>
                <div className='ml-3 flex-1'>
                  <p className='text-sm font-medium text-gray-900'>Confirmer la suppression</p>
                  <p className='mt-1 text-sm text-gray-500'>
                    Êtes-vous sûr de vouloir supprimer ce CV ? Cette action est irréversible.
                  </p>
                </div>
              </div>
            </div>
            <div className='flex border-l border-gray-200'>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(false);
                }}
                className='flex w-full cursor-pointer items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none'
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(true);
                }}
                className='flex w-full cursor-pointer items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-red-600 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none'
              >
                Supprimer
              </button>
            </div>
          </div>
        ),
        {
          duration: Infinity,
          position: 'top-center',
        }
      );
    });

    if (!confirmDelete) return;

    try {
      setIsDeleting(true);
      await onDelete(id);
      toast.success('CV supprimé avec succès', {
        duration: 3000,
        position: 'bottom-right',
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du CV :', error);
      toast.error('Une erreur est survenue lors de la suppression du CV', {
        duration: 3000,
        position: 'bottom-right',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const loadImage = async () => {
      try {
        // Si c'est une URL web ou une image statique, l'utiliser directement
        if (imagePath.startsWith('http') || imagePath.startsWith('/images/') || imagePath.startsWith('blob:')) {
          setImageUrl(imagePath);
          return;
        }
        
        // Sinon, essayer de charger depuis le stockage Puter
        const imageBlob = await fs.read(imagePath);
        if (imageBlob) {
          const url = URL.createObjectURL(imageBlob);
          setImageUrl(url);
          
          // Nettoyer l'URL lors du démontage du composant
          return () => URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'image :', error);
        // Image par défaut en cas d'erreur
        setImageUrl('/images/resume-placeholder.png');
      }
    };

    loadImage();
  }, [imagePath]);

  return (
    <div className='resume-card animate-in fade-in duration-1000 relative group'>
      <Link to={`/resume/${id}`} className='block'>
        <div className='resume-card-header'>
          <div className='flex flex-col gap-2'>
            <h2 className='font-bold break-words !text-black'>{companyName || 'Sans titre'}</h2>
            <h3 className='text-lg break-words text-gray-500'>{jobTitle || 'Non spécifié'}</h3>
          </div>
          <div className='flex-shrink-0'>
            <ScoreCircle score={feedback.overallScore} />
          </div>
        </div>
      </Link>
      
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className='absolute top-2 right-2 p-2 bg-white/80 rounded-full shadow-md hover:bg-red-50 text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 z-10'
        title='Supprimer ce CV'
      >
        {isDeleting ? (
          <svg className='w-5 h-5 animate-spin' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
          </svg>
        ) : (
          <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
          </svg>
        )}
      </button>
      <div className='gradient-border animate-in fade-in duration-1000'>
        <div className='h-[350px] w-full bg-gray-100 flex items-center justify-center max-sm:h-[200px]'>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`CV ${companyName ? `de ${companyName}` : ''}`}
              className='h-full w-full object-contain bg-white p-4'
              onError={(e) => {
                // En cas d'erreur de chargement, afficher un placeholder
                e.currentTarget.src = '/images/resume-placeholder.png';
              }}
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <p className='text-gray-400'>Chargement de l'aperçu...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;
