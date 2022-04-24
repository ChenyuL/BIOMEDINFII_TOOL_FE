import React, {useState} from 'react';
import {Nav} from "react-bootstrap";

export default function Footer () {

    return (
        <Nav className="justify-content-end">
            <Nav.Item>
                <Nav.Link disabled> Information sources: </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="https://medlineplus.gov/">Medline Plus</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  href="https://rarediseases.org/">NORD</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  href="https://rarediseases.info.nih.gov/">GARD</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  href="https://mondo.monarchinitiative.org/">MONDO</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  href="https://www.ncbi.nlm.nih.gov/omim">OMIM</Nav.Link>
            </Nav.Item>

        </Nav>
        )
}