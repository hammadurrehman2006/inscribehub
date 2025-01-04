import { auth, signIn, signOut } from "@/auth"
import { BadgePlus, LogOut } from "lucide-react";
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
                        <Image src="/iblogo.jpg" alt="Logo" width={100} height={100} className="rounded-full" />
                    </Link>
                    <div className="flex items-center gap-14">
                        {session && session?.user ? (
                            <>
                                <Link href="/blog/create">
                                    <span className="max-sm:hidden">Create</span>
                                    <BadgePlus className="sm:hidden size-6"/>

                                </Link>
                                <form action={async()=>{
                                    "use server"
                                    await signOut({redirectTo: "/"})}}>
                                    <button type="submit"><span className="max-sm:hidden">Logout</span>
                                    <LogOut className="sm:hidden text-enerBorn size-6"/>
                                    </button>
                                </form>
                                <Link href={`/user/${session?.id}`}>
                                    <Avatar className="size-10">
                                        <AvatarImage src={session?.user?.image||""} alt={session?.user?.name||""}/>
                                        <AvatarFallback>
                                            {session?.user?.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Link>
                            </>
                        ) : (
                            <form action={async () =>{
                                "use server"
                                await signIn("github")}}>
                                <button type="submit">
                                    LogIn
                                </button>
                            </form>
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
}

export default NavBar;