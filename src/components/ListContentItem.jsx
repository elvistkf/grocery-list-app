import React from 'react'
import styled from 'styled-components'
// import colourConfig from '../config/colourConfig'
import axios from 'axios'

const Container = styled.div`
    display: flex;
    justify-items: left;
    align-items: center;
    padding: 1em;
    border-bottom: 1px #303030 solid;

`

const CheckButton = styled.div`
    border: 1px white solid;
    width: 1.75em;
    height: 1.75em;
    margin-right: 1em;
    border-radius: 50%;

    transition: background-color 0.2s;

    ${({ active }) => active && `
        background-color: orange;
    `}

    &:hover{
        cursor: pointer; 
    }

    &:active{
        cursor: pointer; 
        background-color: orangered;
    }
`

const Title = styled.div`
    
`

function ListContentItem(props) {

    function handleCheckButtonClick() {
        props.item.completed = !props.item.completed;
        props.setState({
            ...props.state
        })
        axios.post(props.requestEndPoint + props.state.displayID + "/toggle/" + props.item["_id"]);
    }

    return (
        <Container>
            <CheckButton active={props.item.completed} onClick={handleCheckButtonClick} />
            <Title>
                {props.item.name}
            </Title>
        </Container>
    )
}

export default ListContentItem