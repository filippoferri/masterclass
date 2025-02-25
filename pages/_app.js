    // pages/_app.tsx or pages/_app.js

    import { SessionProvider } from "next-auth/react";
    import "../styles/globals.css"; // if you have global styles

    export default function MyApp({ Component, pageProps }) {
    // Make sure we pass any "session" from pageProps to the provider
    const { session, ...rest } = pageProps;
    
    return (
        <SessionProvider session={session}>
        <Component {...rest} />
        </SessionProvider>
    );
    }