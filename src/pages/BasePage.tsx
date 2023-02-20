import React, {
    useEffect,
    useRef,
    useReducer
} from 'react'

import {
    Container,
    Row,
    Col,
    Form,
    Button
} from 'react-bootstrap'

// components
import Accordion from '../components/Accordion/Accordion'

// api
import { fetchData } from '../api/fetchData'

const initialValue = {
    data: [],
    dataNumber: '',
    type: ''
}

const reducerFunction = (state: any, action: any) => {
    switch (action.type) {
        case 'UPDATE_DATA':
            return { ...state, data: action.data }
        case 'UPDATE_DATA_NUMBER':
            return { ...state, dataNumber: action.dataNumber }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const BasePage: React.FC = () => {
    // useRef
    const countRef = useRef<any>(null)

    // useReducer
    const [state, dispatch] = useReducer(reducerFunction, initialValue)
    const { data, dataNumber } = state

    // useEffects
    useEffect(() => {
        // focuses on the textbox after mounting
        const countRefCurrent = countRef.current;
        countRefCurrent.focus()
    }, [])

    useEffect(() => {
        // triggers data fetch during mount and every update of dataNumber
        fetchData()
            .then(response => {
                let tempData = []
                if (dataNumber) {
                    tempData = response.slice(0, dataNumber)
                } else {
                    tempData = response
                }
                dispatch({ type: 'UPDATE_DATA', data: tempData })
            })
    }, [dataNumber])

    const onClickFilterData = (e: any) => {
        e.preventDefault()

        const countRefCurrent = countRef.current;
        if (countRefCurrent) {
            dispatch({ type: 'UPDATE_DATA_NUMBER', dataNumber: countRefCurrent.value })
        }
    }

    return (
        <Form>
            <Container className="p-3">
                <Row className="mb-5">
                    <Col>
                        <h1>Welcome to Epic React Evaluation</h1>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col className="d-inline-flex flex-row gap-3 justify-content-center align-items-center">
                        <Form.Label htmlFor="filterCount">
                            Enter count:
                        </Form.Label>
                        <Form.Control
                            ref={countRef}
                            type="number"
                            id="filterCount"
                            className="w-50" />
                        <Button type="submit" onClick={onClickFilterData}>Submit</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            data.map((row: any) => {
                                return <Accordion key={row.id} {...Object.assign(row)} />
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </Form >
    )
}

export default BasePage