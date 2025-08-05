import requests
import pandas as pd
import os
import re

class PharmacogenomicChatbotRAG:
    def __init__(self, api_key, excel_path):
        self.api_key = api_key
        self.excel_path = excel_path
        self.api_endpoint = "https://api.a4f.co/v1/chat/completions"
        self.provider_id = "provider-6/gpt-4.1"
        self.df = pd.read_excel(self.excel_path)
        self.system_prompt = (
            "Tu es un assistant médical intelligent spécialisé en pharmacogénétique. "
            "Tu dois rédiger des réponses précises, fiables et professionnelles. "
            "Ne mentionne jamais d'où vient l'information, mais indique son degré de fiabilité."
        )
        self.history = []

        # Colonnes utilisées pour faire la recherche
        self.search_columns = [
            "DCI", "INN", "Types", "Formule", "Masse_molaire", "PGx_SMILES", "Synonymes",
            "PGx_Nom_IUPAC_Complet", "StructureImagePath", "PharmGKB Accession Id", "PGx_Name", "PGx_Type",
            "Clinical_Annotations_Count", "Genes_Involved", "Variants_Haplotypes", "Evidence_Levels",
            "Phenotypes", "Clinical_Annotation_IDs", "Alleles_Details", "Evidence_Types",
            "Evidence_Scores", "Clinical_Variants_Count", "Variant_Types"
        ]

        # Colonnes critiques à vérifier (si vides → fallback externe)
        self.critical_columns = ["Genes_Involved", "Variants_Haplotypes", "Evidence_Levels", "Phenotypes"]

    def extract_drug_name(self, question):
        match = re.search(r"(?:de|sur|concernant|pour|du|au|à propos de)\s+([A-Z0-9\-\_]+)", question, re.IGNORECASE)
        if match:
            return match.group(1).upper().strip()
        return None

    def retrieve_context(self, question):
        drug_name = self.extract_drug_name(question)
        if not drug_name:
            return None, False, "Aucune molécule extraite de la question."

        match = self.df[
            self.df.apply(
                lambda row: any(
                    drug_name in str(row[col]).upper()
                    for col in self.search_columns
                    if col in row
                ),
                axis=1
            )
        ]

        if match.empty:
            return None, False, f"Aucune donnée trouvée pour le médicament {drug_name}."

        # Conserver la première ligne trouvée
        row = match.iloc[0]

        # Vérifier si les colonnes critiques sont vides → fallback forcé
        fallback_required = any(
            (str(row[col]).strip() == "" or pd.isna(row[col]))
            for col in self.critical_columns
            if col in row
        )

        # Si toutes les données critiques sont vides → fallback
        if fallback_required:
            return None, True, None

        # Générer un contexte lisible à partir de la ligne
        context_text = "\n- " + "\n- ".join([
            f"{col} : {str(row[col]).strip()}"
            for col in self.search_columns
            if col in row and str(row[col]).strip() != ""
        ])

        return context_text, False, None

    def query(self, question):
        context, fallback, error = self.retrieve_context(question)

        if context and not fallback:
            # ✅ CONTEXTE LOCAL PRÉCIS DISPONIBLE
            user_prompt = (
                f"Voici des données contextuelles extraites :\n{context}\n\n"
                f"Réponds maintenant à la question suivante en t'appuyant uniquement sur ces données : {question}.\n"
                f"Termine ta réponse par : ✅ Les données semblent fiables et bien documentées."
            )
        else:
            # 🌐 FALLBACK EXTERNE OU DONNÉES CRITIQUES MANQUANTES
            user_prompt = (
                f"{question}\n\n"
                f"Aucune donnée pharmacogénétique complète n'a été trouvée localement. "
                f"Réponds librement en utilisant tes connaissances médicales fiables, "
                f"et indique que l'information doit être confirmée par un professionnel de santé.\n"
                f"Termine ta réponse par : ⚠️ Les informations sont générales et doivent être confirmées."
            )

        self.history.append({"role": "user", "content": user_prompt})
        messages = [{"role": "system", "content": self.system_prompt}] + self.history

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        data = {
            "model": self.provider_id,
            "messages": messages,
            "temperature": 0.3,
            "max_tokens": 800
        }

        try:
            response = requests.post(self.api_endpoint, headers=headers, json=data)
            if response.status_code == 200:
                answer = response.json()['choices'][0]['message']['content']
                self.history.append({"role": "assistant", "content": answer})
                return answer
            else:
                return f"❌ Erreur API {response.status_code} : {response.text}"
        except Exception as e:
            return f"❌ Exception lors de l'appel API : {str(e)}"
