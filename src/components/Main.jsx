import React from 'react'
import styled from 'styled-components'
import ListItem from './ListItem'
import ListContentItem from './ListContentItem'
import uuid4 from 'uuid4'
import axios from 'axios'
import colourConfig from '../config/colourConfig'
import { MdArrowBack } from 'react-icons/md'


const Container = styled.div`
    
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const NewListItemContainer = styled.div`
    padding: 1em;
    border-bottom: 1px #303030 solid;
    white-space: nowrap;
    overflow: hidden;
`

const BackButton = styled.div`
    display: flex;
    align-items: center;
    justify-items: auto;
    margin-left: 1em;
    font-size: x-large;
    padding: 0.5em 0.5em 0.5em 0.5em;
    border-radius: 1em;

    width: 2em;
    height: 2em;
    position: fixed;
    bottom: 1em;

    background-color: ${colourConfig.backButtonBackground};
    color: ${props => props.display ? colourConfig.font : colourConfig.header};

    &:hover{
        cursor: pointer;
        background-color: ${colourConfig.backButtonBackgroundHover};
    }
`


function Main(props) {
    function handleNewListItemKeyDown(event) {
        if (event.key === "Enter") {
            props.setState({
                ...props.state,
                createNewList: false
            })

            let newList = {
                _id: uuid4(),
                title: event.target.textContent,
                data: []
            }

            props.groceryList.unshift(newList)
            axios.post(props.requestEndPoint, newList);
        }
    }

    function handleNewListContentKeyDown(event) {
        if (event.key === "Enter") {
            props.setState({
                ...props.state,
                createNewListContent: false
            })

            let newList = {
                _id: uuid4(),
                name: event.target.textContent,
                completed: false
            }

            props.groceryList.find(obj => {
                return obj["_id"] === props.state.displayID
            }
            ).data.push(newList)

            axios.post(props.requestEndPoint + "/" + props.state.displayID, newList);
        }
    }

    function handleBackButtonClick() {
        console.log(props.state.display);
        if (props.state.display) {
            props.setState({
                ...props.state,
                display: false,
                displayID: null
            });
        }
        props.fetchData();
    }

    function handleItemDelete(listID) {
        console.log(listID);
        const newList = props.groceryList.filter(obj => {
            return obj["_id"] !== listID
        })
        props.setGroceryList(newList);

        axios.delete(props.requestEndPoint + "/" + listID);
    }

    return (
        <Container>
            {
                props.state.createNewList && !props.state.display && (
                    <NewListItemContainer ref={input => input && input.focus()} contentEditable="true" autoFocus onKeyDown={handleNewListItemKeyDown} placeholder={"123"} />
                )
            }
            {
                props.state.createNewListContent && props.state.display && (
                    <NewListItemContainer ref={input => input && input.focus()} contentEditable="true" autoFocus onKeyDown={handleNewListContentKeyDown} placeholder={"123"} />
                )
            }
            <ListContainer>
                {
                    props.state.display === true ?
                        props.groceryList
                            .find(obj => {
                                return obj["_id"] === props.state.displayID
                            }).data
                            .sort((obj1, obj2) => {
                                return obj1.completed >= obj2.completed
                            })
                            .map((item, index) => (
                                <ListContentItem item={item} state={props.state} setState={props.setState} requestEndPoint={props.requestEndPoint} key={index} />
                            )) :
                        props.groceryList.map((item, index) => (
                            <ListItem item={item} state={props.state} setState={props.setState} handleItemDelete={handleItemDelete} key={index} />
                        ))


                }
            </ListContainer>
            {
                props.state.display && (
                    <BackButton onClick={handleBackButtonClick}>
                        <MdArrowBack />
                    </BackButton>
                )
            }
        </Container>
    )
}

export default Main