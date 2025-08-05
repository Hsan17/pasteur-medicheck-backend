from django.urls import path
from . import views

urlpatterns = [
    path("chat/", views.chatbot_response, name="chatbot_response_alias"),  # ALIAS
    path("chatbot/", views.chatbot_response, name="chatbot_response"), 
    path("medicaments/<str:name>/", views.get_medicament_view, name="get_medicament_view"),
    path("notice/", views.generate_notice, name="generate_notice"),
    
    path("ping/", views.ping, name="ping"),
    path("toxicite/", views.check_toxicity, name="check_toxicity"),  # 🔧 Ajout de cette ligne manquante

]
