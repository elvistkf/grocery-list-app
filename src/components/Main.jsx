import React from 'react'
import styled from 'styled-components'
import ListItem from './ListItem'
import ListContentItem from './ListContentItem'
import uuid4 from 'uuid4'
import axios from 'axios'

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
    /* display: inline; */
`


function Main(props) {
    if (props.display) {
        console.log(props.groceryList.find(obj => {
            return obj["_id"] === props.state.displayID
        }))
    }

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

            axios.post(props.requestEndPoint + props.state.displayID, newList);
        }
    }

    return (
        <Container>
            {
                props.state.createNewList && !props.state.display ? (
                    <NewListItemContainer ref={input => input && input.focus()} contentEditable="true" autoFocus onKeyDown={handleNewListItemKeyDown} placeholder={"123"}/>
                ) : 
                props.state.createNewListContent && props.state.display ? (
                    <NewListItemContainer ref={input => input && input.focus()} contentEditable="true" autoFocus onKeyDown={handleNewListContentKeyDown} placeholder={"123"}/>
                ) : <span></span>
            }
            <ListContainer>
                {
                    props.state.display === true ?
                        props.groceryList.find(obj => {
                            return obj["_id"] === props.state.displayID
                        }).data.map((item, index) => (
                            <ListContentItem item={item} state={props.state} setState={props.setState} requestEndPoint={props.requestEndPoint} key={index} />
                        )) :
                        props.groceryList.map((item, index) => (
                            <ListItem item={item} setState={props.setState} key={index} />
                        ))


                }
            </ListContainer>
        </Container>
    )
}

export default Main