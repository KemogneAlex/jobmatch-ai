interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor = '';
  let badgeText = '';

  if (score > 70) {
    badgeColor = 'bg-badge-green text-green-600';
    badgeText = 'Fort';
  } else if (score > 49) {
    badgeColor = 'bg-badge-yellow text-yellow-600';
    badgeText = 'Bon départ';
  } else {
    badgeColor = 'bg-badge-red text-red-600';
    badgeText = 'À améliorer';
  }

  return (
    <div className={`rounded-full px-3 py-1 ${badgeColor}`}>
      <p className='text-sm font-medium'>{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
