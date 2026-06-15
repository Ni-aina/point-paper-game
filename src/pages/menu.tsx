import { Link } from "react-router-dom";

const Menu = () => (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center px-4">
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_#EF4444]" />
                <span className="text-[#94A3B8] text-sm font-medium tracking-widest uppercase">Two Player</span>
                <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_#3B82F6]" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
                Point Paper
            </h1>
            <p className="text-[#94A3B8] text-lg max-w-sm mx-auto leading-relaxed">
                Connect 5 dots in a row - horizontally, vertically, or diagonally to score.
            </p>
        </div>

        <Link
            to="/play"
            className="group relative bg-[#1E293B] border border-[#334155] 
            rounded-2xl px-8 py-6 w-full max-w-sm hover:shadow-[0_0_24px_rgba(59,130,246,0.2)]
            transition-all duration-300"
        >
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-white">Start Game</h2>
                <span className="text-white text-2xl group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
                Take turns placing dots. First to align 5 wins the round.
            </p>
            <div className="mt-4 flex gap-4">
                <div className="inline-flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_#EF4444]" />
                    <span className="text-[#94A3B8] text-sm font-medium tracking-widest uppercase">Player 1</span>
                </div>
                <div className="inline-flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_#3B82F6]" />
                    <span className="text-[#94A3B8] text-sm font-medium tracking-widest uppercase">Player 2</span>
                </div>
            </div>
        </Link>
    </div>
)

export default Menu;