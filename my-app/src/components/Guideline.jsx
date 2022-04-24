import React, {useState} from 'react';
import {Accordion, Button, Card, Table, Offcanvas, Carousel, Nav} from "react-bootstrap";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";

// async function formatQuery2table (query) {
//     // let jsonHeaders = Object.keys(query);
//     // jsonHeaders = await Promise.all(jsonHeaders.map(async (v) => { return {Header: v.toUpperCase(), accessor: v} }));
//     // return jsonHeaders;
//     return Object.keys(query);
// }

// const callApi = async () => {
//     // const res = await fetch("https://api.pharmgkb.org/v1/data/clinicalAnnotation?levelOfEvidence.term=1A&view=base");
//     // const res = await fetch("https://api.pharmgkb.org/v1/report/guideline/PA166104948/annotations", {
//     //         method: 'POST', // or 'PUT'
//     //         headers: {
//     //         'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify(data),
//     // });
//     const res = await fetch("https://api.pharmgkb.org/v1/data/chemical/PA448004");
//
//     const resJson = await JSON.parse(await res.text()).data;
//     if (resJson) {
//         setData(resJson);
//         setHeaders(await formatQuery2table(resJson));
//     }
// }

// useEffect(() => callApi(), []);
// useEffect(() => formatQuery2table(data), [data]);

export default function GetRareDiseases(note) {
    const [presentation, setPresentation]= useState([]);
    const [active, setActive] = useState('#Summary');
    const text = note.note;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => { checkNoteforSymptoms(); setShow(true)};

    const phenotypes = useLiveQuery(async () => {
        return await db.phenotype.toArray();
    });

    const checkNoteforSymptoms = () => {
        let currentPresentation = [];
        for (let pheno of phenotypes) {
            if (text.toLowerCase().includes(pheno.name.toLowerCase())) {
                currentPresentation.push(pheno.id);
            }
        }
        setPresentation(currentPresentation);
        // console.log(presentation);
    }

    const diseases = useLiveQuery(async () => {
        let data = [];
        if (presentation.length > 0) {
            data = await db.disease.where("phenotypeIds").anyOf(presentation).distinct().toArray();
        }

        if (data.length > 0) {
            data = await Promise.all(data.map( async (d) => {
                d.present = [];
                d.absent = [];
                await Promise.all(d.phenotypeIds.map(async (id) => {
                    let value = await db.phenotype.get(id);
                    if (presentation.indexOf(id) > -1) {
                        d.present.push(value);
                    } else {
                        d.absent.push(value);
                    }
                }));
                return d;
            }));
        }
        return data;
    }, [presentation]);

    return (
        <div>
            <Button variant="link" onClick={handleShow} className="me-2" size="sm">List Rare Diseases that might match clinical note</Button>
            <Offcanvas show={show} onHide={handleClose} placement='end' props= {{scroll: true, backdrop: true}} style={{ width: '60rem' }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Matching Rare Diseases:</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    { (diseases?.length === 0) && <Card border="warning">
                        <Card.Body>
                            <Card.Title>No matches where found</Card.Title>
                            {/*<Card.Subtitle className="mb-2 text-muted">Try again:</Card.Subtitle>*/}
                            <Card.Text>
                                No rare diseases the match phenotype extracted from the clinical note where found. Try to describe the same phenotypic concepts in the clinical note text area with different terms.

                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>Other sources of information:
                            <Card.Link href="https://rarediseases.org/">NORD: Rare Disease Database</Card.Link>
                            <Card.Link href="https://rarediseases.info.nih.gov/">Genetic and Rare Diseases Information Center (GARD)</Card.Link>
                        </Card.Footer>
                    </Card>
                    }
                    {
                        !(diseases?.length === 0) &&
                        <Accordion defaultActiveKey={['0']}>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Supporting Information:</Accordion.Header>
                                <Accordion.Body>
                                    <Table size="sm" responsive striped bordered hover variant="dark">
                                        <thead>
                                        <tr>
                                            <th key="Disease"> Disease / Syndrome</th>
                                            <th key="Supporting"> Supporting Elements</th>
                                            <th key="Missing"> Missing Elements</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            diseases?.map((d) => {
                                                return (
                                                    <tr>
                                                        <td key={"d_".concat(d.id)}> {d.name} </td>
                                                        <td key={"p_".concat(d.id)}>
                                                            <ul>
                                                                {
                                                                    d.present.map((p, index) => {
                                                                        return (<li key={index}>{p?.name}</li>);
                                                                    })
                                                                }
                                                            </ul>
                                                        </td>
                                                        <td key={"m_".concat(d.id)}>
                                                            <ul>
                                                                {
                                                                    d.absent.map((p, index) => {
                                                                        return (<li key={index}>{p?.name}</li>);
                                                                    })
                                                                }
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                        </tbody>
                                    </Table>
                                </Accordion.Body>
                            </Accordion.Item>
                            {
                                diseases?.map((disease) => {
                                    return (
                                        <Accordion.Item eventKey={disease.id}>
                                            <Accordion.Header>{disease.name}:</Accordion.Header>
                                            <Accordion.Body>
                                                <Card className="justify-content-center" border="info"
                                                      style={{width: 'auto'}}>
                                                    <Carousel variant="dark" style={{
                                                        width: '100%',
                                                        height: '20rem',
                                                        overflow: "scroll"
                                                    }}>
                                                        {
                                                            (disease.images).map((image) => {
                                                                return (
                                                                    <Carousel.Item interval={5000}>
                                                                        <center>
                                                                            <a href={image}>
                                                                                <img className="d-block w-100"
                                                                                     src={image} alt={image}/>
                                                                            </a>
                                                                        </center>
                                                                    </Carousel.Item>
                                                                )
                                                            })
                                                        }
                                                    </Carousel>
                                                    <Card.Header>
                                                        <Nav variant="tabs" defaultActiveKey="#Summary">
                                                            <Nav.Item>
                                                                <Nav.Link href="#Summary" onClick={() => setActive("#Summary")}>Summary</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link href="#Therapies" onClick={() => setActive("#Therapies")}>Therapies</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link href="#Resources" onClick={() => setActive("#Resources")}>Resources</Nav.Link>
                                                            </Nav.Item>
                                                        </Nav>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        {
                                                             {
                                                                '#Summary':
                                                                    disease.description.split("\n").map((description) => {
                                                                        return (<Card.Text>{description}</Card.Text>);
                                                                    }),

                                                                '#Therapies':
                                                                    disease.treatment.split("\n").map((description) => {
                                                                        return (<Card.Text>{description}</Card.Text>);
                                                                    }),
                                                                '#Resources':
                                                                    disease.resources.split("\n").map((description) => {
                                                                        return (<Card.Text>{description}</Card.Text>);
                                                                    })
                                                            }[active]
                                                        }
                                                    </Card.Body>
                                                    <Card.Footer>
                                                        <Card.Link href={disease.ref}>More info from:
                                                            rarediseases.info.nih.gov</Card.Link>
                                                    </Card.Footer>
                                                </Card>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    );
                                })
                            }
                        </Accordion>
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}