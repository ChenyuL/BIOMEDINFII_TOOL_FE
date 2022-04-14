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
    let [phenotype, setPhenotype]= useState([]);
    const text = note.note;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => { checkNoteforSymptoms(); setShow(true)};

    const symptoms = useLiveQuery(async () => {
        return await db.symptom.toArray();
    });

    const checkNoteforSymptoms = () => {
        let presentation = [];
        for (let symptom of symptoms) {
            if (text.toLowerCase().includes(symptom.name.toLowerCase())) {
                presentation.push(symptom.id);
            }
        }
        setPhenotype(presentation);
        console.log(phenotype);
    }

    const diseases = useLiveQuery(async () => {
        let data = [];
        if (phenotype.length > 0) {
            data = await db.disease.where("symptomIds").anyOf(phenotype).distinct().toArray();
        }

        if (data.length > 0) {
            for (let d of data) {
                d.symptoms = await Promise.all(d.symptomIds.map(async (s) => await db.symptom.get(s)));
            }
        }
        console.log(data);
        return data;
    }, [phenotype]);

    useEffect(() =>{

    }, [phenotype])

    return (
        <div>
            <Button variant="link" onClick={handleShow} className="me-2" size="sm">List Rare Diseases that might match clinical note</Button>
            <Offcanvas show={show} onHide={handleClose} placement='end' props= {{scroll: true, backdrop: true}} style={{ width: '50rem' }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Matching Rare Diseases:</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Accordion defaultActiveKey={['0']}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Supporting Information:</Accordion.Header>
                            <Accordion.Body>
                                <Table responsive='md' striped bordered hover variant="dark">
                                    <thead>
                                    <tr>
                                        <th key="Disease"> Disease / Syndrome </th>
                                        <th key="Supporting"> Supporting Elements </th>
                                        {/*<th key="Missing"> Missing Elements </th>*/}
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            diseases?.map((d) => {
                                                return (
                                                    <tr>
                                                        <td key={"d_".concat(d.id)}> {d.name} </td>
                                                        <td key={"s_".concat(d.id)}>
                                                            <ul>
                                                            {
                                                                d.symptoms.map((s)=> {
                                                                    return (<li>{s?.name}</li>);
                                                                })
                                                            }
                                                            </ul>
                                                        </td>
                                                        {/*<td key={d.id}> {d.name} </td>*/}
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
                                            <Card className="justify-content-center" border="info"  style={{ width: 'auto' }}>
                                                <Card.Header>
                                                    <Carousel variant="dark" style={{ width: '100%', height: '20rem', overflow: "scroll"}}>
                                                        {
                                                            (disease.images).map((image) => {
                                                                return (
                                                                    <Carousel.Item interval={5000}>
                                                                        <center>
                                                                            <a href={image}>
                                                                                <img className="d-block w-100" src={image} alt={image} />
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
                                                    <Card.Link href={disease.ref}>More info from: rarediseases.info.nih.gov</Card.Link>
                                                </Card.Body>
                                            </Card>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                );
                            })
                        }
                    </Accordion>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}