from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt

import os
import pandas as pd
from dotenv import load_dotenv
from .chatbot import PharmacogenomicChatbotRAG

# 🔐 Charger les variables d'environnement (.env)
load_dotenv(dotenv_path='backend/.env')

# 📁 Initialisation des chemins
api_key = os.getenv("A4F_API_KEY")
main_excel_path = os.path.join(settings.BASE_DIR, "medicaments", "data", "chat_RAG.xlsx")
images_dir = os.path.join(settings.BASE_DIR, "medicaments", "static", "images_medicaments")

# 🤖 Initialisation du chatbot
chatbot = PharmacogenomicChatbotRAG(api_key=api_key, excel_path=main_excel_path)

# ────────────── VUES API ────────────── #

@api_view(['POST'])
def generate_notice(request):
    drug_name = request.data.get("name")
    return JsonResponse({"notice": f"Notice générée pour {drug_name}."})

@api_view(['POST'])
def check_toxicity(request):
    try:
        drug_name = request.data.get("name", "").strip().lower()
        if not drug_name:
            return JsonResponse({"error": "Nom du médicament manquant."}, status=400)

        # 🔹 Chemin vers le bon fichier
        tox_file_path = os.path.join(settings.BASE_DIR, "medicaments", "data", "fichier_medicaments_avec_images_tox.xlsx")

        # 🔹 Charger le fichier tox
        df_tox = pd.read_excel(tox_file_path).fillna("")
        df_tox['DCI'] = df_tox['DCI'].astype(str).str.strip().str.lower()
        df_tox['INN'] = df_tox['INN'].astype(str).str.strip().str.lower()

        match = df_tox[
            (df_tox['DCI'] == drug_name) |
            (df_tox['INN'] == drug_name)
        ]

        if match.empty:
            return JsonResponse({"error": "Médicament non trouvé dans la base toxicité."}, status=404)

        toxicite = match.iloc[0].get("Toxicité (%)", "")
        return JsonResponse({"toxicite": f"{toxicite}%"})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@api_view(['POST'])
def chatbot_response(request):
    question = request.data.get("message", "")
    if not question:
        return JsonResponse({"error": "Aucune question fournie"}, status=400)

    answer = chatbot.query(question)
    return JsonResponse({"response": answer})

def ping(request):
    return JsonResponse({"message": "pong"})

@csrf_exempt
def get_medicament_view(request, name):
    try:
        # 🔹 Charger les données principales
        df_main = pd.read_excel(main_excel_path).fillna("")
        df_main['DCI'] = df_main['DCI'].str.strip().str.upper()
        df_main['INN'] = df_main['INN'].str.strip()

        # 🔍 Rechercher le médicament par nom
        name = name.strip().lower()
        match = df_main[
            (df_main['DCI'].str.lower() == name) |
            (df_main['INN'].str.lower() == name)
        ]

        if match.empty:
            return JsonResponse({'error': 'Médicament non trouvé'}, status=404)

        row = match.iloc[0].to_dict()
        result = row.copy()

        # ✅ Vérifier la présence de l'image selon DCI
        dci_upper = row.get("DCI", "").strip().upper()
        image_filename = f"{dci_upper}.png"
        image_path = os.path.join(images_dir, image_filename)

        if os.path.exists(image_path):
            result['structure_image_url'] = f"/static/images_medicaments/{image_filename}"
        else:
            result['structure_image_url'] = ""

        return JsonResponse(result, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)