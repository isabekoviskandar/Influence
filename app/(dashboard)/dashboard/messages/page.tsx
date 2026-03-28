"use client";

import { useState } from "react";
import { Search, Send, Image as ImageIcon, Smile, MoreHorizontal, Check, CheckCheck, Instagram, Youtube, Send as TelegramIcon } from "lucide-react";

const PLATFORMS = {
  instagram: { icon: Instagram, color: "text-pink-500" },
  telegram: { icon: TelegramIcon, color: "text-blue-400" },
  youtube: { icon: Youtube, color: "text-red-500" },
};

const MOCK_CHATS = [
  { id: 1, name: "Aziza S.", avatar: "https://i.pravatar.cc/150?u=aziza", platform: "instagram", lastMessage: "Can you send the draft for the tech review?", time: "10:24 AM", unread: 2, online: true },
  { id: 2, name: "TechFlow UZ", avatar: "https://i.pravatar.cc/150?u=techflow", platform: "telegram", lastMessage: "The payment has been processed. Check your wallet.", time: "9:15 AM", unread: 0, online: false },
  { id: 3, name: "Jasur K.", avatar: "https://i.pravatar.cc/150?u=jasur", platform: "instagram", lastMessage: "Loved your latest video on AI studio!", time: "Yesterday", unread: 0, online: true },
  { id: 4, name: "Creative Studio", avatar: "https://i.pravatar.cc/150?u=creative", platform: "youtube", lastMessage: "New comment on your video: 'How did you do that?'", time: "Oct 20", unread: 0, online: false },
  { id: 5, name: "Marketing Pro", avatar: "https://i.pravatar.cc/150?u=market", platform: "instagram", lastMessage: "Collaboration request sent to your business email.", time: "Oct 18", unread: 0, online: true },
];

const MOCK_MESSAGES = [
  { id: 1, sender: "Aziza S.", text: "Hey! I saw your recent post about the 5 AM creative workflow.", time: "10:20 AM", own: false },
  { id: 2, sender: "Aziza S.", text: "It was really inspiring. I want to try it out too.", time: "10:21 AM", own: false },
  { id: 3, sender: "Me", text: "Thanks Aziza! It's definitely a game changer. Consistency is key.", time: "10:22 AM", own: true, read: true },
  { id: 4, sender: "Aziza S.", text: "Can you send the draft for the tech review?", time: "10:24 AM", own: false },
];

export default function MessagingInbox() {
  const [selectedChat, setSelectedChat] = useState(MOCK_CHATS[0]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const filteredChats = MOCK_CHATS.filter(chat => 
    chat.name.toLowerCase().includes(search.toLowerCase()) || 
    chat.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-[#151729] rounded-3xl border border-[#1E2035] overflow-hidden animate-in fade-in duration-500">
      <div className="flex h-full">
        
        {/* Chat List Sidebar */}
        <aside className="w-80 border-r border-[#1E2035] flex flex-col bg-[#191b26]">
          {/* Header */}
          <div className="p-6 border-b border-[#1E2035]">
            <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8FA8] w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full bg-[#0c0e18] border border-[#1E2035] rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-[#8B8FA8] focus:outline-none focus:border-[#5B3FD4] transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredChats.map((chat) => (
              <div 
                key={chat.id} 
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-[#272935] transition-colors relative ${selectedChat.id === chat.id ? "bg-[#272935]" : ""}`}
              >
                <div className="relative">
                  <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                  {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#191b26] rounded-full"></div>}
                  <div className="absolute -top-1 -left-1 bg-[#191b26] p-0.5 rounded-full">
                    {(() => {
                      const PlatformIcon = PLATFORMS[chat.platform as keyof typeof PLATFORMS].icon;
                      return <PlatformIcon className={`w-3.5 h-3.5 ${PLATFORMS[chat.platform as keyof typeof PLATFORMS].color}`} />;
                    })()}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-sm font-bold text-white truncate">{chat.name}</h3>
                    <span className="text-[10px] text-[#8B8FA8]">{chat.time}</span>
                  </div>
                  <p className="text-xs text-[#8B8FA8] truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="bg-[#5B3FD4] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {chat.unread}
                  </div>
                )}
                {selectedChat.id === chat.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5B3FD4]"></div>}
              </div>
            ))}
          </div>
        </aside>

        {/* Chat Window */}
        <main className="flex-1 flex flex-col bg-[#11131e]">
          {/* Chat Header */}
          <header className="p-4 px-6 border-b border-[#1E2035] flex items-center justify-between bg-[#191b26]">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src={selectedChat.avatar} alt={selectedChat.name} className="w-10 h-10 rounded-full object-cover" />
                {selectedChat.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#191b26] rounded-full"></div>}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{selectedChat.name}</h3>
                <p className="text-[10px] text-green-400 font-medium">{selectedChat.online ? "Online" : "Offline"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[#8B8FA8]">
              <button className="p-2 hover:text-white transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
            </div>
          </header>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-fixed opacity-80 overflow-y-auto">
            <div className="flex justify-center mb-6">
              <span className="bg-[#1E2035]/50 text-[#8B8FA8] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Today</span>
            </div>
            
            {MOCK_MESSAGES.map((msg) => (
              <div key={msg.id} className={`flex ${msg.own ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] rounded-2xl p-4 ${msg.own ? "bg-[#5B3FD4] text-white" : "bg-[#1E2035] text-[#e1e1f2]"}`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div className="flex justify-end items-center gap-1 mt-1 opacity-70">
                    <span className="text-[10px] font-medium">{msg.time}</span>
                    {msg.own && (msg.read ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <footer className="p-6 bg-[#191b26] border-t border-[#1E2035]">
            <div className="bg-[#0c0e18] border border-[#1E2035] rounded-2xl p-2 flex items-center gap-2 focus-within:border-[#5B3FD4] transition-all">
              <button className="p-2 text-[#8B8FA8] hover:text-[#c9bfff] transition-colors"><Smile className="w-5 h-5" /></button>
              <button className="p-2 text-[#8B8FA8] hover:text-[#c9bfff] transition-colors"><ImageIcon className="w-5 h-5" /></button>
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 bg-transparent border-none text-sm text-white placeholder-[#8B8FA8] focus:outline-none px-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && message && setMessage("")}
              />
              <button 
                className="bg-[#5B3FD4] hover:bg-[#4720ca] text-white p-2.5 rounded-xl transition-all active:scale-95"
                onClick={() => message && setMessage("")}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
