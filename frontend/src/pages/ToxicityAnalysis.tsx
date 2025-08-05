import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, AlertTriangle, Loader2 } from 'lucide-react';

const ToxicityAnalysis = () => {
  const navigate = useNavigate();
  const [drugName, setDrugName] = useState('');
  const [toxicity, setToxicity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkToxicity = async () => {
    if (!drugName.trim()) return;

    setIsLoading(true);
    setError(null);
    setToxicity(null);

    try {
      const response = await fetch('/api/toxicite/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: drugName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l’analyse.');
      }

      setToxicity(data.toxicite || 'Non disponible');
    } catch (err: any) {
      setError(err.message || 'Erreur inconnue.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') checkToxicity();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pasteur-bg/20 via-pasteur-bg/10 to-pasteur-mint/5">
      <Header />

      <main className="max-w-3xl mx-auto p-6">
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

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-pasteur-neutral/15 p-10 animate-slide-up space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-pasteur-text mb-2 bg-gradient-to-r from-pasteur-dark to-pasteur-text bg-clip-text text-transparent">
              Analyse de toxicité moléculaire
            </h1>
            <p className="text-pasteur-text/70 text-lg">
              Entrez un nom de médicament (DCI ou INN) pour évaluer sa toxicité
            </p>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              value={drugName}
              onChange={(e) => setDrugName(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ex: Abacavir"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pasteur-mint/60 text-pasteur-text shadow-sm"
            />
            <Button
              onClick={checkToxicity}
              disabled={isLoading || !drugName.trim()}
              className="px-6 py-3 rounded-lg text-white bg-pasteur-mint hover:bg-pasteur-mint/90 text-base"
            >
              {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Analyser"}
            </Button>
          </div>

          {error && (
            <Alert className="border-red-200 bg-red-50/80 animate-fade-in">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700 font-medium">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {toxicity && (
            <Card className="p-6 bg-white shadow-lg rounded-xl text-center animate-fade-in">
              <p className="text-xl text-pasteur-text mb-2 font-semibold">Toxicité mesurée :</p>
              <p className="text-5xl font-bold text-pasteur-mint">{toxicity}</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default ToxicityAnalysis;
