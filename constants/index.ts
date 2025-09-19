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
