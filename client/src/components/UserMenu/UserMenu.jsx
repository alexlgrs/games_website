import React, { useState } from 'react';

const UserMenu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`
      flex flex-col items-end bg-[#E6D5B8] shadow-sm border border-white/20 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'rounded-xl w-64' : 'rounded-xl w-[240px]'}`}>
      
      <div 
        className="flex items-center justify-end w-full px-4 py-1.5 gap-4 cursor-pointer hover:bg-white/10 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-[#5D4037] mb-0.5">Niv. {user?.level || 1}</span>
          <div className="w-16 h-1.5 bg-[#5D4037]/20 rounded-full overflow-hidden">
            <div 
              className="bg-[#7B824B] h-full transition-all duration-500" 
              style={{ width: `${(user?.exp / (user?.level * 5) * 100) || 0}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col items-end leading-none">
          <span className="font-bold text-[#5D4037] text-sm whitespace-nowrap">{user?.displayName}</span>
          <span className="text-[10px] text-[#5D4037]/70 italic">@{user?.username || "amiko"}</span>
        </div>

        <div className="w-9 h-9 bg-white rounded-full border-2 border-[#7B824B] flex items-center justify-center overflow-hidden shrink-0">
          <span className="text-lg">👤</span>
        </div>
      </div>

      <div className={`
        flex flex-col gap-2 px-4 pb-4 w-full transition-all duration-300
        ${isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'}
      `}>
        <div className="h-[1px] bg-[#5D4037]/10 w-full mb-1" />
            <button className="w-full py-2 bg-white/50 text-[#5D4037] rounded-xl text-sm font-bold hover:bg-white/80 transition-colors flex items-center">
                <div className="w-[20%] flex justify-start pl-[10%] shrink-0">
                    <img src="../../assets/icons/settings_icon.png" className="w-6 h-auto" />
                </div>
                <span className="flex-1 text-center pr-[10%]">Paramètres</span>
            </button>
            
            <button className="w-full py-2 bg-white/50 text-[#5D4037] rounded-xl text-sm font-bold hover:bg-white/80 transition-colors flex items-center group">
                <div className="w-[20%] flex justify-start pl-[10%] shrink-0">
                    <img src="../../assets/icons/notifications_icon.png" className="w-5 h-auto opacity-80 group-hover:opacity-100" />
                </div>
                <span className="flex-1 text-center pr-[10%]">Notifications</span>
            </button>

            <button className="w-full py-2 bg-[#B3523E] text-white rounded-xl text-sm font-bold hover:bg-[#8D3B3B] transition-colors flex items-center">
                <span className="flex-1 text-center">Déconnexion</span>
            </button>
        </div>
    </div>
  );
};

export default UserMenu;