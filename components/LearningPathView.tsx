
import React, { useState, useMemo } from 'react';
import { LearningPath, LearningStep, LearningStepType } from '../types';
import { BookOpenIcon, VideoCameraIcon, SparklesIcon, ClipboardListIcon, UserGroupIcon, LockClosedIcon, CheckCircleIcon } from './icons';

const TypeIcon = ({ type }: { type: LearningStepType }) => {
  switch (type) {
    case LearningStepType.TEXT:
      return <BookOpenIcon />;
    case LearningStepType.VIDEO:
      return <VideoCameraIcon />;
    case LearningStepType.INTERACTIVE:
        return <SparklesIcon />;
    case LearningStepType.PROJECT:
      return <ClipboardListIcon />;
    case LearningStepType.MENTORSHIP:
        return <UserGroupIcon />;
    default:
      return <BookOpenIcon />;
  }
};

const LearningStepCard: React.FC<{ step: LearningStep, isCompleted: boolean, onToggleComplete: () => void }> = ({ step, isCompleted, onToggleComplete }) => {
  return (
    <div className={`relative transition-all duration-300 transform ${isCompleted ? 'opacity-60' : ''} hover:-translate-y-1`}>
      <div className={`p-5 rounded-xl border bg-slate-800/50 ${isCompleted ? 'border-green-500/30' : 'border-slate-700'} backdrop-blur-sm`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center">
              <TypeIcon type={step.type} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100">{step.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{step.description}</p>
            </div>
          </div>
          <div className="flex flex-col items-end ml-4 flex-shrink-0">
             <span className="text-xs font-medium text-slate-500">{step.duration}</span>
             {step.isPro && (
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-2 py-1 text-xs font-semibold text-violet-400">
                    <LockClosedIcon />
                    Pro
                </span>
             )}
          </div>
        </div>
      </div>
      <button onClick={onToggleComplete} className="absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center bg-slate-800 rounded-full border border-slate-700 hover:bg-slate-700 transition-colors">
        {isCompleted ? <CheckCircleIcon /> : <div className="w-4 h-4 rounded-full border-2 border-slate-500"></div>}
      </button>
    </div>
  );
};

export const LearningPathView: React.FC<{ path: LearningPath; userName: string; onReset: () => void }> = ({ path, userName, onReset }) => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStepCompletion = (index: number) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const progress = useMemo(() => {
    if (path.steps.length === 0) return 0;
    return (completedSteps.size / path.steps.length) * 100;
  }, [completedSteps, path.steps]);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-base font-semibold text-indigo-400 tracking-wide uppercase">Your Personalized Path</h1>
        <p className="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">{path.title}</p>
        <p className="mt-5 max-w-2xl mx-auto text-xl text-slate-400">{`Here's your tailored roadmap to success, ${userName}. Let's get started!`}</p>
        <p className="mt-2 max-w-2xl mx-auto text-lg text-slate-400">{path.description}</p>
      </div>

      <div className="mt-12">
        <div className="mb-6">
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-indigo-400">Progress</span>
                <span className="text-sm font-medium text-indigo-400">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500" style={{width: `${progress}%`}}></div>
            </div>
        </div>
        <div className="space-y-6">
          {path.steps.map((step, index) => (
            <LearningStepCard 
                key={index} 
                step={step} 
                isCompleted={completedSteps.has(index)} 
                onToggleComplete={() => toggleStepCompletion(index)} 
            />
          ))}
        </div>
      </div>
      
       <div className="mt-16 text-center">
        <button onClick={onReset} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            Start a New Plan
        </button>
      </div>
    </div>
  );
};
