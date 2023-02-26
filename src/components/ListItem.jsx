import React from 'react'
import styled from 'styled-components'
import colourConfig from '../config/colourConfig'

const Container = styled.div`
    padding: 1em;
    border-bottom: 1px #303030 solid;

    &:hover{
        cursor: pointer; 
        background-color: ${colourConfig.backgroundHover};
    }
`

function ListItem(props) {
    function handleClick() {
        // props.setDisplay(true);
        // props.setDisplayID(props.item["_id"]);
        props.setState({
            ...props.state,
            "display": true,
            "displayID": props.item["_id"]
        })
        console.log(props.item["_id"]);
    }

    return (
        <Container onClick={handleClick}>
            {props.item.title}
        </Container>
    )
}

export default ListItem