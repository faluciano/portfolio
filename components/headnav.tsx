import type { NextComponentType } from "next";
import { useRouter } from "next/router";

const HeadNav : NextComponentType = () => {
    const router = useRouter();
    return(
        <header className="shadow w-full">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
                <button className="flex title-font items-center font-bold hover:bg-teal-900 rounded-lg h-10 px-5 transition-colors text-lg" onClick={() => router.push('/')}>
                    Home
                </button>
                <nav className="mx-auto flex flex-wrap items-center justify-center text-lg">
                    <button className="mr-10 hover:bg-teal-900  rounded-lg h-10 px-5 transition-colors" onClick={() => router.push('/about')}>About</button>
                    <button className="mr-10 hover:bg-teal-900 rounded-lg h-10 px-5 transition-colors" onClick={() => router.push('/projects')}>Projects</button>
                    <button className="hover:bg-teal-900 rounded-lg h-10 px-5 transition-colors" onClick={() => router.push('/contact')}>Contact</button>
                </nav>
            </div>
        </header>
    );
}

export default HeadNav;