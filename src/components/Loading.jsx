import React from 'react'
import styled from 'styled-components'
import Spinner from 'react-bootstrap/Spinner';

const Container = styled.div`
    display: flex;
    height: 50vh;
    margin-top: 15%;
    align-items: center;
    flex-direction: column;
`

function Loading() {
    return (
        <Container>
            <Spinner animation="border" variant="secondary" />
            <div>Loading</div>
        </Container>
    )
}

export default Loading