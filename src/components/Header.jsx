import React from 'react'
import styled from 'styled-components'
import colourConfig from '../config/colourConfig'
import { MdLocalGroceryStore, MdAdd, MdOutlineEditOff, MdOutlineCheck } from 'react-icons/md'

const Container = styled.div`
    background-color: ${colourConfig.header};
    min-height: ${props => props.display ? "5em" : "4em"};
    display: flex;
    align-items: center;
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
`

const ListTitleContainer = styled.div`
    margin-top: 5px;
`

const EditButton = styled.div`
    display: flex;
    align-items: center;
    justify-items: auto;
    margin-left: 0.5em;
    font-size: x-large;
    padding: 0.5em 0.5em 0.5em 0.5em;
    border-radius: 1em;

    color: ${colourConfig.font};

    &:hover{
        cursor: pointer;
        background-color: ${colourConfig.backgroundHover};
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

    color: ${colourConfig.font};

    &:hover{
        cursor: pointer;
        background-color: ${colourConfig.backgroundHover};
    }
`

function Header(props) {

    // function handleBackButtonClick() {
    //     console.log(props.state.display);
    //     if (props.state.display) {
    //         props.setState({
    //             ...props.state,
    //             display: false,
    //             displayID: null
    //         });
    //     }
    //     props.fetchData();
    // }

    function handleAddButtonClick() {
        if (props.state.display) {
            props.setState(
                {
                    ...props.state,
                    createNewListContent: true
                }
            )
        } else {
            props.setState(
                {
                    ...props.state,
                    createNewList: true
                }
            )
        }
    }

    function handleEditButtonClick() {
        if (props.state.display) {
            props.setState(
                {
                    ...props.state,
                    editListContent: !props.state.editListContent
                }
            )
        } else {
            props.setState(
                {
                    ...props.state,
                    editList: !props.state.editList
                }
            )
        }
    }

    return (
        <Container display={props.state.display ? 1 : 0}>
            <EditButton display={props.state.display ? 1 : 0} onClick={handleEditButtonClick}>
                {
                    !(props.state.editList || props.state.editListContent) ? <MdOutlineEditOff /> : <MdOutlineCheck />
                }
            </EditButton>

            <TitleContainer>
                <div><MdLocalGroceryStore /> Grocery List</div>
                {
                    props.state.display && (
                        <ListTitleContainer>
                            {
                                props.groceryList.find(obj => {
                                    return obj["_id"] === props.state.displayID
                                }).title
                            }
                        </ListTitleContainer>
                    )
                }
            </TitleContainer>
            <AddButton onClick={handleAddButtonClick} display={props.state.display ? 1 : 0}>
                <MdAdd />
            </AddButton>
        </Container>
    )
}

export default Header