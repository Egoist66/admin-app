import React, {FC, FormEvent, useCallback, useEffect, useRef} from "react";
import {EditorView} from "./EditorView";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {delay} from '../../utils/delay'
import {clearMessage, createPages, deletePages, fetchPages, filesSelector} from "../../store/slice/pagelist-slice";
import "../../helpers/iframeLoader"
import {createTemplatePage, fetchSourceIndexData, indexSrcSelector, saveEdits} from "../../store/slice/source-slice";
import {useDom} from "../../hooks/useDom";
import {usePages} from "../../hooks/usePages";


export const Editor: FC = () => {
    const dispatch = useAppDispatch()

    const {serializeDomToString, parseStringIntoDOM, wrapTextNodes} = useDom()
    const {
        options,
        inputRef,
        createPage,
        deletePage,
        save
    } = usePages(dispatch)


    const {current: {currentPage}} = options


    const {files, status, message, statusCode} = useAppSelector(filesSelector)
    const {sourceData} = useAppSelector(indexSrcSelector)


    const open = (page: string) => {
        options.current.currentPage = page
        dispatch(fetchSourceIndexData(`../${page}?rnd=${Math.random()}`))

    }

    const enableEditing = () => {
        options.current.iframe?.contentDocument?.body.querySelectorAll('text-editor').forEach(t => {
            if (t) {
                t.setAttribute('contenteditable', 'true')
                t.addEventListener('input', (e) => {

                    onTextEdit(t)

                })
            }

        })

    }

    const onTextEdit = (element: Element) => {
        const id = element.getAttribute('node-id')
        const foundElem = options.current.virtualDom?.body.querySelector(`[node-id="${id}"]`)
        if (foundElem) {
            foundElem.innerHTML = element.innerHTML

        }

    }

    const init = (page: string) => {
        const iframe = document.querySelector('iframe') as HTMLIFrameElement
        options.current.iframe = iframe ? iframe : null
        open(page)

        dispatch(fetchPages())


    }
    const initApp = () => {
        const dom = parseStringIntoDOM(sourceData!)
        options.current.virtualDom = wrapTextNodes(dom)

        dispatch(createTemplatePage(serializeDomToString(dom)))


        //@ts-ignore
        options.current.iframe.load('../temp.html', () => {
            enableEditing()
        })
    }

    // Side effects


    useEffect(() => {
        if (sourceData) initApp()

    }, [sourceData])

    useEffect(() => {
        init(options.current.currentPage)
    }, [])

    useEffect(() => {
        if (message) {
            delay(2000).then(() => {
                dispatch(clearMessage())
            })
        }
    }, [message])

    const data = {
        status,
        inputRef,
        statusCode,
        message,
        currentPage,
        createPage,
        deletePage,
        files
    }


    return (


        <>

            <button style={{
                position: 'relative',
                zIndex: 999999999999
            }} onClick={save}>Click
            </button>
            <EditorView data={{...data}}/>


        </>
    )
}