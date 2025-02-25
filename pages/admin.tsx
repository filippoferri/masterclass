    import { useState } from "react";
    import { signIn } from "next-auth/react";
    import { useRouter } from "next/router";

    export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        });

        if (result.error) {
        setError("Invalid credentials");
        } else {
        router.push("/dashboard");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="mb-4 text-xl font-bold">Admin Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 mb-3 border border-gray-300 rounded"
            />
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 mb-3 border border-gray-300 rounded"
            />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
        </form>
        </div>
    );
    }