import React, {useState} from 'react';
import {Accordion, Button, ButtonToolbar, ButtonGroup, Stack, Form} from "react-bootstrap";
import GetRareDiseases from "./Guideline";
import {db} from "../db/db";

// A 58 year old patient, presenting with HIV infection should be prescribed abacavir if this patient has HLAB-15 gene.

export default function ClinicalNote() {
    const ph = "Enter clinical notes regarding the patient's prescriptions.";
    const [text, setText] = useState("");
    // const [display, setDisplay] = useState(false);
    // const [suggestions, setSuggestions] = useState([]);
    // const [showPh, setShowPh] = useState(true);
    // const ClinicalNoteTextArea = useRef();

    // This will be used to submit the query to the backend and eventually to JanusGraph.
    // eslint-disable-next-line
    const handleSubmit = async () => {
        try {
            await db.note.put({note: text});
            alert("Note saved!");
        } catch (e) {
            alert("Note not saved.");
            console.debug(e)
        }
        // const res = fetch(`https://clinicaltables.nlm.nih.gov/api/genes/v4/search?df=symbol&terms=${searchTerm}`)
    }

    const handleDiscard = () => {
        setText("")
    }



    return (
        <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Clinical Notes:</Accordion.Header>
                <Accordion.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-12" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea"
                                          rows={22}
                                          value={text}
                                          placeholder={ph}
                                          onChange={e => {setText(e.target.value)}} />
                            <ButtonToolbar className="justify-content-end" aria-label="Text Area Controls">
                                <Stack gap={2} className="col-md-5 mx-auto">
                                    <ButtonGroup aria-label="Controls">
                                        <Button variant="outline-info" type="button" onClick={handleSubmit}> Save </Button>{' '}
                                        <Button variant="outline-danger" type="button" onClick={handleDiscard}> Discard </Button>{' '}
                                    </ButtonGroup>
                                </Stack>
                            </ButtonToolbar>
                        </Form.Group>
                    </Form>
                    <GetRareDiseases note={text}/>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

// async function fetchData(search) {
//     // const res = await fetch(`https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?sf=consumer_name&ef=term_icd9_code,term_icd9_text&terms=${searchTerm}`);
//     const res = await fetch(`https://clinicaltables.nlm.nih.gov/api/disease_names/v3/search?terms=${search}`);
//     const [numMatches, , , completions] = JSON.parse(await res.text())
//     if (numMatches > 0) {
//         setSuggestions(completions);
//         setDisplay(true);
//     } else {
//         setDisplay(false);
//     }
// }

// useEffect(() => {
//     const regex = new RegExp('\s+'); // eslint-disable-line
//     let timeout;
//     if (regex.test(text.slice(-1)[0])) {
//         setDisplay(false);
//     } else {
//         let searchTerm = text.split(" ").slice(-1)[0];
//         if (searchTerm.length > 2) {
//             try {
//                 timeout = setTimeout(() => fetchData(searchTerm), 500);
//             } catch (e) {
//                 console.log(e);
//             }
//         }
//     }
//
//     return () => {
//         clearTimeout(timeout);
//     }
// }, [text])

// function updateText(event) {
//     let completion = event.target.innerText;
//     let newText = text.split(" ").slice(0, -1).join(" ").concat(" ", completion);
//     setText(newText);
//     ClinicalNoteTextArea.current.innerText = newText;
// }

// {/*<div style={{height: "28rem", border: ".1em solid #212529", borderRadius: ".3em", marginBottom:".2em", padding: ".25em"}}*/}
// {/*     onFocus={(e) => {*/}
// {/*         if (!e.currentTarget.contains(e.relatedTarget)) {*/}
// {/*             setShowPh(false);*/}
// {/*         }*/}
// {/*     }}*/}
// {/*     onBlur={(e)=> {*/}
// {/*         if (!e.currentTarget.contains(e.relatedTarget) && text.length === 0) {*/}
// {/*             setShowPh(true);*/}
// {/*         }*/}
// {/*     }}*/}
// {/*>*/}
// {/*    {(showPh) && (<p contentEditable={false} style={{opacity: ".8", color: '#303030'}}>{ph}</p>)}*/}
// {/*    <p ref={ClinicalNoteTextArea} key={"ClinicalNoteTextArea"} contentEditable={true} suppressContentEditableWarning={true} onInput={(e) => setText(e.target.innerText)}></p>*/}
// {/*    {display && (*/}
// {/*        <DropdownButton*/}
// {/*            variant="dark"*/}
// {/*            menuVariant="dark"*/}
// {/*            size="sm"*/}
// {/*            title="completions"*/}
// {/*        >*/}
// {/*            {*/}
// {/*                (suggestions).map((item, index) => {*/}
// {/*                    return (<Dropdown.Item as="button" key={index} onClick={e => updateText(e)}>{item[0]}</Dropdown.Item>);*/}
// {/*                })*/}
// {/*            }*/}
// {/*        </DropdownButton>*/}
// {/*    )}*/}
// {/*</div>*/}