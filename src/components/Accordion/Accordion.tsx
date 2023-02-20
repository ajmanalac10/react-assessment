import React from 'react'
import {
    Accordion
} from 'react-bootstrap'

type AccordionComponentProps = {
    userId: string;
    id: string;
    title: string;
    body: string;
}

const AccordionComponent: React.FC<AccordionComponentProps> = (props) => {
    const { id, title, body } = props

    return (
        <Accordion key={`accordion-${id}`} defaultActiveKey='1'>
            <Accordion.Item eventKey={id}>
                <Accordion.Header>
                    {id} - {title}
                </Accordion.Header>
                <Accordion.Body>
                    {body}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default AccordionComponent