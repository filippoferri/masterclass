        "use client";

        import { Suspense, useState, useEffect } from "react";
        import { useSearchParams, useRouter } from "next/navigation";
        import Image from "next/image";

        function JoinContent() {
            const router = useRouter();
            const searchParams = useSearchParams();
            const masterclassId = searchParams.get("id"); // Get masterclass ID from URL
            
            interface Masterclass {
                id: string;
                title: string;
                subtitle: string;
                imageLink: string;
                time: string;
                topics: string[];
            }
            const [masterclass, setMasterclass] = useState<Masterclass | null>(null);
            const [loading, setLoading] = useState(true);
            const [error, setError] = useState<string | null>(null);

            const [showPopup, setShowPopup] = useState(false);
            const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility
            const togglePopup = () => setShowPopup(!showPopup);
            const toggleDropdown = () => setShowDropdown(!showDropdown);

            const [selectedOption, setSelectedOption] = useState(null); // Tracks selected option
            const [formData, setFormData] = useState({
                name: "",
                email: "",
            });

            const handleFormChange = (e) => {
                const { name, value } = e.target;
                setFormData({ ...formData, [name]: value });
            };

            // Calculate event dates and times based on video time
            const now = new Date();
            const videoDate = new Date(); // Use today's date with video time
            const [hours, minutes] = masterclass?.time?.split(":").map(Number) || [0, 0];            
            videoDate.setHours(hours, minutes, 0, 0);
            const tomorrowDate = new Date(videoDate); // Calculate tomorrow's date
            tomorrowDate.setDate(videoDate.getDate() + 1);

            //filter past events
            const options = [
                {
                id: "yesterday",
                label: "Guarda ora la registrazione di ieri",
                subtitle: "Inizia immediatamente",
                valid: true, // Always show yesterday's option
                },
                {
                id: "today",
                label: `Oggi alle ${videoDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })}`,
                subtitle: `Inizia tra ${Math.max(Math.ceil((videoDate - now) / 1000 / 60), 0)} minuti`,
                valid: videoDate > now, // Show only if the event hasn't passed
                },
                {
                id: "tomorrow",
                label: `Domani alle ${tomorrowDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })}`,
                subtitle: `Inizia tra ${Math.max(Math.ceil((tomorrowDate - now) / 1000 / 60 / 60), 0)} ore`,
                valid: true, // Always show tomorrow's option
                },
            ].filter((option) => option.valid); // Remove invalid options

            const handleRegister = async (e: React.FormEvent) => {
                e.preventDefault();
            
                if (!formData.name || !formData.email || !selectedOption) {
                    alert("Please fill in all required fields");
                    return;
                }
            
                try {
                    if (selectedOption === "yesterday") {
                        router.push(`/webinar?videoId=${masterclassId}`);
                    } else {
                        const response = await fetch("/api/sendfox", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: formData.name,
                                email: formData.email,
                                masterclassId,
                            }),
                        });
            
                        if (!response.ok) {
                            throw new Error("Failed to register user");
                        }
            
                        router.push(`/thankyou?id=${masterclassId}`);
                    }
                } catch (error) {
                    console.error("Errore nella registrazione:", error);
                    alert("Errore! Riprova.");
                }
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
                <div className="min-h-screen flex items-center justify-center bg-join-page bg-cover bg-center">
                <div className="max-w-7xl w-full px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left Column */}
                <div>
                {masterclass && (
                    <img src={masterclass.imageLink} alt={masterclass.title} className="w-full" />
                )}                
                </div>
        
                {/* Right Column */}
                <div>
                    <h1 className="text-5xl font-headings text-black mb-4">{masterclass.title}</h1>
                    <h2 className="text-l text-black mb-6">{masterclass.subtitle}</h2>
                    <hr />
                    <h3 className="mb-4 mt-8">In questa masterclass, imparerai:</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-8">
                    {(masterclass.topics || []).map((topic, index) => (
                        <li key={index} className="text-black">
                            {topic}
                        </li>
                    ))}
                    </ul>
                    <button
                        onClick={togglePopup}
                        className="px-6 py-3 button mb-8"
                    >
                    UNISCITI ALLA MASTERCLASS!
                    </button>
                    <p className="text-sm text-black">
                    Prendo molto seriamente la tua privacy<br /> e non condividerò mai le tue informazioni.
                    </p>
                </div>
                </div>

        {/* Popup */}
        {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full relative">
                {/* Popup Header */}
                <div className="bg-accent text-white p-6 rounded-t-lg flex justify-between items-center">
                    <h2 className="text-lg font-bold">Conduce: Filippo Ferri</h2>
                    <button
                        onClick={togglePopup}
                        className="text-white text-xl font-bold focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-6">

                    <h3 className="mt-4 mb-8 font-bold text-center text-2xl">
                        {masterclass.title}
                    </h3>

                    <form onSubmit={handleRegister}>
                        {/* Custom Dropdown */}
                        <div className="mb-6 mt-4 relative">
                        <div
                            className="border rounded-md px-4 py-3 cursor-pointer"
                            onClick={toggleDropdown}
                        >
                            {selectedOption ? (
                            <span>{selectedOption}</span>
                            ) : (
                            "Seleziona la data..."
                            )}
                        </div>

                        {/* Dropdown Options */}
                        {showDropdown && (
                            <div className="absolute bg-white border rounded-md mt-2 w-full shadow-lg z-10">
                            {options.map((option) => (
                                <div
                                    key={option.id}
                                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setSelectedOption(option.label);
                                        setShowDropdown(false);
                                    }}
                                >
                                <p className="font-bold">{option.label}</p>
                                <p className="text-sm text-gray-500">{option.subtitle}</p>
                                </div>
                            ))}
                            </div>
                        )}
                        </div>

                        {/* Name */}
                        <div className="mb-6">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            className="w-full border rounded-md px-4 py-3"
                            placeholder="Inserisci il tuo nome"
                            required
                        />
                        </div>

                        {/* Email */}
                        <div className="mb-6">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            className="w-full border rounded-md px-4 py-3"
                            placeholder="Inserisci la tua email"
                            required
                        />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="px-6 py-3 button"
                                onClick={() => {
                                    handleRegister
                                    setShowDropdown(false);
                                }}
                            >
                                Registrati adesso
                            </button>
                        </div>
                    </form>
                    <p className="text-sm text-black mt-8 justify-center">
                        I tuoi dati saranno utilizzati per comunicazioni in merito a questo evento e ad eventuali servizi offerti.
                    </p>
                </div>
            </div>
            </div>
        )}
                
            </div>
            );
            }

            export default JoinContent;