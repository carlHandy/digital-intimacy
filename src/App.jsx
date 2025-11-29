import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Smartphone, Lock, Heart, Shield, AlertTriangle, User, Users, MessageCircle } from 'lucide-react';

const StandardSlideWrapper = ({ children }) => (
  <div className="z-10 w-full max-w-6xl mx-auto px-4 md:px-8">
    {children}
  </div>
);

const SlideDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [step, setStep] = useState(0);

  // The content structure based on the TED Talk script
  const slides = [
    {
      id: 'title',
      type: 'title',
      bg: 'bg-slate-950',
      text: 'The Digital Embrace',
      sub: 'Pleasure, Pixels, and Protection',
      steps: 1
    },
    {
      id: 'story-intro',
      type: 'story',
      bg: 'bg-blue-950',
      title: "The Story of Alex",
      content: [
        { text: "Alex & Ben", style: "text-4xl md:text-6xl font-light text-white" },
        { text: "The connection was electric.", style: "text-2xl md:text-4xl text-yellow-300 mt-4 md:mt-8 animate-pulse" }
      ],
      steps: 2
    },
    {
      id: 'pixels',
      type: 'contrast',
      bg: 'bg-black',
      content: [
        { text: "Whispered in bed...", style: "text-2xl md:text-4xl text-gray-400 italic" },
        { text: "Whispered through pixels.", style: "text-4xl md:text-6xl text-blue-400 font-mono font-bold mt-8 md:mt-12" }
      ],
      steps: 2
    },
    {
      id: 'violation',
      type: 'impact',
      bg: 'bg-red-950',
      content: [
        { text: "\"Look how into me they are.\"", style: "text-xl md:text-3xl text-white italic mb-8 md:mb-12" },
        { text: "Not a crime.", style: "text-2xl md:text-4xl text-gray-400" },
        { text: "A VIOLATION.", style: "text-5xl md:text-8xl font-black text-red-500 tracking-tighter mt-4" }
      ],
      steps: 3
    },
    {
      id: 'reality',
      type: 'statement',
      bg: 'bg-indigo-950',
      content: [
        { text: "This isn't virtual reality.", style: "text-xl md:text-3xl text-gray-400" },
        { text: "This is DIGITAL INTIMACY.", style: "text-4xl md:text-7xl font-bold text-white mt-4" },
        { text: "Real. Powerful. Meaningful.", style: "text-2xl md:text-4xl text-indigo-300 mt-8 space-x-2 md:space-x-4" }
      ],
      steps: 3
    },
    {
      id: 'problem',
      type: 'split',
      bg: 'bg-slate-900',
      left: { text: "Desire", sub: "Evolving at light speed", color: "text-yellow-400" },
      right: { text: "Protection", sub: "Stuck in dial-up", color: "text-gray-500" },
      steps: 2
    },
    {
      id: 'solution-intro',
      type: 'centered',
      bg: 'bg-emerald-950',
      icon: <Shield className="text-emerald-400 mb-6 w-16 h-16 md:w-20 md:h-20" />,
      text: "The Digital Health Toolkit",
      sub: "Not to shame connection. To protect it.",
      steps: 1
    },
    {
      id: 'layer1',
      type: 'list',
      bg: 'bg-slate-900',
      title: "Layer 1: Consent",
      items: [
        "Is it okay if I send this?",
        "Are you safe to open this?",
        "Is it okay if I save this?",
        "This is just for us, right?"
      ],
      steps: 4
    },
    {
      id: 'layer2',
      type: 'visual',
      bg: 'bg-slate-800',
      title: "Layer 2: Hygiene",
      content: [
        { text: "Blur the background.", icon: <User className="inline mr-2" /> },
        { text: "Hide unique identifiers.", icon: <Lock className="inline mr-2" /> },
        { text: "Use encrypted apps.", icon: <MessageCircle className="inline mr-2" /> }
      ],
      steps: 3
    },
    {
      id: 'layer3',
      type: 'warning',
      bg: 'bg-orange-950',
      title: "Layer 3: The 'What If' Plan",
      content: [
        { text: "NCII? Don't delete. Report.", color: "text-white" },
        { text: "Sextortion? Do NOT pay.", color: "text-red-400 font-bold" },
        { text: "Shame is their weapon.", color: "text-orange-200 mt-8" },
        { text: "Silence is their power.", color: "text-orange-200" }
      ],
      steps: 4
    },
    {
      id: 'conclusion',
      type: 'final',
      bg: 'bg-gradient-to-br from-blue-900 to-purple-900',
      content: [
        { text: "Connected", style: "text-4xl md:text-6xl text-blue-300 font-bold" },
        { text: "&", style: "text-2xl md:text-4xl text-white mx-2 md:mx-4" },
        { text: "Safe", style: "text-4xl md:text-6xl text-green-300 font-bold" }
      ],
      steps: 2
    }
  ];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        prevStep();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, step]);

  const nextStep = () => {
    const currentSlideData = slides[currentSlide];
    if (step < currentSlideData.steps - 1) {
      setStep(step + 1);
    } else if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setStep(0);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    } else if (currentSlide > 0) {
      const prevSlideData = slides[currentSlide - 1];
      setCurrentSlide(currentSlide - 1);
      setStep(prevSlideData.steps - 1);
    }
  };

  const current = slides[currentSlide];

  return (
    <div className={`w-full h-screen ${current.bg} transition-colors duration-700 ease-in-out flex flex-col items-center justify-center overflow-hidden relative font-sans select-none`}>

      {/* Navigation Hint */}
      <div className="absolute bottom-8 text-white/30 text-xs md:text-sm animate-pulse px-4 text-center z-30">
        Press Right Arrow or Tap Screen to Advance
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 h-1 bg-white/20 w-full z-30">
        <div
          className="h-full bg-blue-500 transition-all duration-500"
          style={{ width: `${((currentSlide) / (slides.length - 1)) * 100}%` }}
        />
      </div>

      {/* Touch Area for Mobile (Transparent Overlay) */}
      <div className="absolute inset-0 z-0 md:hidden" onClick={nextStep}></div>

      {/* SLIDE RENDERERS */}

      {/* TITLE SLIDE */}
      {current.type === 'title' && (
        <StandardSlideWrapper>
          <div className="text-center p-4 md:p-8">
            <div className="mb-4 md:mb-6 animate-bounce text-blue-400">
              <Smartphone className="mx-auto w-12 h-12 md:w-16 md:h-16" />
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-2 md:mb-4 tracking-tight transition-all duration-1000 transform scale-100 opacity-100">
              {current.text}
            </h1>
            <p className="text-lg md:text-2xl text-gray-400 font-light tracking-widest uppercase">
              {current.sub}
            </p>
          </div>
        </StandardSlideWrapper>
      )}

      {/* STORY SLIDE */}
      {current.type === 'story' && (
        <StandardSlideWrapper>
          <div className="text-center">
            <div className={`transition-all duration-700 transform ${step >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className={current.content[0].style}>{current.content[0].text}</h2>
            </div>
            <div className={`transition-all duration-700 delay-300 transform ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <h3 className={current.content[1].style}>{current.content[1].text}</h3>
            </div>
          </div>
        </StandardSlideWrapper>
      )}

      {/* CONTRAST SLIDE (Bed vs Pixels) */}
      {current.type === 'contrast' && (
        <StandardSlideWrapper>
          <div className="text-center px-4">
            <div className={`transition-all duration-1000 absolute inset-0 flex items-center justify-center ${step === 0 ? 'opacity-100 blur-0' : 'opacity-20 blur-sm scale-90'}`}>
              <h2 className={current.content[0].style}>{current.content[0].text}</h2>
            </div>
            <div className={`transition-all duration-700 transform ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              {/* Only show this if step 1 is active */}
              {step >= 1 && <h2 className={current.content[1].style}>{current.content[1].text}</h2>}
            </div>
          </div>
        </StandardSlideWrapper>
      )}

      {/* IMPACT SLIDE (Violation) */}
      {current.type === 'impact' && (
        <StandardSlideWrapper>
          <div className="flex flex-col items-center justify-center p-4 md:p-8 text-center">
            <div className={`transition-all duration-500 ${step >= 0 ? 'opacity-100' : 'opacity-0'}`}>
              <p className={current.content[0].style}>{current.content[0].text}</p>
            </div>
            <div className={`transition-all duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
              <p className={current.content[1].style}>{current.content[1].text}</p>
            </div>
            <div className={`transition-all duration-100 transform ${step >= 2 ? 'opacity-100 scale-110' : 'opacity-0 scale-50'}`}>
              <h1 className={current.content[2].style}>{current.content[2].text}</h1>
            </div>
          </div>
        </StandardSlideWrapper>
      )}

      {/* STATEMENT SLIDE (Digital Intimacy) */}
      {current.type === 'statement' && (
        <StandardSlideWrapper>
          <div className="flex flex-col items-start px-2 md:px-24">
            <div className={`transition-all duration-700 ${step >= 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <p className={current.content[0].style}>{current.content[0].text}</p>
            </div>
            <div className={`transition-all duration-700 delay-100 ${step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h1 className={current.content[1].style}>{current.content[1].text}</h1>
            </div>
            <div className={`transition-all duration-700 delay-200 mt-4 md:mt-8 flex flex-wrap gap-2 md:gap-4 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-2xl md:text-4xl text-indigo-300 font-bold">Real.</span>
              <span className="text-2xl md:text-4xl text-purple-300 font-bold">Powerful.</span>
              <span className="text-2xl md:text-4xl text-pink-300 font-bold">Meaningful.</span>
            </div>
          </div>
        </StandardSlideWrapper>
      )}

      {/* SPLIT SLIDE (Desire vs Protection)*/}
      {current.type === 'split' && (
        <div className="flex flex-col md:flex-row w-full h-full z-10">
          <div className={`flex-1 flex flex-col items-center justify-center bg-black/20 p-4 transition-all duration-700 ${step >= 0 ? 'opacity-100' : 'opacity-0'}`}>
            <Heart className="text-yellow-500 mb-4 animate-pulse w-12 h-12 md:w-16 md:h-16" />
            <h2 className="text-3xl md:text-5xl font-bold text-yellow-400">{current.left.text}</h2>
            <p className="text-lg md:text-xl text-yellow-100 mt-2 text-center">{current.left.sub}</p>
          </div>
          <div className={`flex-1 flex flex-col items-center justify-center bg-white/5 p-4 transition-all duration-700 ${step >= 1 ? 'opacity-100' : 'opacity-10'}`}>
            <Lock className="text-gray-400 mb-4 w-12 h-12 md:w-16 md:h-16" />
            <h2 className="text-3xl md:text-5xl font-bold text-gray-400">{current.right.text}</h2>
            <p className="text-lg md:text-xl text-gray-500 mt-2 text-center">{current.right.sub}</p>
          </div>
        </div>
      )}

      {/* CENTERED ICON SLIDE (Toolkit) */}
      {current.type === 'centered' && (
        <StandardSlideWrapper>
          <div className="text-center p-4 md:p-8">
            <div className="animate-bounce flex justify-center">
              {current.icon}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">{current.text}</h2>
            <p className="text-xl md:text-2xl text-emerald-200">{current.sub}</p>
          </div>
        </StandardSlideWrapper>
      )}

      {/* LIST SLIDE (Consent) */}
      {current.type === 'list' && (
        <StandardSlideWrapper>
          <div className="max-w-4xl w-full mx-auto">
            <h2 className="text-2xl md:text-4xl text-blue-300 font-bold mb-8 md:mb-12 border-b border-blue-800 pb-4">{current.title}</h2>
            <div className="space-y-4 md:space-y-6">
              {current.items.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start md:items-center text-xl md:text-3xl text-white transition-all duration-500 transform 
                    ${step >= index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                >
                  <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-500 mr-4 md:mr-6 mt-2 md:mt-0 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </StandardSlideWrapper>
      )}

      {/* VISUAL LIST (Hygiene) */}
      {current.type === 'visual' && (
        <StandardSlideWrapper>
          <div className="max-w-4xl w-full mx-auto">
            <h2 className="text-2xl md:text-4xl text-gray-300 font-bold mb-8 md:mb-12">{current.title}</h2>
            <div className="grid gap-4 md:gap-8">
              {current.content.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 md:p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/5 transition-all duration-500
                     ${step >= index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                   `}
                >
                  <span className="text-xl md:text-3xl text-white font-light flex items-center">
                    {item.icon} {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </StandardSlideWrapper>
      )}

      {/* WARNING SLIDE (What if) */}
      {current.type === 'warning' && (
        <StandardSlideWrapper>
          <div className="text-center px-4">
            <AlertTriangle className="text-orange-500 mx-auto mb-6 md:mb-8 w-16 h-16 md:w-20 md:h-20" />
            <h2 className="text-2xl md:text-4xl font-bold text-orange-100 mb-8 md:mb-12">{current.title}</h2>

            <div className="space-y-4 md:space-y-6">
              {current.content.map((item, index) => (
                <div
                  key={index}
                  className={`text-xl md:text-3xl transition-all duration-300 ${item.color}
                    ${step >= index ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'}
                  `}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </StandardSlideWrapper>
      )}

      {/* FINAL SLIDE */}
      {current.type === 'final' && (
        <StandardSlideWrapper>
          <div className="flex items-center justify-center flex-wrap">
            <div className={`transition-all duration-1000 transform ${step >= 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
              <span className={current.content[0].style}>{current.content[0].text}</span>
            </div>
            <div className={`transition-all duration-1000 delay-200 transform ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
              <span className={current.content[1].style}>{current.content[1].text}</span>
            </div>
            <div className={`transition-all duration-1000 delay-500 transform ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
              <span className={current.content[2].style}>{current.content[2].text}</span>
            </div>
          </div>
        </StandardSlideWrapper>
      )}

      {/* Navigation Controls (Visible on hover or touch) */}
      <div className="absolute bottom-8 right-8 flex gap-4 opacity-50 hover:opacity-100 transition-opacity z-20">
        <button onClick={prevStep} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
          <ChevronLeft size={32} />
        </button>
        <button onClick={nextStep} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
          <ChevronRight size={32} />
        </button>
      </div>

    </div>
  );
};

export default SlideDeck;