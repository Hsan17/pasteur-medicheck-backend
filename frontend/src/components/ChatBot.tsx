import React, { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// 👇 Gestion dynamique de l'URL backend
const baseURL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : 'https://pasteur-medicheck-backend.onrender.com'; // 🔁 adapte si backend ailleurs

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis votre assistant médical virtuel. Posez-moi des questions sur les médicaments, les interactions ou la génétique.",
      isBot: true,
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch(`${baseURL}/api/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur ${response.status}`);
      }

      const data = await response.json();

      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.response ?? "🤖 Je n’ai pas pu générer de réponse.",
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMsg: Message = {
        id: Date.now() + 2,
        text: "❌ Une erreur est survenue lors de la connexion au serveur. Réessayez plus tard.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg border border-pasteur-neutral/20 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-pasteur-neutral/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pasteur-mint rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-pasteur-dark" />
          </div>
          <div>
            <h3 className="font-semibold text-pasteur-text">Assistant Médical</h3>
            <p className="text-sm text-pasteur-text/60">En ligne • Réponses intelligentes</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-96">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 animate-slide-up ${msg.isBot ? "justify-start" : "justify-end"}`}
          >
            {msg.isBot && (
              <div className="w-8 h-8 bg-pasteur-mint rounded-full flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-pasteur-dark" />
              </div>
            )}

            <div
              className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-wrap ${
                msg.isBot
                  ? "bg-pasteur-neutral/20 text-pasteur-text"
                  : "bg-pasteur-mint text-pasteur-dark ml-auto"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <span className="text-xs opacity-60 mt-1 block">
                {msg.timestamp.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {!msg.isBot && (
              <div className="w-8 h-8 bg-pasteur-dark rounded-full flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start animate-slide-up">
            <div className="w-8 h-8 bg-pasteur-mint rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-pasteur-dark" />
            </div>
            <div className="bg-pasteur-neutral/20 p-3 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-pasteur-text/40 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-pasteur-text/40 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-pasteur-text/40 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-pasteur-neutral/20">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Posez votre question sur les médicaments..."
            className="border-pasteur-neutral/30 focus:border-pasteur-mint focus:ring-pasteur-mint/20 rounded-lg"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-pasteur-mint hover:bg-pasteur-mint/80 text-pasteur-dark rounded-lg px-4 shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};


