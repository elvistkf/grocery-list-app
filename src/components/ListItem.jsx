import React from 'react'
import styled from 'styled-components'
import colourConfig from '../config/colourConfig'

const Container = styled.div`
    padding: 1em;
    border-bottom: 1px #303030 solid;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover{
        cursor: pointer; 
        background-color: ${colourConfig.backgroundHover};
    }
`

const TitleContainer = styled.div`
    
`

const CountContainer = styled.div`
    font-size: small;
`

function ListItem(props) {
    function handleClick() {
        props.setState({
            ...props.state,
            "display": true,
            "displayID": props.item["_id"]
        })
    }

    const completedCount = props.item.data.filter(obj => {
        return obj.completed 
    }).length

    const totalCount = props.item.data.length

    return (
        <Container onClick={handleClick}>
            <TitleContainer>
                {props.item.title}
            </TitleContainer>
            <CountContainer>
                {completedCount}/{totalCount}
            </CountContainer>
        </Container>
    )
}

export default ListItem