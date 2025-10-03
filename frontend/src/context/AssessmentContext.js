import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AssessmentContext = createContext();

const initialState = {
  personalInfo: {
    name: '',
    company: '',
    date: new Date().toLocaleDateString()
  },
  authorityScores: {
    industryRecognition: { current: 5, goal: 8 },
    thoughtLeadership: { current: 4, goal: 9 },
    contentConsistency: { current: 3, goal: 8 },
    audienceQuality: { current: 4, goal: 9 },
    conversionScore: { current: 2, goal: 8 }
  },
  contentScores: {
    trustBuilding: 4,
    genericContent: 7,
    industryContent: 8,
    fascination: 3,
    consistency: 5
  }
};

function assessmentReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload }
      };
    case 'UPDATE_AUTHORITY_SCORE':
      return {
        ...state,
        authorityScores: {
          ...state.authorityScores,
          [action.dimension]: {
            ...state.authorityScores[action.dimension],
            [action.scoreType]: action.value
          }
        }
      };
    case 'UPDATE_CONTENT_SCORE':
      return {
        ...state,
        contentScores: {
          ...state.contentScores,
          [action.dimension]: action.value
        }
      };
    case 'LOAD_FROM_STORAGE':
      return action.payload;
    default:
      return state;
  }
}

export function AssessmentProvider({ children }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('aneka-assessment');
    if (stored) {
      try {
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: JSON.parse(stored) });
      } catch (e) {
        console.error('Failed to load assessment from storage:', e);
      }
    }
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem('aneka-assessment', JSON.stringify(state));
  }, [state]);

  return (
    <AssessmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return context;
}