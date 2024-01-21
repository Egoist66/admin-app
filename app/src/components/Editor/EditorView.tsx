import React, {FC, FormEvent, forwardRef, memo, RefObject, useEffect} from "react";
import styled from "styled-components";
import {ModalWindow} from "../Features/Modal";
import {useToggle} from "../../hooks/useToggle";
import {Statuses} from "../../store/slice/source-slice";
import { Button } from "semantic-ui-react";


const StyledEditor = styled.div`

`

type EditorViewProps = {
    data: {
        files: string[]
        savedMessage: string
        save: () => void
        currentPage: string
        deletePage: (page: string) => void
        inputRef: RefObject<HTMLInputElement>
        statusCode: 0 | 1
        createPage: (e: FormEvent<HTMLFormElement>) => void
        status: 'resolved' | 'pending' | 'rejected' | null
        saveStatus: Statuses
    }
}

export const EditorView: FC<EditorViewProps> = memo(forwardRef(({data}) => {
    EditorView.displayName = "EditorView"
    const {setOpen, isToggled} = useToggle()

    const {
        files,
        save,
        currentPage,
        deletePage,
        inputRef,
        statusCode,
        saveStatus,
        savedMessage,
        createPage,
        status
    } = data


    const pages = (
        <div>
            {status !== 'pending' ? files.map((p, index) => (
                <div className="file-name" key={index}>{p}
                    <a onClick={() => deletePage(p)} href="#">Delete</a>
                </div>
            )) : <h2>Loading...</h2>}
        </div>
    )


    useEffect(() => {
        if (status === 'resolved') {
            if (statusCode === 0) {
                if (inputRef.current) {
                    inputRef.current.value = ''
                }
            }


        }


    }, [status])


    return (

        <StyledEditor>
            {/*
               <form onSubmit={createPage}>
                    <input data-value={inputRef?.current?.value} name='filename' ref={inputRef} type="text" />
                    <button disabled={status === 'pending'} type="submit">Создать новую страницу</button>

               </form>

               {message ? <p>{message}</p>: null}
               {pages} */}
            <iframe src={currentPage} frameBorder="0"></iframe>

            <div className={'uk-panel panel'}>
                <Button primary onClick={() => setOpen(true)}>Сохранить</Button>

            </div>

            <ModalWindow
                onClickHandler={save}
                saveStatus={saveStatus}
                open={isToggled}
                savedMessage={savedMessage}
                setOpen={setOpen}
            />


        </StyledEditor>
    )
}))
