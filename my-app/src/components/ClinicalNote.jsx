import React, { useState } from 'react';
import {Form, Accordion, Button, ButtonToolbar, ButtonGroup, Stack} from "react-bootstrap";

// A 58 year old patient, presenting with HIV infection should be prescribed abacavir if this patient has HLAB-15 gene.


export default function ClinicalNote() {

    const ph = "Enter clinical notes regarding the patient's prescriptions.";

    const [text, setText] = useState("");
    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting note: ${text}`)

    }

    return (
        <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Clinical Notes:</Accordion.Header>
                <Accordion.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-12" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea"
                                          rows={12}
                                          value={text}
                                          placeholder={ph}
                                          onChange={e => setText(e.target.value)} />
                            <ButtonToolbar
                                className="justify-content-end"
                                aria-label="Text Area Controls"
                            >
                                <Stack gap={2} className="col-md-5 mx-auto">
                                    <ButtonGroup aria-label="Controls">
                                        <Button variant="outline-info"   type="submit"  value="Save" />{' '}
                                        <Button variant="outline-danger" type="button" onClick={setText(ph)} value="Discard" />{' '}
                                    </ButtonGroup>
                                </Stack>
                            </ButtonToolbar>
                        </Form.Group>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
