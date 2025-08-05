
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ChatBot } from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { FileText, FlaskConical } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pasteur-bg/20 via-pasteur-bg/10 to-pasteur-mint/5">
      <Header />
      
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-140px)]">
          {/* Chatbot principal */}
          <div className="lg:col-span-2 animate-fade-in">
            <ChatBot />
          </div>
          
          {/* Boutons de navigation */}
          <div className="lg:col-span-1 space-y-6 flex flex-col justify-center animate-slide-up">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-pasteur-neutral/15 p-8 space-y-8 hover:shadow-2xl transition-all duration-500">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-pasteur-text mb-2 bg-gradient-to-r from-pasteur-dark to-pasteur-text bg-clip-text text-transparent">
                  Outils spécialisés
                </h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-pasteur-mint to-pasteur-neutral mx-auto rounded-full"></div>
              </div>
              
              <Button
                onClick={() => navigate('/rapport-medicament')}
                className="group w-full bg-gradient-to-r from-pasteur-mint to-pasteur-mint/80 hover:from-pasteur-mint/90 hover:to-pasteur-mint/70 text-pasteur-dark border-0 rounded-2xl py-8 h-auto shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors duration-300">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">Générer une notice</div>
                    <div className="text-sm opacity-80 font-medium">de médicament</div>
                  </div>
                </div>
              </Button>

              <Button
                onClick={() => navigate('/analyse-toxicite')}
                className="group w-full bg-gradient-to-r from-pasteur-dark to-pasteur-dark/90 hover:from-pasteur-dark/90 hover:to-pasteur-dark/80 text-white border-0 rounded-2xl py-8 h-auto shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors duration-300">
                    <FlaskConical className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">Vérifier la toxicité</div>
                    <div className="text-sm opacity-80 font-medium">d'une molécule</div>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Background pattern amélioré */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-pasteur-mint/20 via-transparent to-pasteur-neutral/20"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-pasteur-mint/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pasteur-neutral/10 rounded-full blur-3xl animate-pulse-soft delay-1000"></div>
      </div>
    </div>
  );
};

export default Home;
