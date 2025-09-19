interface Tip {
  type: 'good' | 'improve';
  tip: string;
  explanation?: string;
}

export interface Resume {
  id: string;
  companyName: string;
  jobTitle: string;
  imagePath: string;
  resumePath: string;
  feedback: {
    overallScore: number;
    ATS: {
      score: number;
      tips: Tip[];
    };
    toneAndStyle: {
      score: number;
      tips: Tip[];
    };
    content: {
      score: number;
      tips: Tip[];
    };
    structure: {
      score: number;
      tips: Tip[];
    };
    skills: {
      score: number;
      tips: Tip[];
    };
  };
}

export interface KVItem {
  key: string;
  value: string;
}
