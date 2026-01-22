const UserNavbar = ({ user }) => (
    <div className="flex items-center bg-[#E6D5B8] rounded-full px-4 py-1.5 gap-4 shadow-sm border border-white/20">
        <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#5D4037] mb-0.5">Niveau 12</span>
            <div className="w-24 h-2 bg-[#5D4037] rounded-full overflow-hidden"><div className="bg-[#7B824B] h-full w-[75%]" /></div>
        </div>
        <div className="flex flex-col items-end leading-none">
            <span className="font-bold text-[#5D4037] text-sm">{user?.displayName}</span>
            <span className="text-[10px] text-[#5D4037]/70 italic">{user?.username || "amiko_user"}</span>
        </div>
        <div className="w-9 h-9 bg-white rounded-full border-2 border-[#7B824B] flex items-center justify-center overflow-hidden">
            <span className="text-lg">👤</span>
        </div>
    </div>
);

export default UserNavbar;