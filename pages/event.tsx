    import { useState, useEffect, useRef } from "react";
    import { useSearchParams } from "next/navigation";
    import Poll from "../components/poll";
    import Offer from "../components/offer";

    export default function Event() {

        const searchParams = useSearchParams();
        const masterclassId = searchParams.get("id"); // Get masterclass ID from URL
        
        interface Masterclass {
            id: string;
            videoLink: string;
            time: string;
            duration: string;
            interactions: string;
        }
        const [masterclass, setMasterclass] = useState<Masterclass | null>(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

        const [showOverlay, setShowOverlay] = useState(true);
        const [showThankYou, setShowThankYou] = useState(false);
        const [elapsedTime, setElapsedTime] = useState(0);
        const [videoDuration, setVideoDuration] = useState(null);
        const [rating, setRating] = useState(0);
        const [activeTab, setActiveTab] = useState("chat");

        const videoRef = useRef(null);
        const timerRef = useRef(null);
        const [chatMessage, setChatMessage] = useState("");

        const [isLive, setIsLive] = useState(false);
        const [showResults, setShowResults] = useState(false);
        const [topics, setTopics] = useState([]);
        const [interactions, setInteractions] = useState<any[]>([]);
        const [activePopup, setActivePopup] = useState(null);

        // Function to check and show popups dynamically
        useEffect(() => {
            if (!interactions.length) return;

            const checkPopups = () => {
                const popupToShow = interactions.find(popup => Math.floor(popup.time) === elapsedTime);
                if (popupToShow && popupToShow !== activePopup) {
                    setActivePopup(popupToShow);

                    if (popupToShow.type === "poll") {
                        setTimeout(() => setActivePopup(null), 25000); // Show poll results for 25 seconds
                    } else {
                        setTimeout(() => setActivePopup(null), 15000); // Show offer for 15 seconds
                    }
                }
            };

            const interval = setInterval(checkPopups, 1000); // Check every second
            return () => clearInterval(interval);
        }, [elapsedTime, interactions]);

        // 🎯 **Schedule all popups when video starts**
        const handleStartVideo = () => {
            setShowOverlay(false);
            setElapsedTime(0);

            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.play().catch(() => console.warn("Autoplay blocked"));
                }
            }, 500);

            // Schedule popups immediately
            interactions.forEach((popup) => {
                setTimeout(() => {
                    setActivePopup(popup);

                    // Close popup after a duration
                    setTimeout(() => setActivePopup(null), popup.type === "poll" ? 25000 : 15000);
                }, popup.time * 1000);
            });

            if (videoDuration && !timerRef.current) {
                timerRef.current = setInterval(() => {
                    setElapsedTime((prev) => {
                        if (prev >= videoDuration) {
                            clearInterval(timerRef.current);
                            return videoDuration;
                        }
                        return prev + 1;
                    });
                }, 1000);
            }
        };

        const handleVideoEnd = () => {
            clearInterval(timerRef.current);
            timerRef.current = null; // Reset the reference
            setShowThankYou(true);
        };

        const formatTime = (seconds) => {
            const totalSeconds = Math.floor(seconds); // Ensure whole number
            const mins = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
            const secs = (totalSeconds % 60).toString().padStart(2, "0");
            return `${mins}:${secs}`;
        };

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
                setVideoDuration(data.duration);

               // Parse interactions JSON string into an array
                try {
                    const parsedInteractions = JSON.parse(data.interactions);
                    setInteractions(Array.isArray(parsedInteractions) ? parsedInteractions : []);
                } catch {
                    setInteractions([]);
                }

                setError(null);
            } catch (err: any) {
                console.error("Error fetching masterclass data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
            };

            fetchMasterclass();
        }, [masterclassId]);

        if (loading) {
            return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-xl">Loading masterclass details...</p>
            </div>
            );
        }
        
        if (error) {
            return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-red-500">
                <p className="text-xl">Error: {error}</p>
            </div>
            );
        }
        
        return (
            <div className="min-h-screen flex bg-gray-dark">
            {/* Left Section */}
            <div className="flex-1 flex justify-center items-center p-10 relative">
                {!showThankYou ? (
                <video
                    ref={videoRef}
                    src={masterclass.videoLink}
                    onEnded={handleVideoEnd}
                    className="w-full h-auto rounded-lg object-cover"
                    disablePictureInPicture
                />
                ) : (
                <div className="text-center text-white">
                    <h2 className="text-3xl font-bold">Grazie per aver partecipato! 🎉</h2>
                    <p className="mt-2 text-lg">Lascia una valutazione per aiutarmi a migliorare.</p>
                    <div className="mt-4 flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                        key={star}
                        onClick={() => setRating(star)}
                        className={`cursor-pointer text-4xl ${
                            rating >= star ? "text-yellow-500" : "text-gray-400"
                        }`}
                        >
                        ★
                        </span>
                    ))}
                    </div>
                </div>
                )}

                {showOverlay && (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
                    onClick={handleStartVideo}
                    style={{ width: "100%", height: "100%" }}
                >
                    <img
                        src="/images/placeholder.png"
                        alt="Play"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
                )}
            </div>

            {/* Sidebar Container with Dark Background */}
            <div className="w-[400px] bg-gray-dark p-4 flex flex-col">
                {/* Inner White Section */}
                <div className="w-full h-full bg-white flex flex-col rounded-lg overflow-hidden">
                {/* Timer */}
                <div className="h-[77px] flex items-center justify-center bg-gray-100 text-xl border-b">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    width={24}
                    height={24}
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span className="ml-2 w-[55px]">{formatTime(elapsedTime)}</span>
                </div>

                {/* Tabs (Chat & Q&A) */}
                <div className="flex border-b">
                    <button
                    className={`w-1/2 py-3 text-center ${
                        activeTab === "chat" ? "font-bold border-b-2 border-accent" : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("chat")}
                    >
                    Chat
                    </button>
                    <button
                    className={`w-1/2 py-3 text-center ${
                        activeTab === "qna" ? "font-bold border-b-2 border-accent" : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("qna")}
                    >
                    Q&A
                    </button>
                </div>

                {/* Chat/Q&A Content */}
                <div className="flex-1 overflow-y-auto p-4 relative">

                    {activeTab === "chat" ? (
                    <>
                    <div className="bg-[#fff6b4] rounded-lg p-4 mb-3 text-sm"> 
                        Benvenuti, questo webinar è una replica. Se hai una domanda, scrivila e inviala. Arriverà nella mia casella di posta.
                    </div>
                    <p className="text-gray-500 text-sm">Inizia la conversazione...</p>
                    </>
                    ) : (
                    <p className="text-gray-500 text-sm">Non disponibili per questa masterclass.</p>
                    )}

                    {/* Interactive Popups */}
                    {activePopup && (
                        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg">
                            {activePopup.type === "offer" ? (
                                <Offer activePopup={activePopup} closePopup={() => setActivePopup(null)} />
                            ) : (
                                <Poll activePopup={activePopup} closePopup={() => setActivePopup(null)} />
                            )}
                        </div>
                    )}

                </div>

                {/* Chat Input */}
                <div className="h-[60px] flex items-center border-t px-4 bg-[#f1f3f4] rounded-[25px] mx-[15px] mb-[15px]">
                    <input
                    type="text"
                    placeholder="Scrivi la tua domanda qui..."
                    value={chatMessage} // Bind state
                    onChange={(e) => setChatMessage(e.target.value)} // Update state on change
                    className="flex-1 bg-transparent outline-none text-black"
                    />            
                    <button
                    onClick={() => {
                        if (chatMessage.trim() !== "") {
                        // Here you can add logic to actually send the message
                        setChatMessage(""); // Clear input field
                        }
                    }}
                    className="ml-2 text-black font-bold"
                    >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="size-6"
                        width={24}
                        height={24}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    </button>
                </div>
                </div>
            </div>
            </div>
        );
    }