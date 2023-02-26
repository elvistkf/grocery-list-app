import React from 'react'
import styled from 'styled-components'
import Spinner from 'react-bootstrap/Spinner';

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10%;
`

function Loading() {
    return (
        <Container>
            <Spinner animation="border" variant="primary" />
        </Container>
        // <Spinner animation="border" variant="primary" />
    )
}

export default Loading