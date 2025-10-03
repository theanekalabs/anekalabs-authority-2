import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Slider } from '../components/ui/slider';
import { ChevronLeft, ChevronRight, Target, Shield, Globe, Sparkles, Clock } from 'lucide-react';
import { contentRecommendations } from '../components/mock';

const contentDimensions = {
  trustBuilding: {
    title: 'Trust-Building Content',
    icon: Shield,
    examples: [
      'Behind-the-scenes of your processes',
      'Contrarian insights with proof',
      'Frameworks that solve real problems',
      'Personal stories with lessons'
    ],
    recommendation: contentRecommendations.trustBuilding
  },
  genericContent: {
    title: 'Generic Content',
    icon: Globe,
    examples: [
      'Personal life overshare',
      'Negative rants'
    ],
    recommendation: contentRecommendations.genericContent
  },
  industryContent: {
    title: 'Industry Content',
    icon: Target,
    examples: [
      'Industry news sharing',
      'Event announcements', 
      'Company updates',
      'Reshare with commentary'
    ],
    recommendation: contentRecommendations.industryContent
  },
  fascination: {
    title: 'Fascination Content',
    icon: Sparkles,
    examples: [
      'Untold industry stories',
      'Personal stories',
      'Influential stories',
      'Sharing private desires'
    ],
    recommendation: contentRecommendations.fascination
  },
  consistency: {
    title: 'Consistency',
    icon: Clock,
    examples: [
      'Regular posting cadence',
      'Clear messaging',
      'Predictable quality'
    ],
    recommendation: contentRecommendations.consistency
  }
};

function ContentStrategy() {
  const navigate = useNavigate();
  const { state, dispatch } = useAssessment();
  const [scores, setScores] = useState(state.contentScores);

  useEffect(() => {
    setScores(state.contentScores);
  }, [state.contentScores]);

  const handleScoreChange = (dimension, value) => {
    const newScores = { ...scores, [dimension]: value };
    setScores(newScores);
    dispatch({
      type: 'UPDATE_CONTENT_SCORE',
      dimension,
      value
    });
  };

  const handleNext = () => {
    navigate('/results');
  };

  const handleBack = () => {
    navigate('/authority/conversionScore');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Target className="h-6 w-6 text-teal-600" />
            <span className="text-lg font-semibold text-gray-700">Aneka Labs Authority Assessment</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Content Strategy Assessment</h1>
          <p className="text-gray-600">Rate your content strategy across these four key dimensions on a scale of 0-10</p>
        </div>

        {/* Content Dimensions */}
        <div className="space-y-6">
          {Object.entries(contentDimensions).map(([key, dimension]) => {
            const Icon = dimension.icon;
            const score = scores[key];
            const recommendation = dimension.recommendation;
            const isGoodScore = recommendation.getColor(score) === 'text-green-600';

            return (
              <Card key={key} className="border-2 border-teal-200 shadow-lg">
                <CardHeader className="bg-teal-50 border-b border-teal-200">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-teal-800">
                      <Icon className="h-6 w-6" />
                      <span>{dimension.title}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`text-sm font-medium ${recommendation.getColor(score)}`}>
                        {recommendation.message}
                      </span>
                      <span className="text-2xl font-bold text-gray-900">{score}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                    {/* Examples */}
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold text-gray-800 mb-3">Examples:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {dimension.examples.map((example, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-teal-500 rounded-full" />
                            <span className="text-sm text-gray-600">{example}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Slider */}
                    <div className="space-y-4">
                      <Slider
                        value={[score]}
                        onValueChange={([value]) => handleScoreChange(key, value)}
                        min={0}
                        max={10}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>0</span>
                        <span>10</span>
                      </div>
                      
                      {/* Score Indicator */}
                      <div className={`text-center p-3 rounded-lg ${isGoodScore ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                        <div className={`text-sm font-medium ${recommendation.getColor(score)}`}>
                          {isGoodScore ? '✓ Good Range' : '⚠ Needs Adjustment'}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex items-center space-x-2 border-teal-200 text-teal-700 hover:bg-teal-50"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Authority Assessment</span>
          </Button>
          
          <Button
            onClick={handleNext}
            className="bg-teal-600 hover:bg-teal-700 text-white flex items-center space-x-2"
          >
            <span>View Results Summary</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ContentStrategy;