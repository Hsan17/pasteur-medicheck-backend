
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ReportGenerator } from '@/components/ReportGenerator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const DrugReport = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pasteur-bg/20 via-pasteur-bg/10 to-pasteur-mint/5">
      <Header />
      
      <main className="max-w-5xl mx-auto p-6">
        <div className="mb-8 animate-fade-in">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="group border-pasteur-neutral/20 hover:border-pasteur-mint/40 hover:bg-white/80 text-pasteur-text rounded-xl px-6 py-3 transition-all duration-300 hover:shadow-lg backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Retour à l'accueil
          </Button>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-pasteur-neutral/15 p-10 animate-slide-up">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-pasteur-text mb-4 bg-gradient-to-r from-pasteur-dark to-pasteur-text bg-clip-text text-transparent">
              Générer une notice de médicament
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-pasteur-mint to-pasteur-neutral mx-auto rounded-full mb-4"></div>
            <p className="text-pasteur-text/70 text-lg">
              Obtenez des informations détaillées sur les médicaments avec structure moléculaire
            </p>
          </div>
          
          <ReportGenerator />
        </div>
      </main>
      
      {/* Background pattern amélioré */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-pasteur-mint/20 via-transparent to-pasteur-neutral/20"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pasteur-mint/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pasteur-neutral/10 rounded-full blur-3xl animate-pulse-soft delay-1000"></div>
      </div>
    </div>
  );
};

export default DrugReport;
