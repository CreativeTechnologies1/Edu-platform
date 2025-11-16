
import React, { useState, useCallback } from 'react';
import { UserProfile, LearningPath } from './types';
import { SKILL_CATEGORIES } from './constants';
import { generateLearningPath } from './services/geminiService';
import { LearningPathView } from './components/LearningPathView';
import { CorporateDashboard } from './components/CorporateDashboard';

type AppStep = 'intro' | 'userInfo' | 'skills' | 'generating' | 'result';

const SkillSelector: React.FC<{ selectedSkills: Set<string>; onSkillToggle: (skill: string) => void }> = ({ selectedSkills, onSkillToggle }) => {
  return (
    <div className="space-y-8">
      {Object.entries(SKILL_CATEGORIES).map(([category, skills]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold text-indigo-400 mb-3">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => {
              const isSelected = selectedSkills.has(skill);
              return (
                <button
                  key={skill}
                  onClick={() => onSkillToggle(skill)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 border-2 ${
                    isSelected ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-slate-700/50 border-slate-600 hover:border-indigo-500'
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const Loader: React.FC = () => {
    const messages = [
        "Analyzing market trends...",
        "Mapping your unique skills...",
        "Consulting with our AI mentor...",
        "Building your personalized curriculum...",
        "Calibrating your career trajectory...",
    ];
    const [message, setMessage] = useState(messages[0]);

    React.useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % messages.length;
            setMessage(messages[index]);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center">
            <div className="relative inline-flex">
                <div className="w-16 h-16 bg-indigo-500 rounded-full"></div>
                <div className="w-16 h-16 bg-indigo-500 rounded-full absolute top-0 left-0 animate-ping"></div>
                <div className="w-16 h-16 bg-indigo-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
            </div>
            <p className="text-xl font-medium text-slate-300 mt-8 transition-opacity duration-500">{message}</p>
        </div>
    );
};


const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('intro');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    currentRole: '',
    careerGoal: '',
    skills: [],
  });
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const handleSkillToggle = (skill: string) => {
    const newSkills = new Set(userProfile.skills);
    if (newSkills.has(skill)) {
      newSkills.delete(skill);
    } else {
      newSkills.add(skill);
    }
    setUserProfile({ ...userProfile, skills: Array.from(newSkills) });
  };

  const handleSubmit = async () => {
    if (userProfile.skills.length === 0) {
        setError("Please select at least one skill.");
        return;
    }
    setError(null);
    setStep('generating');
    try {
      const path = await generateLearningPath(userProfile);
      setLearningPath(path);
      setStep('result');
    } catch (err) {
      setError((err as Error).message);
      setStep('skills'); // Go back to skills step on error
    }
  };
  
  const resetApp = () => {
    setUserProfile({ name: '', currentRole: '', careerGoal: '', skills: [] });
    setLearningPath(null);
    setError(null);
    setStep('intro');
  }

  const renderStep = () => {
    switch (step) {
      case 'intro':
        return (
            <div className="text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                    Your AI-Powered Career Co-Pilot
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-300">
                    Navigate your professional journey with a personalized upskilling plan, tailored to market trends and your unique goals.
                </p>
                <button onClick={() => setStep('userInfo')} className="mt-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105">
                    Create My Free Plan
                </button>
            </div>
        );
      case 'userInfo':
        return (
          <div className="w-full max-w-lg mx-auto">
            <h2 className="text-3xl font-bold text-center mb-2">Tell Us About Yourself</h2>
            <p className="text-center text-slate-400 mb-8">This helps us tailor your unique learning path.</p>
            <div className="space-y-6">
              <input type="text" name="name" placeholder="What's your name?" value={userProfile.name} onChange={handleProfileChange} className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
              <input type="text" name="currentRole" placeholder="Your current role (e.g., Graphic Designer)" value={userProfile.currentRole} onChange={handleProfileChange} className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
              <input type="text" name="careerGoal" placeholder="Your dream role (e.g., UX Lead)" value={userProfile.careerGoal} onChange={handleProfileChange} className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            </div>
            <button onClick={() => setStep('skills')} disabled={!userProfile.name || !userProfile.currentRole || !userProfile.careerGoal} className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed">
              Next: Select Your Skills
            </button>
          </div>
        );
      case 'skills':
        return (
          <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-2">What are you good at?</h2>
            <p className="text-center text-slate-400 mb-8">Select your existing skills. Be honest, it helps our AI!</p>
            {error && <p className="text-center text-red-400 mb-4">{error}</p>}
            <SkillSelector selectedSkills={new Set(userProfile.skills)} onSkillToggle={handleSkillToggle} />
            <div className="flex justify-between mt-8">
                <button onClick={() => setStep('userInfo')} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">Back</button>
                <button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">Generate My Path!</button>
            </div>
          </div>
        );
      case 'generating':
        return <Loader />;
      case 'result':
        return learningPath ? <LearningPathView path={learningPath} userName={userProfile.name} onReset={resetApp} /> : <p>Something went wrong.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <header className="text-center text-2xl font-bold mb-12 text-slate-300">
            AI Upskilling Platform
        </header>

        <main className="flex items-center justify-center" style={{minHeight: '60vh'}}>
          {renderStep()}
        </main>
        
        {step === 'intro' && (
            <section className="mt-24 max-w-6xl mx-auto">
                <CorporateDashboard />
            </section>
        )}

        <footer className="text-center mt-20 text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} AI Upskilling Platform. All Rights Reserved.</p>
            <div className="mt-2 space-x-4">
                <a href="#" className="hover:text-slate-300">Blog</a>
                <span>&middot;</span>
                <a href="#" className="hover:text-slate-300">For Universities</a>
                <span>&middot;</span>
                <a href="#" className="hover:text-slate-300">Contact Us</a>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
