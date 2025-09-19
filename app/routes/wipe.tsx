import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter';

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadFiles = async () => {
    try {
      const files = (await fs.readDir('./')) as FSItem[];
      setFiles(files);
    } catch (error) {
      console.error('Erreur lors du chargement des fichiers :', error);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate('/auth?next=/wipe');
    }
  }, [isLoading]);

  const handleDelete = async () => {
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
                    Êtes-vous sûr de vouloir supprimer toutes les données ? Cette action est
                    irréversible.
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
          duration: Infinity, // La modale ne disparaît pas automatiquement
          position: 'top-center',
        }
      );
    });

    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      // Supprimer les fichiers un par un
      for (const file of files) {
        try {
          await fs.delete(file.path);
        } catch (err) {
          console.error(`Erreur lors de la suppression de ${file.path}:`, err);
        }
      }

      // Vider le stockage clé-valeur
      await kv.flush();

      // Recharger la liste des fichiers
      await loadFiles();

      toast.success('Toutes les données ont été supprimées avec succès.', {
        duration: 5000,
        position: 'bottom-right',
        style: {
          background: '#f0fdf4',
          color: '#166534',
          border: '1px solid #bbf7d0',
        },
      });
    } catch (error) {
      console.error('Erreur lors de la suppression des données :', error);
      toast.error('Une erreur est survenue lors de la suppression des données.', {
        duration: 5000,
        position: 'bottom-right',
        style: {
          background: '#fef2f2',
          color: '#b91c1c',
          border: '1px solid #fecaca',
        },
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <div className='p-4'>Chargement en cours...</div>;
  }

  if (error) {
    return (
      <div className='p-4 text-red-600'>
        Erreur : {error}
        <button onClick={clearError} className='ml-4 text-blue-600 hover:underline'>
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className='container mx-auto max-w-4xl p-4'>
      <h1 className='mb-6 text-2xl font-bold'>Gestion des données</h1>

      <div className='mb-6 rounded-lg bg-gray-100 p-4'>
        <p className='font-medium'>Connecté en tant que : {auth.user?.username}</p>
      </div>

      <div className='mb-6'>
        <h2 className='mb-3 text-xl font-semibold'>Fichiers existants :</h2>
        {files.length === 0 ? (
          <p className='text-gray-500 italic'>Aucun fichier trouvé</p>
        ) : (
          <div className='overflow-hidden rounded-lg border'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase'>
                    Nom du fichier
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase'>
                    Taille
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {files.map((file) => (
                  <tr key={file.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900'>
                      {file.name}
                    </td>
                    <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-500'>
                      {file.size ? `${(file.size / 1024).toFixed(2)} Ko` : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className='border-t pt-4'>
        <h2 className='mb-3 text-xl font-semibold text-red-600'>Zone dangereuse</h2>
        <div className='rounded border-l-4 border-red-400 bg-red-50 p-4'>
          <div className='flex'>
            <div className='flex-shrink-0'>
              <svg
                className='h-5 w-5 text-red-400'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <div className='ml-3'>
              <h3 className='text-sm font-medium text-red-800'>Cette action est irréversible</h3>
              <div className='mt-2 text-sm text-red-700'>
                <p>
                  La suppression de toutes les données effacera définitivement tous les fichiers et
                  paramètres.
                </p>
              </div>
              <div className='mt-4'>
                <button
                  type='button'
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className='inline-flex cursor-pointer items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none'
                >
                  {isDeleting ? (
                    <>
                      <svg
                        className='mr-2 -ml-1 h-4 w-4 animate-spin text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        ></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                      </svg>
                      Suppression en cours...
                    </>
                  ) : (
                    'Supprimer toutes les données'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WipeApp;
