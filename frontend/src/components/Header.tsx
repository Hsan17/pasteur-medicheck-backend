import React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-pasteur-bg/40 backdrop-blur-md border-b border-pasteur-neutral/20 px-6 py-5 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="group cursor-pointer" onClick={() => navigate('/')}>
              <img
                src="https://idaraty.s3.us-west-000.backblazeb2.com/logos/institut-pasteur.png"
                alt="Institut Pasteur Tunisie"
                className="h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="group cursor-pointer" onClick={() => navigate('/')}>
              <img
                src="https://lh5.googleusercontent.com/proxy/4NvCOskVDfRzvm3iAJJ-q4uClxTg1xuki1vuXYDKQCyHaEbpTMDvf3eSUH4ul2_35SOQB9SksrKnEtxIMFOKC-9RcwwEhO_fAtnlm-h3XQs"
                alt="Logo supplémentaire"
                className="h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="border-l border-pasteur-neutral/30 pl-6">
            <div className="cursor-pointer group" onClick={() => navigate('/')}>
              <h1 className="text-2xl font-bold text-pasteur-text group-hover:bg-gradient-to-r group-hover:from-pasteur-dark group-hover:to-pasteur-text group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                Assistant Médicaments
              </h1>
              <p className="text-sm text-pasteur-text/75 group-hover:text-pasteur-text/90 transition-colors duration-300">
                Information et conseil pharmaceutique
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 text-sm text-pasteur-text/70">
          <DropdownMenu>
            <DropdownMenuTrigger className="group flex items-center gap-2 hover:text-pasteur-text transition-colors duration-200 cursor-pointer bg-pasteur-mint/15 hover:bg-pasteur-mint/25 px-4 py-2 rounded-xl">
              <span className="font-medium">Liens utiles</span>
              <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 bg-white/95 backdrop-blur-sm border border-pasteur-neutral/20 shadow-2xl rounded-2xl p-2">
              <DropdownMenuItem 
                onClick={() => window.open('https://pubchem.ncbi.nlm.nih.gov/', '_blank')}
                className="group cursor-pointer hover:bg-pasteur-mint/10 px-6 py-4 rounded-xl transition-all duration-200"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-pasteur-text group-hover:text-pasteur-dark">PubChem</span>
                  <span className="text-xs text-pasteur-text/60">Base de données chimiques</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => window.open('https://www.drugbank.ca/', '_blank')}
                className="group cursor-pointer hover:bg-pasteur-mint/10 px-6 py-4 rounded-xl transition-all duration-200"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-pasteur-text group-hover:text-pasteur-dark">DrugBank</span>
                  <span className="text-xs text-pasteur-text/60">Base de données pharmaceutiques</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => window.open('https://www.who.int/medicines/', '_blank')}
                className="group cursor-pointer hover:bg-pasteur-mint/10 px-6 py-4 rounded-xl transition-all duration-200"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-pasteur-text group-hover:text-pasteur-dark">OMS - Médicaments</span>
                  <span className="text-xs text-pasteur-text/60">Références internationales</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => window.open('https://www.pharmgkb.org/', '_blank')}
                className="group cursor-pointer hover:bg-pasteur-mint/10 px-6 py-4 rounded-xl transition-all duration-200"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-pasteur-text group-hover:text-pasteur-dark">PharmaGKB</span>
                  <span className="text-xs text-pasteur-text/60">Pharmacogénomique et génétique</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => window.open('https://www.a4f.co/', '_blank')}
                className="group cursor-pointer hover:bg-pasteur-mint/10 px-6 py-4 rounded-xl transition-all duration-200"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-pasteur-text group-hover:text-pasteur-dark">A4F</span>
                  <span className="text-xs text-pasteur-text/60">Modèle IA partenaire</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => window.open('https://www.rdkit.org/', '_blank')}
                className="group cursor-pointer hover:bg-pasteur-mint/10 px-6 py-4 rounded-xl transition-all duration-200"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-pasteur-text group-hover:text-pasteur-dark">RDKit</span>
                  <span className="text-xs text-pasteur-text/60">Outils de cheminformatique</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

