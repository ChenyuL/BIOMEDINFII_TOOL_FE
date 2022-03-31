import  {useEffect, useState} from "react";
import TrieSearch from 'trie-search';
import {Form, FormControl, Dropdown, DropdownButton, FloatingLabel, InputGroup} from "react-bootstrap";
import Container from "react-bootstrap/Container";

const drugs = [
    {name: 'abacavir', PharmGKBID: 'PA448004'},
    {name: 'warfarin',  PharmGKBID: 'PA451906'},
];

const disease = [
    {name: 'alzheimer', PharmGKBID: 'PA443319'},
    {name: 'diabetes', PharmGKBID: 'PA443890'},
]


const trie = new TrieSearch(['name', 'PharmGKBID']);

trie.addAll(drugs);
trie.addAll(disease);

export default function TriedSearchBox () {
    const [search, setSearch] = useState("");
    const [completions, setCompletions] = useState([]);
    const [value, setValue] = useState("");

    useEffect(()=>{
        let autoComplete = trie.search(search);
        if (autoComplete.length > 0) {
            setCompletions(autoComplete);
        }
    }, [search]);


    const handleSubmit = (event) => {
        alert(`The name you entered was: ${event.target.value}`);
        setValue(event.target.value);
    }


    return  (
        <Form className="d-flex">
            <InputGroup className="mb-3">
                <FloatingLabel controlId="floatingSelectGrid" label="Lookup drug or disease">
                    <FormControl
                        type="input"
                        value={search}
                        className="me-1"
                        aria-label="Search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </FloatingLabel>
                <Form.Select
                    aria-label="Suggested Completion"
                    value={value}
                    onChange={(e) => {
                        handleSubmit(e.target.value);
                        console.log(e.target.value);
                        }
                    }
                >
                    {
                        completions.map((completion) => {
                            return (<option value={completion.name} > {completion.name} </option>)
                        })
                    }
                </Form.Select>
            </InputGroup>
        </Form>
    );
}


