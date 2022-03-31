import React, {useState, useEffect} from 'react';
import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table';
import {Accordion} from "react-bootstrap";

async function formatQuery2table (query) {
    // let jsonHeaders = Object.keys(query);
    // jsonHeaders = await Promise.all(jsonHeaders.map(async (v) => { return {Header: v.toUpperCase(), accessor: v} }));
    // return jsonHeaders;
    return Object.keys(query);
}

export default function Guideline () {
    let [headers, setHeaders] = useState([]);
    let [data, setData]= useState([]);


    const callApi = async () => {
        // const res = await fetch("https://api.pharmgkb.org/v1/data/clinicalAnnotation?levelOfEvidence.term=1A&view=base");
        // const res = await fetch("https://api.pharmgkb.org/v1/report/guideline/PA166104948/annotations", {
        //         method: 'POST', // or 'PUT'
        //         headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // });
        const res = await fetch("https://api.pharmgkb.org/v1/data/chemical/PA448004");

        const resJson = await JSON.parse(await res.text()).data;
        if (resJson) {
            setData(resJson);
            setHeaders(await formatQuery2table(resJson));
        }
    }


    useEffect(() => callApi(), []);
    useEffect(() => formatQuery2table(data), [data]);

    return (
        <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Clinical Guidelines:</Accordion.Header>
                <Accordion.Body>
                    <Table responsive='lg' striped bordered hover variant="primary">
                        <thead>
                            <tr>
                            {
                                headers.map((h) => {
                                    return (<th> {h} </th>)
                                })
                            }
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {
                                    // data.map(row =>
                                        Object.values(data).map((r) => {return (<td key={r.toString()}> {JSON.stringify(r)} </td>);})
                                    // )
                                }
                            </tr>
                        </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}