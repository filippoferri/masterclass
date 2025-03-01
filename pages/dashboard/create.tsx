    // pages/dashboard/create.tsx
    import React, { useState, useEffect } from "react";
    import { useSession } from "next-auth/react";
    import { useRouter } from "next/router";
    import CodeMirror from "@uiw/react-codemirror";
    import { json } from "@codemirror/lang-json";
    import { oneDark } from "@codemirror/theme-one-dark";

    // Sample JSON to pre-populate the CodeMirror editor
    const sampleJson = `[
    {
        "time": 5,
        "type": "poll",
        "title": "What is your biggest challenge?",
        "content": "Choose one:",
        "options": ["User retention", "Conversion rates", "User engagement"],
        "results": [
            { "text": "User retention", "percentage": 40 },
            { "text": "Conversion rates", "percentage": 35 },
            { "text": "User engagement", "percentage": 25 }
        ]
        },
        {
        "time": 40,
        "type": "offer",
        "title": "🔥 Exclusive Deal!",
        "content": "https://placehold.co/600x400",
        "cta": "Get the Deal",
        "link": "#",
        "duration": 20
    }]`;

    export default function CreateMasterclass() {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Check admin status and redirect if needed
    useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated" || session?.user.role !== "ADMIN") {
        router.push("/admin");
    }
    }, [status, session, router]);

    // Form States
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [time, setTime] = useState("");
    const [duration, setDuration] = useState<number | "">("");
    const [actionGuide, setActionGuide] = useState("");
    const [topics, setTopics] = useState([""]); // At least one topic required
    const [interactions, setInteractions] = useState(JSON.stringify(JSON.parse(sampleJson), null, 2));
    const [jsonError, setJsonError] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Validate JSON helper function
    function validateJson(value: string) {
        try {
        JSON.parse(value);
        setJsonError(null);
        } catch {
        setJsonError("Invalid JSON");
        }
    }

    // CodeMirror change handler
    function handleCodeChange(value: string) {
    setInteractions(value);
    validateJson(value);
    }

    // On blur, if JSON is valid, reformat it with indentation
    function handleCodeBlur() {
    try {
            const parsed = JSON.parse(interactions);
            const formatted = JSON.stringify(parsed, null, 2);
            setInteractions(formatted);
            setJsonError(null);
        } catch {
            // Do nothing if invalid
        }
    }

    // Avoid NaN warnings on the duration input
    function handleDurationChange(e: React.ChangeEvent<HTMLInputElement>) {
        const num = e.target.valueAsNumber;
        setDuration(isNaN(num) ? "" : num * 60); // Convert minutes to seconds
    }

    if (status === "loading") {
        return <p>Loading session...</p>;
    }

    // Handle form submission
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!title || !subtitle || !videoLink || !time || !duration) {
            setError("Please fill all required fields (title, subtitle, video, time, duration).");
            return;
        }
        if (!topics[0]) {
            setError("Please provide at least one topic.");
            return;
        }
        try {
            JSON.parse(interactions);
        } catch {
            setError("Interactions must be valid JSON.");
            return;
        }

        try {
            const res = await fetch("/api/masterclasses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Ensures the session cookie is sent
            body: JSON.stringify({
                title,
                subtitle,
                videoLink,
                imageLink,
                time,
                duration: Number(duration),
                actionGuide,
                topics,
                interactions,
            }),
        });
        if (!res.ok) throw new Error("Failed to create masterclass");
            setSuccess("Masterclass created!");
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        }
    }

    // Dynamic Topics handlers
    function handleTopicChange(index: number, value: string) {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
    }

    function addTopicField() {
    setTopics((prev) => [...prev, ""]);
    }

    function removeTopicField(index: number) {
    if (topics.length === 1) return;
    const newTopics = [...topics];
    newTopics.splice(index, 1);
    setTopics(newTopics);
    }

    return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-md p-6 flex flex-row space-x-6 w-full max-w-5xl">
        {/* LEFT COLUMN: Main form fields */}
        <form onSubmit={handleSubmit} className="flex-1">
            <h1 className="text-2xl font-bold mb-4 text-center">Create Masterclass</h1>

            {error && <p className="text-red-600 mb-2">{error}</p>}
            {success && <p className="text-green-600 mb-2">{success}</p>}

            <label className="block mb-1 font-medium">Title *</label>
            <input
            className="w-full p-2 border mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />

            <label className="block mb-1 font-medium">Subtitle *</label>
            <input
            className="w-full p-2 border mb-4"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            />

            <label className="block mb-1 font-medium">Video Link *</label>
            <input
            className="w-full p-2 border mb-4"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            />

            <label className="block mb-1 font-medium">Image Link</label>
            <input
            className="w-full p-2 border mb-4"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            />

            {/* Time & Duration in the same row */}
            <div className="flex space-x-4 mb-4">
            <div className="flex-1">
                <label className="block mb-1 font-medium">Time (HH:MM) *</label>
                <input
                type="time"
                className="w-full p-2 border"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                />
            </div>
            <div className="flex-1">
                <label className="block mb-1 font-medium">Duration (minutes) *</label>
                <input
                type="number"
                className="w-full p-2 border"
                value={duration === "" ? "" : duration}
                onChange={handleDurationChange}
                />
            </div>
            </div>

            <label className="block mb-1 font-medium">Action Guide (optional PDF link)</label>
            <input
            className="w-full p-2 border mb-4"
            value={actionGuide}
            onChange={(e) => setActionGuide(e.target.value)}
            />

            {/* Dynamic Topics */}
            <label className="block mb-1 font-medium">Topics (at least 1 required)</label>
            {topics.map((topic, i) => (
            <div key={i} className="flex items-center space-x-2 mb-2">
                <input
                className="flex-1 p-2 border"
                placeholder={`Topic ${i + 1}`}
                value={topic}
                onChange={(e) => handleTopicChange(i, e.target.value)}
                />
                {topics.length > 1 && (
                <button
                    type="button"
                    onClick={() => removeTopicField(i)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                >
                    X
                </button>
                )}
            </div>
            ))}
            <button
            type="button"
            onClick={addTopicField}
            className="px-3 py-1 mb-4 bg-green-500 text-white rounded"
            >
            + Add Topic
            </button>

            {/* Save and Cancel buttons on the same line */}
            <div className="flex space-x-2 mt-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Save Masterclass
            </button>
            <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="bg-gray-300 text-black px-4 py-2 rounded"
            >
                Cancel
            </button>
            </div>
        </form>

        {/* RIGHT COLUMN: Interactions JSON Editor */}
        <div className="w-1/2 flex flex-col">
            <label className="block mb-1 font-medium">Interactions (JSON)</label>
            <CodeMirror
            value={interactions}
            height="800px"
            theme={oneDark}
            extensions={[json()]}
            onChange={handleCodeChange}
            onBlur={handleCodeBlur}
            className="border rounded"
            />
            {jsonError && <p className="text-red-500 mt-1">{jsonError}</p>}
        </div>
        </div>
    </div>
    );
    }