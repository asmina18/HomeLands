import { useEffect, useState, useCallback } from "react";

/**
 * 📌 useGet - Custom hook til at hente data fra et API
 * - Håndterer loading, fejl og opdatering af data
 * - Bruger token (valgfrit) til autentificerede requests
 * - Gør det nemt at genbruge API-kald i komponenter
 */
export function useGet(url, token) {
    // 📌 State til data, fejl og loading-tilstand
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    /**
     * 📌 fetchData - Funktion til at hente data fra API'et
     * - Brug af `useCallback` sikrer, at funktionen ikke ændrer sig unødvendigt
     */
    const fetchData = useCallback(async () => {
        if (!url) return; // 🚨 Undgå fejl, hvis URL mangler

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });

            // 📌 Tjek om HTTP-status er OK (200-299)
            if (!response.ok) {
                throw new Error(`Fejl: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [url, token]); // 🔹 Funktion afhænger kun af `url` og `token`

    /**
     * 📌 useEffect - Kalder fetchData, når URL eller token ændres
     */
    useEffect(() => {
        fetchData();
    }, [fetchData]); // 🔹 Sikrer, at data opdateres, hvis `url` eller `token` ændres

    /**
     * 📌 Returnerer data, fejlstatus, loading-status og en genindlæsningsfunktion
     */
    return { data, error, isLoading, fetchData };
}
