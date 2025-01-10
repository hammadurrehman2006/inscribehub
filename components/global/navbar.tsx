import { auth, signIn, signOut } from "@/auth"
import { BadgePlus, GithubIcon, GoalIcon, LogOut, Mail } from "lucide-react";
import Create from "../ui/create";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
async function NavBar() {
    const session:any = await auth();

    return (
        <>
            <header className="px-5 py-3 shadow-sm font-work-sans">
                <nav className="flex justify-between items-center">
                    <Link href="/">
                        <Image src="/logo.png" alt="Logo" width={100} height={100} className="rounded-full" />
                    </Link>
                    <div className="flex items-center gap-14">
                        <Create session={session}/>   
                        {session && session?.user ? (
                            <>
                                <form action={async()=>{
                                    "use server"
                                    await signOut({redirectTo: "/"})}}>
                                    <button type="submit"><span className="max-sm:hidden">Logout</span>
                                    <LogOut className="sm:hidden text-enerBorn size-6"/>
                                    </button>
                                </form>
                                <Link href={`/user/${session?.user?.id}`}>
                                    <Avatar className="size-10">
                                        <AvatarImage src={session?.user?.image} alt={session?.user?.name||""}/>
                                        <AvatarFallback>
                                            {session?.user?.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Link>
                            </>
                        ) : (
                            <>
                            <div className="gap-5">
                            <form action={async () =>{
                                "use server"
                                await signIn("github")}}>
                                <button type="submit">
                                <span className="max-sm:hidden">Log In with Github</span>
                                <GithubIcon className="sm:hidden text-enerBorn size-6"/>
                                </button>
                            </form>
                            <form action={async () =>{
                                "use server"
                                await signIn("google")}}>
                                <button type="submit">
                                <span className="max-sm:hidden">Log In with Google</span>
                                <Image src="/google.svg" alt="Google" width={24} height={24} className="sm:hidden"/>
                                </button>
                            </form>
                        </div>
                                    </>
                        )}
                    </div>
                </nav>
                <ToastContainer/>
            </header>
        </>
    );
}

export default NavBar;
