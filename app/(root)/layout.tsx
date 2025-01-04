import NavBar from "@/components/global/navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <main className="font-work-sans">
                <NavBar/>
                {children}
            </main>
        </>
    );
}