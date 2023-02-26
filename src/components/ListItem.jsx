import React from 'react'
import styled from 'styled-components'
import colourConfig from '../config/colourConfig'
import { MdDelete } from 'react-icons/md'

const Container = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    border-bottom: 1px #303030 solid;
`

const SubContainer = styled.div`
    width: 100%;
    padding: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover{
        cursor: pointer; 
        background-color: ${colourConfig.backgroundHover};
    }
`

const DeleteButtonContainer = styled.div`
    padding: 0.75em;
    display: flex;
    align-items: center;
    border-right: 1px #303030 solid;
    font-size: larger;

    &:hover{
        cursor: pointer;
        background-color: red;
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

    function handleDeleteButtonClick() {
        props.handleItemDelete(props.item["_id"])
    }

    const completedCount = props.item.data.filter(obj => {
        return obj.completed
    }).length

    const totalCount = props.item.data.length

    return (
        <Container>
            {
                !props.state.display && props.state.editList && (
                    <DeleteButtonContainer onClick={handleDeleteButtonClick}>
                        <MdDelete />
                    </DeleteButtonContainer>
                )
            }
            <SubContainer onClick={handleClick}>
                <TitleContainer>
                    {props.item.title}
                </TitleContainer>
                <CountContainer>
                    {completedCount}/{totalCount}
                </CountContainer>
            </SubContainer>
        </Container>

    )
}

export default ListItem