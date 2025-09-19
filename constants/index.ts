export const resumes: Resume[] = [
  {
    id: '1',
    companyName: 'Google',
    jobTitle: 'Développeur Frontend',
    imagePath: '/images/resume_01.png',
    resumePath: '/resumes/resume-1.pdf',
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: '2',
    companyName: 'Microsoft',
    jobTitle: 'Ingénieur Cloud',
    imagePath: '/images/resume_02.png',
    resumePath: '/resumes/resume-2.pdf',
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: '3',
    companyName: 'Apple',
    jobTitle: 'Développeur iOS',
    imagePath: '/images/resume_03.png',
    resumePath: '/resumes/resume-3.pdf',
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: '4',
    companyName: 'Google',
    jobTitle: 'Développeur Frontend',
    imagePath: '/images/resume_01.png',
    resumePath: '/resumes/resume-1.pdf',
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: '5',
    companyName: 'Microsoft',
    jobTitle: 'Ingénieur Cloud',
    imagePath: '/images/resume_02.png',
    resumePath: '/resumes/resume-2.pdf',
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: '6',
    companyName: 'Apple',
    jobTitle: 'Développeur iOS',
    imagePath: '/images/resume_03.png',
    resumePath: '/resumes/resume-3.pdf',
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
];
export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //score sur 100
      ATS: {
        score: number; //note basée sur la compatibilité avec les ATS
        tips: {
          type: "good" | "improve";
          tip: string; //donner 3-4 conseils
        }[];
      };
      toneAndStyle: {
        score: number; //score sur 100
        tips: {
          type: "good" | "improve";
          tip: string; //un titre court pour l'explication
          explanation: string; //explication détaillée ici
        }[]; //donner 3-4 conseils
      };
      content: {
        score: number; //score sur 100
        tips: {
          type: "good" | "improve";
          tip: string; //un titre court pour l'explication
          explanation: string; //explication détaillée ici
        }[]; //donner 3-4 conseils
      };
      structure: {
        score: number; //score sur 100
        tips: {
          type: "good" | "improve";
          tip: string; //un titre court pour l'explication
          explanation: string; //explication détaillée ici
        }[]; //donner 3-4 conseils
      };
      skills: {
        score: number; //score sur 100
        tips: {
          type: "good" | "improve";
          tip: string; //un titre court pour l'explication
          explanation: string; //explication détaillée ici
        }[]; //fournir 3-4 conseils
      };
    }`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
}: {
  jobTitle: string;
  jobDescription: string;
}) => {
  // Vérifier si l'offre d'emploi est pertinente pour un poste technique
  const isTechnicalRole = /développeur|ingénieur|programmeur|technicien|it|informatique|dev|tech/i.test(jobTitle + jobDescription);
  
  return `Vous êtes un expert en recrutement technique et en analyse de CV. Votre rôle est d'analyser objectivement la pertinence du CV par rapport au poste ciblé.

1. Analyse de pertinence (40% du score) :
   - Correspondance des compétences techniques avec le poste
   - Expérience pertinente pour le rôle
   - Formation et certifications liées au domaine

2. Structure et clarté (20% du score) :
   - Organisation logique des informations
   - Lisibilité et mise en page
   - Concision et absence de redondance

3. Réalisations concrètes (20% du score) :
   - Résultats quantifiables
   - Impact des contributions passées
   - Projets pertinents

4. Adaptation au poste (20% du score) :
   - Personnalisation pour le rôle
   - Mots-clés pertinents
   - Objectif de carrière aligné

Règles strictes d'évaluation :
- Ne donnez jamais un score supérieur à 30/100 si les compétences principales du CV ne correspondent pas au poste
- Justifiez systématiquement les points forts et les axes d'amélioration
- Soyez précis et factuel, évitez les commentaires vagues
- Tenez compte du niveau d'expérience requis pour le poste

Contexte du poste :
- Intitulé : ${jobTitle}
- Description : ${jobDescription}

Format de réponse attendu :
${AIResponseFormat}

Retournez UNIQUEMENT l'objet JSON, sans commentaires supplémentaires ni backticks.`;
};
