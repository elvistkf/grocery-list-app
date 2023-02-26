import React from 'react'
import styled from 'styled-components'
import colourConfig from '../config/colourConfig'
import { MdLocalGroceryStore, MdAdd, MdArrowBack } from 'react-icons/md'

const Container = styled.div`
    background-color: ${colourConfig.header};
    /* min-height: 3em; */
    min-height: ${props => props.display ? "5em" : "4em"};
    display: flex;
    align-items: center;
    /* justify-content: center; */
    justify-content: space-between;
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: auto;
    padding: 0.5em 1em 0.5em 1em;
    border-radius: 1em;
    font-size: large;
    
    &:hover{
        cursor: pointer; 
        background-color: ${colourConfig.backgroundHover};
    }
`

const BackButton = styled.div`
    display: flex;
    align-items: center;
    justify-items: auto;
    margin-left: 0.5em;
    font-size: x-large;
    padding: 0.5em 0.5em 0.5em 0.5em;
    border-radius: 1em;

    color: ${props => props.display ? colourConfig.font : colourConfig.header};

    &:hover{
        cursor: ${props => props.display ? "pointer" : "null"}; 
        background-color: ${props => props.display ? colourConfig.backgroundHover : colourConfig.header};
    }
`

const AddButton = styled.div`
    display: flex;
    align-items: center;
    justify-items: auto;
    margin-right: 0.5em;
    font-size: x-large;
    padding: 0.5em 0.5em 0.5em 0.5em;
    border-radius: 1em;

    /* color: ${props => props.display ? colourConfig.header : colourConfig.font}; */
    color: ${colourConfig.font};

    &:hover{
        /* cursor: ${props => props.display ? "null" : "pointer"};  */
        cursor: pointer;
        background-color: ${colourConfig.backgroundHover};
    }
`

function Header(props) {

    function handleBackButtonClick() {
        console.log(props.state.display);
        if (props.state.display) {
            props.setState({
                ...props.state,
                display: false,
                displayID: null
            });
        }
    }

    function handleAddButtonClick() {
        if (!props.state.display) {
            props.setState(
                {
                    ...props.state,
                    createNewList: true
                }
            )
        } else {
            props.setState(
                {
                    ...props.state,
                    createNewListContent: true
                }
            )
        }
        // console.log(props.state)
    }

    return (
        <Container display={props.state.display ? 1 : 0}>
            <BackButton onClick={handleBackButtonClick} display={props.state.display ? 1 : 0}>
                <MdArrowBack />
            </BackButton>

            <TitleContainer>
                <span>
                    <MdLocalGroceryStore />Grocery List
                </span>
                {
                    props.state.display ? 
                    <div>
                        {props.groceryList.find(obj => {
                            return obj["_id"] === props.state.displayID
                        }).title}
                    </div> : 
                    <span></span>
                }
            </TitleContainer>
            <AddButton onClick={handleAddButtonClick} display={props.state.display ? 1 : 0}>
                <MdAdd />
            </AddButton>
        </Container>
    )
}

export default Header