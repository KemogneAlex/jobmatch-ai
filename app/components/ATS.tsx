import React from 'react';

interface Suggestion {
  type: 'good' | 'improve';
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine background gradient based on score
  const gradientClass =
    score > 69 ? 'from-green-100' : score > 49 ? 'from-yellow-100' : 'from-red-100';

  // Determine icon based on score
  const iconSrc =
    score > 69
      ? '/icons/ats-good.svg'
      : score > 49
        ? '/icons/ats-warning.svg'
        : '/icons/ats-bad.svg';

  // Déterminer le sous-titre en fonction du score
  const subtitle = score > 69 ? 'Excellent !' : score > 49 ? 'Bon départ' : 'À améliorer';

  return (
    <div className={`bg-gradient-to-b ${gradientClass} w-full rounded-2xl to-white p-6 shadow-md`}>
      {/* Top section with icon and headline */}
      <div className='mb-6 flex items-center gap-4'>
        <img src={iconSrc} alt='ATS Score Icon' className='h-12 w-12' />
        <div>
          <h2 className='text-2xl font-bold'>Score ATS - {score}/100</h2>
        </div>
      </div>

      {/* Description section */}
      <div className='mb-6'>
        <h3 className='mb-2 text-xl font-semibold'>{subtitle}</h3>
        <p className='mb-4 text-gray-600'>
          Ce score représente la performance probable de votre CV dans les systèmes de suivi des
          candidatures (ATS) utilisés par les employeurs.
        </p>

        {/* Suggestions list */}
        <div className='space-y-3'>
          {suggestions.map((suggestion, index) => (
            <div key={index} className='flex items-start gap-3'>
              <img
                src={suggestion.type === 'good' ? '/icons/check.svg' : '/icons/warning.svg'}
                alt={suggestion.type === 'good' ? 'Check' : 'Warning'}
                className='mt-1 h-5 w-5'
              />
              <p className={suggestion.type === 'good' ? 'text-green-700' : 'text-amber-700'}>
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing encouragement */}
      <p className='text-gray-700 italic'>
        Continuez à peaufiner votre CV pour améliorer vos chances de passer les filtres ATS et d'être
        vu par les recruteurs.
      </p>
    </div>
  );
};

export default ATS;
