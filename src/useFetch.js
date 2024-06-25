import {useState, useEffect} from 'react';

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCon = new AbortController();
    
        fetch(url, {signal: abortCon.signal})
        .then(res => {
            if (!res.ok) {
                throw Error("Failed to fetch data");
            }
            return res.json();
        })
        .then(json => {
            setData(json);
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            if (err.name !== "AbortError") {
                setError(err.message);
                setIsPending(false);
            }
        });

        return () => abortCon.abort();
    }, [url]);

    return {data, isPending, error}
}
 
export default useFetch;
