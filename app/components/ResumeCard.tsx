import { Link } from 'react-router';
import ScoreCircle from './ScoreCircle';
import { usePuterStore } from '~/lib/puter';
import { useEffect, useState } from 'react';

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [imageUrl, setImageUrl] = useState('');

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
    <Link to={`/resume/${id}`} className='resume-card animate-in fade-in duration-1000'>
      <div className='resume-card-header'>
        <div className='flex flex-col gap-2'>
          <h2 className='font-bold break-words !text-black'>{companyName || 'Sans titre'}</h2>
          <h3 className='text-lg break-words text-gray-500'>{jobTitle || 'Non spécifié'}</h3>
        </div>
        <div className='flex-shrink-0'>
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
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
    </Link>
  );
};

export default ResumeCard;
