import {saveEdits} from "../store/slice/source-slice";
import {FormEvent, RefObject, useCallback, useRef} from "react";
import {createPages, deletePages} from "../store/slice/pagelist-slice";
import {AppDispatch, useAppDispatch} from "../store/store";
import {useDom} from "./useDom";

export type OptionsType = {
    currentPage: string,
    iframe: RefObject<HTMLIFrameElement> | null
    virtualDom: Document | null
}

export const usePages = () => {
    const dispatch = useAppDispatch()
    const options = useRef<OptionsType>({
        currentPage: 'index.html',
        virtualDom: null,
        iframe: null
    })
    const inputRef = useRef<HTMLInputElement>(null)

    const {unwrapTextNodes, serializeDomToString} = useDom()

    const save = () => {
        const newDom = options.current.virtualDom?.cloneNode(true)
        unwrapTextNodes(newDom!)
        const html = serializeDomToString(newDom!)


        dispatch(saveEdits({html, pagename: options.current.currentPage}))
        console.log(options.current.currentPage);


    }


    const createPage = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (inputRef.current) {
            if (inputRef.current.value === '') {
                return
            }
        }

        const formData = new FormData(e.currentTarget)
        dispatch(createPages(formData))
    }, [])

    const deletePage = (page: string) => {
        dispatch(deletePages(page))

    }


    return {
        options,
        createPage,
        deletePage,
        save,
        inputRef
    }
}
