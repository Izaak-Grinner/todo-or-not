import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full border-b border-slate-200 bg-white px-4 h-16 flex items-center justify-between">

            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-800">
                <span>⚖️</span>
                <span>Todo or Not Todo</span>
            </Link>


        </header>
    );
}