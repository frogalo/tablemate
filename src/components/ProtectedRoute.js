"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/lib/UserContext";


export default function ProtectedRoute({ children }) {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        // When on the client, check the user state
        if (user === "SignedOut") {
            // Option 1: Automatically redirect to the landing page
            router.push("/");

            // Option 2: Alternatively, you can simply render the LandingPage component:
            // setVerified(true);
        } else {
            setVerified(true);
        }
    }, [user, router]);

    // If the user is signed out, you can return null (since the router will redirect)
    // or render the LandingPage component:
    if (user === "SignedOut") return null;
    if (!verified) return null;

    return children;
}
