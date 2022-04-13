// This script is in charge of all communication
import {useState, useEffect} from "react";
import {Button} from "react-bootstrap";


export default function Backend() {
    let [query, setQuery] = useState();
    let [janus, setJanus] = useState("");

    const callApi = async () => {
      const res = await fetch("http://localhost:9000/testAPI");
      setQuery(await res.text());
    }

    useEffect(() => callApi(), []);

    async function callJanusApi () {
        const res = await fetch("http://localhost:9000/query");
        setJanus(await res.text());
    }


    return (
        <div>
            <code>{query}</code>
            <Button variant="outline-dark" onClick={callJanusApi}>Janus</Button>
            <p>{janus}</p>
        </div>
    );
}
