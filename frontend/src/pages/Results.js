import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ChevronLeft, RotateCcw, Target, TrendingUp, Users, MessageSquare, Eye, Shield, Globe, Sparkles, Clock } from 'lucide-react';
import { calculateTotalGap, getAssessmentLevel, contentRecommendations } from '../components/mock';

const dimensionIcons = {
  industryRecognition: Target,
  thoughtLeadership: MessageSquare,
  contentConsistency: TrendingUp,
  audienceQuality: Users,
  conversionScore: Eye
};

const contentIcons = {
  trustBuilding: Shield,
  genericContent: Globe,
  industryContent: Target,
  fascination: Sparkles,
  consistency: Clock
};

const dimensionNames = {
  industryRecognition: 'Industry Recognition',
  thoughtLeadership: 'Thought Leadership',
  contentConsistency: 'Content Consistency',
  audienceQuality: 'Audience Quality',
  conversionScore: 'Conversion Score'
};

const contentNames = {
  trustBuilding: 'Trust-Building Content',
  genericContent: 'Generic Content', 
  industryContent: 'Industry Content',
  fascination: 'Fascination Content',
  consistency: 'Consistency'
};

function Results() {
  const navigate = useNavigate();
  const { state, dispatch } = useAssessment();
  
  const totalGap = calculateTotalGap(state.authorityScores);
  const assessmentLevel = getAssessmentLevel(totalGap);

  const resetAssessment = () => {
    localStorage.removeItem('aneka-assessment');
    navigate('/');
  };

  const handleBack = () => {
    navigate('/content-strategy');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Target className="h-6 w-6 text-teal-600" />
            <span className="text-lg font-semibold text-gray-700">Aneka Labs Authority Assessment</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Your Authority Gap Summary</h1>
          <div className="text-lg text-gray-600">
            <p><strong>{state.personalInfo.name}</strong> at <strong>{state.personalInfo.company}</strong></p>
            <p className="text-sm">Assessment completed on {state.personalInfo.date}</p>
          </div>
        </div>

        {/* Authority Dimensions */}
        <Card className="border-2 border-teal-200 shadow-lg">
          <CardHeader className="bg-teal-50 border-b border-teal-200">
            <CardTitle className="text-xl text-teal-800">Authority Dimensions</CardTitle>
            <CardDescription>Here's how you scored across all authority dimensions</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(state.authorityScores).map(([key, scores]) => {
                const Icon = dimensionIcons[key];
                const gap = scores.goal - scores.current;
                const gapColor = gap > 5 ? 'text-red-600 bg-red-50 border-red-200' : 
                               gap > 2 ? 'text-yellow-600 bg-yellow-50 border-yellow-200' : 
                               'text-green-600 bg-green-50 border-green-200';
                
                return (
                  <Card key={key} className="border border-gray-200">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-5 w-5 text-teal-600" />
                        <h3 className="font-semibold text-gray-800 text-sm">{dimensionNames[key]}</h3>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Current: <strong>{scores.current}</strong></span>
                        <span className="text-gray-600">Goal: <strong>{scores.goal}</strong></span>
                      </div>
                      
                      <div className={`text-center p-3 rounded-lg border ${gapColor}`}>
                        <div className="text-lg font-bold">Gap: {gap}</div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              {/* Total Gap */}
              <Card className={`border-2 ${assessmentLevel.borderColor}`}>
                <CardContent className={`p-4 ${assessmentLevel.bgColor}`}>
                  <h3 className="font-bold text-gray-800 mb-2">Total Authority Gap</h3>
                  <div className={`text-3xl font-bold ${assessmentLevel.color} mb-2`}>
                    {totalGap}
                  </div>
                  <div className={`text-sm font-medium ${assessmentLevel.color}`}>
                    {assessmentLevel.level}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Content Strategy Results */}
        <Card className="border-2 border-teal-200 shadow-lg">
          <CardHeader className="bg-teal-50 border-b border-teal-200">
            <CardTitle className="text-xl text-teal-800">Content Strategy Assessment</CardTitle>
            <CardDescription>Your content strategy scores with recommendations</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(state.contentScores).map(([key, score]) => {
                const Icon = contentIcons[key];
                const recommendation = contentRecommendations[key];
                const isGoodScore = recommendation.getColor(score) === 'text-green-600';
                
                return (
                  <Card key={key} className={`border ${isGoodScore ? 'border-green-200' : 'border-red-200'}`}>
                    <CardContent className={`p-4 ${isGoodScore ? 'bg-green-50' : 'bg-red-50'}`}>
                      <div className="flex items-center space-x-2 mb-3">
                        <Icon className="h-5 w-5 text-teal-600" />
                        <h3 className="font-semibold text-gray-800 text-sm">{contentNames[key]}</h3>
                      </div>
                      
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold text-gray-900">{score}/10</div>
                        <div className={`text-xs font-medium ${recommendation.getColor(score)}`}>
                          {recommendation.message}
                        </div>
                        <div className={`text-xs ${isGoodScore ? 'text-green-600' : 'text-red-600'}`}>
                          {isGoodScore ? '✓ Good Range' : '⚠ Needs Work'}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Overall Assessment */}
        <Card className={`border-2 ${assessmentLevel.borderColor} shadow-lg`}>
          <CardContent className={`p-8 ${assessmentLevel.bgColor} text-center space-y-4`}>
            <h2 className={`text-2xl font-bold ${assessmentLevel.color}`}>
              {assessmentLevel.level}
            </h2>
            <p className={`text-lg ${assessmentLevel.color}`}>
              {assessmentLevel.description}
            </p>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-2 border-teal-200 shadow-lg bg-gradient-to-r from-teal-50 to-teal-100">
          <CardContent className="p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold text-teal-800">
              Ready to Close Your Authority Gap?
            </h2>
            <p className="text-lg text-teal-700 max-w-2xl mx-auto">
              The path to closing your authority gap is clear: <strong>Founder-led content strategy</strong>. 
              Your personal brand and thought leadership are the keys to building the authority your business deserves.
            </p>
            
            <div className="flex justify-center space-x-4 mt-6">
              <Button
                onClick={handleBack}
                variant="outline"
                className="border-teal-200 text-teal-700 hover:bg-teal-50 flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Content Strategy</span>
              </Button>
              
              <Button
                onClick={resetAssessment}
                className="bg-teal-600 hover:bg-teal-700 text-white flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Start New Assessment</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Results;