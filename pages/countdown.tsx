    "use client";

    import { useState, useEffect } from "react";
    import { useSearchParams, useRouter } from "next/navigation";
    import Link from "next/link";


    export default function Countdown() {
    const router = useRouter();
    const [video, setVideo] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);

    const searchParams = useSearchParams();
    const masterclassId = searchParams.get("id"); // Get masterclass ID from URL
            
    interface Masterclass {
        id: string;
        title: string;
        subtitle: string;
        time: string;
        topics: string[];
    }
    const [masterclass, setMasterclass] = useState<Masterclass | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch masterclass data
    useEffect(() => {
        const fetchMasterclass = async () => {
            if (!masterclassId) return;
            setLoading(true);
            try {
                const response = await fetch(`/api/masterclasses/${masterclassId}`);
                if (!response.ok) throw new Error("Failed to fetch masterclass data");
    
                const data = await response.json();
                setMasterclass(data);
                setError(null);
    
                // Only proceed if masterclass has been set
                if (!data || !data.time) return;
    
                // Calculate event time safely
                const now = new Date();
                const [hours, minutes] = data.time.split(":").map(Number);            
                const eventTime = new Date();
                eventTime.setHours(hours, minutes, 0, 0);
    
                setTimeLeft(eventTime.getTime() > now.getTime() ? (eventTime.getTime() - now.getTime()) / 1000 : null);
            } catch (err: any) {
                console.error("Error fetching masterclass data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchMasterclass();
    }, [masterclassId]);

    useEffect(() => {
        if (timeLeft !== null) {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    router.push(`/masterclass?id=${masterclassId}`);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
        }
    }, [timeLeft, router, masterclass]);

    if (!masterclass) return <p>Loading...</p>;

    // Funzione per formattare la data in italiano
    const formatDate = (time: Date) => {
        const options: Intl.DateTimeFormatOptions = { 
            weekday: "long", 
            day: "numeric", 
            month: "long", 
            year: "numeric" 
        };
        return time.toLocaleDateString("it-IT", options);
    };

    const formatTime = (time) => {
        return `${masterclass.time}`;
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Left Section: Full-Screen Image */}
        <div className="bg-cover bg-center" style={{ backgroundImage: `url("/images/bg-countdown.jpg")` }}></div>

        {/* Right Section: Content */}
        <div className="flex flex-col justify-center items-center text-left p-10 bg-white">
            <div className="max-w-lg">
                <h1 className="text-6xl font-semibold text-black mb-3 text-center">{masterclass.title}</h1>
                <h2 className="text-xl text-center">{masterclass.subtitle}</h2>

                <p className="mt-10">
                    Ciao! Stiamo per iniziare.
                    <br />
                    Sistemo le sedie, preparo gli snack, e via un ultimo check per assicurarmi che tutto sia pronto!<br />
                    Tra pochi minuti ci tufferemo insieme in un viaggio che potrebbe trasformare la tua carriera! 🔥                </p>
                                {/* Countdown */}
                                <div className="mt-6 flex flex-col items-center space-x-4 p-4 rounded-lg bg-gray-100 w-full">
                    {timeLeft !== null ? (
                    <div>
                        <div className="text-sm uppercase text-black mb-1 text-center font-bold">Inizia tra...</div>    
                        <div className="flex space-x-4 text-center">
                            <div className="text-2xl text-accent font-bold">
                                {Math.floor((timeLeft || 0) / 86400)} <span className="block text-sm text-black uppercase">Giorni</span>
                            </div>
                            <div className="text-2xl text-accent font-bold">
                                {Math.floor(((timeLeft || 0) % 86400) / 3600)} <span className="block text-sm text-black uppercase">Ore</span>
                            </div>
                            <div className="text-2xl text-accent font-bold">
                                {Math.floor(((timeLeft || 0) % 3600) / 60)} <span className="block text-sm text-black uppercase">Minuti</span>
                            </div>
                            <div className="text-2xl text-accent font-bold">
                                {Math.floor((timeLeft || 0) % 60)} <span className="block text-sm text-black uppercase">Secondi</span>
                            </div>
                        </div>
                    </div>
                    ) : (
                    <p className="text-red-600 text-center">Evento terminato!<br />
                        Rivedi la registrazione di ieri<br />
                        <Link href={`/masterclass?id=${masterclass.id}`} target="_blank">Guarda ora</Link>
                    </p>
                    )}
                </div>

                <h3 className="mt-6 text-lg font-bold">In questa masterclass:</h3>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                    {(masterclass.topics || []).map((topic, index) => (
                    <li key={index} className="text-black">
                        {topic}
                    </li>
                    ))}
                </ul>
            </div>
        </div>
        </div>
    );
    }