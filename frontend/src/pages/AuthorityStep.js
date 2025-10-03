import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Slider } from '../components/ui/slider';
import { ChevronLeft, ChevronRight, Target, Users, MessageSquare, Eye, TrendingUp } from 'lucide-react';

const dimensions = {
  industryRecognition: {
    title: 'Industry Recognition',
    icon: Target,
    question: 'How well-known are you in your industry? Do peers mention you?',
    guide: {
      '1-3': 'Unknown in industry',
      '4-6': 'Some peers know you',
      '7-8': 'Regularly mentioned/invited',
      '9-10': 'Industry thought leader'
    }
  },
  thoughtLeadership: {
    title: 'Thought Leadership',
    icon: MessageSquare,
    question: 'Do you share insights? Do you shape industry conversations?',
    guide: {
      '1-3': 'Follow others\' opinions',
      '4-6': 'Share existing ideas well',
      '7-8': 'Create original perspectives',
      '9-10': 'Shape industry conversations'
    }
  },
  contentConsistency: {
    title: 'Content Consistency',
    icon: TrendingUp,
    question: 'How consistently do you publish valuable content? Is your messaging clear?',
    guide: {
      '1-3': 'Sporadic, unclear messaging',
      '4-6': 'Regular but inconsistent quality',
      '7-8': 'Consistent quality and schedule',
      '9-10': 'Predictably excellent content'
    }
  },
  audienceQuality: {
    title: 'Audience Quality',
    icon: Users,
    question: 'How engaged is your audience? Are they your ideal customers?',
    guide: {
      '1-3': 'Random followers, low engagement',
      '4-6': 'Some ideal audience, moderate engagement',
      '7-8': 'Mostly ideal audience, good engagement',
      '9-10': 'Perfect audience, high engagement'
    }
  },
  conversionScore: {
    title: 'Conversion Score',
    icon: Eye,
    question: 'How well does your content turn followers into customers or opportunities?',
    guide: {
      '1-3': 'Content doesn\'t drive business',
      '4-6': 'Occasional leads from content',
      '7-8': 'Regular business from content',
      '9-10': 'Content is primary business driver'
    }
  }
};

const dimensionOrder = ['industryRecognition', 'thoughtLeadership', 'contentConsistency', 'audienceQuality', 'conversionScore'];

function AuthorityStep() {
  const { dimension } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useAssessment();
  
  const currentIndex = dimensionOrder.indexOf(dimension);
  const dimensionData = dimensions[dimension];
  const Icon = dimensionData?.icon;
  
  const [currentScore, setCurrentScore] = useState(state.authorityScores[dimension]?.current || 5);
  const [goalScore, setGoalScore] = useState(state.authorityScores[dimension]?.goal || 8);

  useEffect(() => {
    if (state.authorityScores[dimension]) {
      setCurrentScore(state.authorityScores[dimension].current);
      setGoalScore(state.authorityScores[dimension].goal);
    }
  }, [dimension, state.authorityScores]);

  const gap = goalScore - currentScore;

  const handleNext = () => {
    // Save current scores
    dispatch({
      type: 'UPDATE_AUTHORITY_SCORE',
      dimension,
      scoreType: 'current',
      value: currentScore
    });
    dispatch({
      type: 'UPDATE_AUTHORITY_SCORE',
      dimension,
      scoreType: 'goal',
      value: goalScore
    });

    // Navigate to next step
    const nextIndex = currentIndex + 1;
    if (nextIndex < dimensionOrder.length) {
      navigate(`/authority/${dimensionOrder[nextIndex]}`);
    } else {
      navigate('/content-strategy');
    }
  };

  const handleBack = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      navigate(`/authority/${dimensionOrder[prevIndex]}`);
    } else {
      navigate('/');
    }
  };

  if (!dimensionData) {
    return <div>Invalid dimension</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Target className="h-6 w-6 text-teal-600" />
            <span className="text-lg font-semibold text-gray-700">Aneka Labs Authority Assessment</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Authority Gap Assessment</h1>
          <p className="text-gray-600">Let's evaluate your current authority positioning across key dimensions</p>
          
          {/* Progress */}
          <div className="flex justify-center items-center space-x-2 mt-6">
            <span className="text-sm text-gray-500">{currentIndex + 1} of {dimensionOrder.length}</span>
            <div className="w-48 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / dimensionOrder.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card className="border-2 border-teal-200 shadow-lg">
          <CardHeader className="bg-teal-50 border-b border-teal-200">
            <CardTitle className="flex items-center space-x-3 text-teal-800">
              <Icon className="h-6 w-6" />
              <span>{dimensionData.title}</span>
            </CardTitle>
            <CardDescription className="text-lg text-gray-700">
              {dimensionData.question}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8">
            {/* Scoring Guide */}
            <Card className="bg-slate-50 border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg text-slate-800">Scoring Guide</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(dimensionData.guide).map(([range, description]) => (
                  <div key={range} className="flex items-start space-x-3">
                    <span className="font-semibold text-teal-600 min-w-[3rem]">{range}:</span>
                    <span className="text-gray-700">{description}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Sliders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Score */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">Current Score</h3>
                  <span className="text-2xl font-bold text-gray-900">{currentScore}</span>
                </div>
                <Slider
                  value={[currentScore]}
                  onValueChange={([value]) => setCurrentScore(value)}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>

              {/* Goal Score */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">Goal Score</h3>
                  <span className="text-2xl font-bold text-gray-900">{goalScore}</span>
                </div>
                <Slider
                  value={[goalScore]}
                  onValueChange={([value]) => setGoalScore(value)}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>
            </div>

            {/* Gap Display */}
            <div className="text-center">
              <Card className={`inline-block ${gap > 5 ? 'bg-red-50 border-red-200' : gap > 2 ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'}`}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Authority Gap</h3>
                  <div className={`text-4xl font-bold ${gap > 5 ? 'text-red-600' : gap > 2 ? 'text-yellow-600' : 'text-green-600'}`}>
                    {gap}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Goal - Current = Gap</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex items-center space-x-2 border-teal-200 text-teal-700 hover:bg-teal-50"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          
          <Button
            onClick={handleNext}
            className="bg-teal-600 hover:bg-teal-700 text-white flex items-center space-x-2"
          >
            <span>{currentIndex === dimensionOrder.length - 1 ? 'Continue to Content Strategy' : 'Next Dimension'}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AuthorityStep;