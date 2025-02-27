        "use client";

        import { Suspense, useState, useEffect } from "react";
        import { useSearchParams, useRouter } from "next/navigation";
        import Image from "next/image";

        function JoinContent() {
        const router = useRouter();
        const searchParams = useSearchParams();
        const masterclassId = searchParams.get("id"); // Get masterclass ID from URL
        
        const [masterclass, setMasterclass] = useState<any>(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);
        
        // Form state
        const [formData, setFormData] = useState({
            name: "",
            email: "",
            phone: "",
            consent: false
        });

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

        // Handle form inputs
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value, type, checked } = e.target;
            setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
            }));
        };

        // Handle form submission
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            
            if (!formData.name || !formData.email || !formData.consent) {
            alert("Please fill in all required fields and accept the terms.");
            return;
            }

            try {
            const response = await fetch('/api/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                ...formData,
                masterclassId
                }),
            });

            if (!response.ok) throw new Error("Registration failed");

            router.push(`/success?id=${masterclassId}`);
            } catch (error) {
            console.error("Registration error:", error);
            alert("Failed to register. Please try again.");
            }
        };

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
                <img src={masterclass.imageLink} alt={masterclass.title} className="w-full" />
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
                className="px-6 py-3 button mb-8"
                >
                UNISCITI ALLA MASTERCLASS!
                </button>
                <p className="text-sm text-black">
                Prendo molto seriamente la tua privacy<br /> e non condividerò mai le tue informazioni.
                </p>
            </div>
            </div>


            
        </div>
        );
        }

        export default function JoinPage() {
        return (
            <Suspense fallback={<div>Loading registration page...</div>}>
                <JoinContent />
            </Suspense>
        );
        }