// Mock data for the Aneka Labs Authority Assessment

export const mockPersonalInfo = {
  name: 'John Smith',
  company: 'Tech Innovations Inc',
  date: new Date().toLocaleDateString()
};

export const mockAuthorityScores = {
  industryRecognition: { current: 4, goal: 8 },
  thoughtLeadership: { current: 3, goal: 9 },
  contentConsistency: { current: 5, goal: 8 },
  audienceQuality: { current: 3, goal: 9 },
  conversionScore: { current: 2, goal: 8 }
};

export const mockContentScores = {
  trustBuilding: 5,
  genericContent: 7,
  industryContent: 6,
  fascination: 2,
  consistency: 4
};

// Calculate total authority gap
export const calculateTotalGap = (scores) => {
  return Object.values(scores).reduce((total, { current, goal }) => {
    return total + (goal - current);
  }, 0);
};

// Get assessment level based on total gap
export const getAssessmentLevel = (totalGap) => {
  if (totalGap <= 8) {
    return {
      level: 'Minor adjustments needed',
      description: 'Fine-tuning mode - you\'re on the right track',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    };
  } else if (totalGap <= 20) {
    return {
      level: 'Moderate changes required',
      description: 'Strategic improvements needed for authority building',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    };
  } else {
    return {
      level: 'Major transformation needed',
      description: 'Significant authority gaps require immediate attention',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    };
  }
};

// Content scoring recommendations
export const contentRecommendations = {
  trustBuilding: {
    target: 7,
    message: 'Aim for 7/10 or higher',
    getColor: (score) => score >= 7 ? 'text-green-600' : 'text-red-600'
  },
  genericContent: {
    target: 3,
    message: 'Keep at 3/10 or lower',
    getColor: (score) => score <= 3 ? 'text-green-600' : 'text-red-600'
  },
  industryContent: {
    target: 5,
    message: 'Stay around 5/10',
    getColor: (score) => Math.abs(score - 5) <= 1 ? 'text-green-600' : 'text-red-600'
  },
  fascination: {
    target: 7,
    message: 'Aim for 7/10 or higher',
    getColor: (score) => score >= 7 ? 'text-green-600' : 'text-red-600'
  },
  consistency: {
    target: 8,
    message: 'Aim for 8/10 or higher',
    getColor: (score) => score >= 8 ? 'text-green-600' : 'text-red-600'
  }
};