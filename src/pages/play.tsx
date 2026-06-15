import { Link } from "react-router-dom";
import usePlay from "../hooks/usePlay";
import { HEIGHT, WIDTH } from "../enums/data";

const Play = () => {
    const {
        canvasRef,
        score1,
        score2,
        currentPlayer
    } = usePlay();

    return (
        <div className="min-h-screen bg-[#0F172A] flex flex-col">
            <header className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-[#1E293B]">
                <div className="flex flex-col gap-1">
                    <h1 className="text-white font-bold text-lg tracking-tight">Point Paper</h1>
                    <div className="flex items-center gap-2">
                        <span
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPlayer === 1 ? "bg-red-500 shadow-[0_0_8px_#EF4444]" : "bg-[#334155]"
                                }`}
                        />
                        <span className="text-xs text-[#64748B] font-medium">
                            {currentPlayer === 1 ? "P1's turn" : "P2's turn"}
                        </span>
                        <span
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPlayer === 2 ? "bg-blue-500 shadow-[0_0_8px_#3B82F6]" : "bg-[#334155]"
                                }`}
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                    <div
                        className={`flex items-center gap-3 bg-[#1E293B] border rounded-xl px-4 py-2 transition-all duration-300 ${currentPlayer === 1 ? "border-red-500/50 shadow-[0_0_16px_rgba(239,68,68,0.15)]" : "border-[#334155]"
                            }`}
                    >
                        <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_6px_#EF4444]" />
                        <span className="text-sm font-semibold text-[#94A3B8]">P1's Score</span>
                        <span className="text-2xl font-extrabold text-red-400 font-mono">{score1}</span>
                    </div>
                    <div
                        className={`flex items-center gap-3 bg-[#1E293B] border rounded-xl px-4 py-2 transition-all duration-300 ${currentPlayer === 2 ? "border-blue-500/50 shadow-[0_0_16px_rgba(59,130,246,0.15)]" : "border-[#334155]"
                            }`}
                    >
                        <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_6px_#3B82F6]" />
                        <span className="text-sm font-semibold text-[#94A3B8]">P2's Score</span>
                        <span className="text-2xl font-extrabold text-blue-400 font-mono">{score2}</span>
                    </div>
                </div>
                <Link
                    to="/"
                    className="group flex items-center gap-1.5 text-sm font-medium text-[#64748B] hover:text-white transition-colors duration-200"
                >
                    Exit
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-200 text-base leading-none">→</span>
                </Link>
            </header>

            <div className="flex-1 flex justify-center px-2 py-6 overflow-auto">
                <canvas
                    ref={canvasRef}
                    width={WIDTH}
                    height={HEIGHT}
                    className="rounded-xl border border-[#1E293B] max-w-full"
                    style={{ cursor: "crosshair" }}
                />
            </div>
        </div>
    )
}

export default Play;