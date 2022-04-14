import React, {useEffect, useState} from 'react';
import {Accordion, Button, Card, Table, Offcanvas, Carousel} from "react-bootstrap";

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
    // const [missing, setMissing] = useState([]);
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
        console.log(presentation);
    }

    const diseases = useLiveQuery(async () => {
        let data = [];
        if (presentation.length > 0) {
            data = await db.disease.where("phenotypeIds").anyOf(presentation).distinct().toArray();
        }

        if (data.length > 0) {
            for await (let d of data) {
                d.phenotypes = await Promise.all(d.phenotypeIds.map(async (id) => await db.phenotype.get(id)));
                d.missing =  await Promise.all(d.phenotypeIds.filter((id) => presentation.includes(id)).map(async (s) => await db.phenotype.get(s)));
            }
        }
        console.log(data);
        return data;
    }, [presentation]);

    return (
        <div>
            <Button variant="link" onClick={handleShow} className="me-2" size="sm">List Rare Diseases that might match clinical note</Button>
            <Offcanvas show={show} onHide={handleClose} placement='end' props= {{scroll: true, backdrop: true}} style={{ width: '50rem' }}>
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
                                    <Table responsive='md' striped bordered hover variant="dark">
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
                                                    <tr className={{overflow: "scroll"}}>
                                                        <td key={"d_".concat(d.id)}> {d.name} </td>
                                                        <td key={"p_".concat(d.id)}>
                                                            <ul>
                                                                {
                                                                    d.phenotypes.map((p) => {
                                                                        return (<li>{p?.name}</li>);
                                                                    })
                                                                }
                                                            </ul>
                                                        </td>
                                                        <td key={"m_".concat(d.id)}>
                                                            <ul>
                                                                {
                                                                    d.missing.map((p) => {
                                                                        return (<li>{p?.name}</li>);
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
                                                    <Card.Header>
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
                                                    </Card.Header>
                                                    <Card.Body>
                                                        {
                                                            disease.description.split("\n").map((description) => {
                                                                return (<Card.Text>{description}</Card.Text>);
                                                            })
                                                        }
                                                    </Card.Body>
                                                    <Card.Body>
                                                        <Card.Link href={disease.ref}>More info from:
                                                            rarediseases.info.nih.gov</Card.Link>
                                                    </Card.Body>
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