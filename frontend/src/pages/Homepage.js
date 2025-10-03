import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ChevronRight, Target, TrendingUp } from 'lucide-react';

function Homepage() {
  const navigate = useNavigate();
  const { state, dispatch } = useAssessment();
  const [formData, setFormData] = useState(state.personalInfo);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStartAssessment = () => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: formData
    });
    navigate('/authority/industryRecognition');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Target className="h-8 w-8 text-teal-600" />
            <h1 className="text-3xl font-bold text-gray-900">Aneka Labs</h1>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            Authority Assessment
          </h2>
          <p className="text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
            Discover your authority positioning and identify content strategy gaps that are holding back your industry influence.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="border-teal-200">
            <CardContent className="p-4 flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-teal-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Authority Gap Analysis</h3>
                <p className="text-sm text-gray-600">Identify gaps across 5 key dimensions</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-teal-200">
            <CardContent className="p-4 flex items-center space-x-3">
              <Target className="h-6 w-6 text-teal-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Content Strategy Review</h3>
                <p className="text-sm text-gray-600">Evaluate your current content approach</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form */}
        <Card className="border-2 border-teal-200 shadow-lg">
          <CardHeader className="bg-teal-50 border-b border-teal-200">
            <CardTitle className="text-teal-800">Let's Get Started</CardTitle>
            <CardDescription>
              Please provide some basic information to personalize your assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Your Name *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-gray-700 font-medium">
                Company Name *
              </Label>
              <Input
                id="company"
                type="text"
                placeholder="Enter your company name"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-gray-700 font-medium">
                Assessment Date
              </Label>
              <Input
                id="date"
                type="text"
                value={formData.date}
                readOnly
                className="border-gray-300 bg-gray-50"
              />
            </div>

            <Button
              onClick={handleStartAssessment}
              disabled={!formData.name || !formData.company}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>Start Authority Assessment</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Assessment takes 5-7 minutes to complete</p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;