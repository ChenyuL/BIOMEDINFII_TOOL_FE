import  {useEffect, useState} from "react";
import TrieSearch from 'trie-search';
import {
    FormControl,
    FloatingLabel,
    InputGroup,
    Table,
    Dropdown,
    DropdownButton,
} from "react-bootstrap";

// Chenyu told me to add this
// Tanupa told me to add this

// const disease = [
//     {name: 'Noonan Syndrome', ref: "https://rarediseases.info.nih.gov/diseases/10955/noonan-syndrome"},
//     {name: 'Waardenburg Syndrome', ref: "https://rarediseases.info.nih.gov/diseases/5525/waardenburg-syndrome"},
//     {name: 'Cardiofaciocutaneous syndrome', ref: "https://rarediseases.info.nih.gov/diseases/9146/cardiofaciocutaneous-syndrome"},
//     {name: 'Congenital Pulmonary Lymphangiectasia' , ref: "https://rarediseases.info.nih.gov/diseases/9900/congenital-pulmonary-lymphangiectasia"},
//     {name: "Crohn's Disease", ref: "https://rarediseases.info.nih.gov/diseases/10232/crohns-disease"}
// ]

export default function TriedSearchBox() {
    const [search, setSearch] = useState("");
    const [completions, setCompletions] = useState({drugs: [], diseases: []});
    const [display, setDisplay] = useState(false);
    const [response, setResponse] = useState({});
    // const [headers, setHeaders] = useState([]);
    // const [value, setValue] = useState("");
    // const [data, setData] = useState([]);

    const drugs = [
        {name: 'Abacavir', PharmGKBID: 'PA448004'},
        {name: 'Warfarin', PharmGKBID: 'PA451906'},
    ];

    const disease = [
        {name: 'Cardio-facio-cutaneous Syndrome', PharmGKBID: 'PA152208657'},
        {name: 'Crohn\'s Disease', PharmGKBID: 'PA443815'},
        {name: 'Noonan\'s Syndrome', PharmGKBID: 'PA445123'},
        {name: 'Waardenburg\'s Syndrome', PharmGKBID: 'PA446058'},
        {name: 'Waardenburg\'s Syndrome', PharmGKBID: 'PA446058'},
    ]

    const drugsTrie = new TrieSearch(['name', 'PharmGKBID']);
    const diseaseTrie = new TrieSearch(['name', 'PharmGKBID']);

    diseaseTrie.addAll(disease);
    drugsTrie.addAll(drugs);

    const callDrugApi = async (drugId) => {
        console.log(drugId);
        let r = await fetch(`https://api.pharmgkb.org/v1/data/chemical/${drugId}`);
        r = await r.json();
        setResponse(r.data);
    }

    const callDiseaseApi = async (diseaseId) => {
        console.log(diseaseId);
        let r = await fetch(`https://api.pharmgkb.org/v1/data/disease/${diseaseId}?view=max`);
        r = await r.json();
        setResponse(r.data);
    }


    useEffect(() => {
        setCompletions({
            drugs: drugsTrie.search(search),
            diseases: diseaseTrie.search(search)
        });
    }, [search]); // eslint-disable-line

    useEffect(() => {
        if (response) {
            setDisplay(true);
        } else {
            setDisplay(false);
        }
    }, [response]);

    // const handleSubmit = (event) => {
    //     console.debug(event.target.value)
    //     console.debug(value);
    //     if (value) window.open(value, '_blank');
    // }

    // const handleChange = (event) => {
    //     console.debug(event.target.value, event.target.innerText)
    //     setValue(event.target.value);
    // }


    return (
        <>
            <InputGroup className="d-flex mb-12 space-around">
                <FloatingLabel controlId="floatingSelectGrid" label="Lookup drug or disease">
                    <FormControl
                        type="input"
                        value={search}
                        className="me-1"
                        aria-label="Search"
                        onInput={ (e) => {
                            // console.log(e.target.value);
                            setSearch(e.target.value);
                        }
                    }
                    />
                </FloatingLabel>
                <DropdownButton
                    variant="outline-dark"
                    drop="end"
                    title="Matches"
                    id="input-group-dropdown-2"
                    align="start"
                    size="md"
                    expand="lg"
                    // show={display}
                    // autoClose="outside"
                >
                    <Dropdown.Header> Diseases </Dropdown.Header>
                    {
                        completions.diseases?.map((completion, index) => {
                            return (<Dropdown.Item key={index} value={completion.PharmGKBID}
                                                   onClick={e => callDiseaseApi(completion.PharmGKBID)}>{completion.name}</Dropdown.Item>)
                        })
                    }
                    <Dropdown.Divider/>
                    <Dropdown.Header> Drugs </Dropdown.Header>
                    {
                        completions.drugs?.map((completion, index) => {
                            return (<Dropdown.Item key={index} value={completion.PharmGKBID}
                                                   onClick={e => callDrugApi(completion.PharmGKBID)}>{completion.name}</Dropdown.Item>)
                        })
                    }
                </DropdownButton>
            </InputGroup>
            {display && (
                <Table  striped bordered hover responsive size='sm' variant="secondary">
                    <thead>
                    <tr>
                        {
                            Object.keys(response).map((h) => {
                                return (<th> {h} </th>)
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {
                            Object.values(response).map((r, index) => {
                                if (typeof r ===  "object") {
                                    if (Array.isArray(r)) {
                                        return (<td key={index}>
                                            <ul>
                                                {r.map((item) => (<li>{JSON.stringify(item)}</li>))}
                                            </ul>
                                        </td>);

                                    } else {
                                        return (<td key={index}> {JSON.stringify(r, undefined, 2)} </td>);
                                    }

                                } else {
                                    return (<td key={index}> {r} </td>);
                                }

                            })
                        }
                    </tr>
                    </tbody>
                </Table>
            )}
        </>
    );
};

// {/*<>*/}
// {/*    <Form className="d-flex" onSubmit={(event) => handleSubmit(event)}>*/}
// {/*        <InputGroup className="mb-3">*/}
//
// {/*                <FormControl*/}
// {/*                    type="input"*/}
// {/*                    value={search}*/}
// {/*                    className="me-1"*/}
// {/*                    aria-label="Search"*/}
// {/*                    onChange={e => setSearch(e.target.innerText)}*/}
// {/*                />*/}
// {/*            </FloatingLabel>*/}
// {/*            <Form.Select*/}
// {/*                aria-label="Suggested Completion"*/}
// {/*                value={value.name}*/}
// {/*                onSubmit={handleSubmit}*/}
// {/*            >*/}
//
// {/*                <*/}
// {/*            </Form.Select>*/}
// {/*        </InputGroup>*/}
// {/*    </Form>*/}


