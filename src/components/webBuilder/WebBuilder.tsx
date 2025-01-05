import { Component, createEffect, createResource, JSX } from "solid-js"

interface WebBuilderProps {
    items?: WebBuilderItem[]
}

interface WebBuilderItem {
    item_type?: 'header_text'
}

const getItems = () => {
    return [] as WebBuilderItem[]
}

function getEditorItems(editorRef: HTMLDivElement): JSX.Element {
    console.log(editorRef)
    return
}

const WebBuilder: Component = (props) => {
    const [items, {mutate: mutateItems}] = createResource(() => getItems())

    let editorRef: HTMLDivElement;

    createEffect(() => {
        console.log(items())
    })
    createEffect(() => {

    })
    return (
        <div {...props} ref={el => editorRef = el}>
            {getEditorItems(editorRef)}
        </div>
    )
}

export default WebBuilder