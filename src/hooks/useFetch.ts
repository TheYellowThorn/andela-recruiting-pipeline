import { useState, useEffect, useRef } from "react";

const useFetch = <T>(url: string) => {
    // State for storing fetched data (could be any type, so we use `unknown` initially)
    const [data, setData] = useState<T | null>(null);
    
    // State for loading state
    const [isPending, setIsPending] = useState<boolean>(false);
    
    // State for error message (could be a string or null)
    const [error, setError] = useState<string | null>(null);
    
    // Ref to ensure the effect runs only once
    const effectRan = useRef<boolean>(false);

    useEffect(() => {
       
        // Prevent unnecessary fetch calls on initial render
        if (effectRan.current) return;
        
        const abortController = new AbortController();
        
        setIsPending(true);
        
        const timeoutId = setTimeout(() => {
            fetch(url, { signal: abortController.signal })
                .then((res) => {
                    if (!res.ok) {
                        throw Error("Could not fetch the data from that resource");
                    }
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                    setError(null);
                    setIsPending(false);
                })
                .catch((err) => {
                    if (err.name === "AbortError") {
                        return;
                    }
                    console.log(err.message);
                    setError(err.message);
                    setIsPending(false);
                });
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
            abortController.abort();
        };
    }, [url]); // Only re-run effect if URL changes

    return { data, isPending, error };
};

export default useFetch;
