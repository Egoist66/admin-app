import {OptionsType} from "./usePages";
import {RefObject} from "react";
import {EditorText} from "../helpers/editor-text";

export const useAdmin = (options: RefObject<OptionsType>) => {

    const enableEditing = () => {
        options.current!.iframe?.contentDocument?.body.querySelectorAll('text-editor').forEach((element) => {
            if (element) {
                const id = element.getAttribute('node-id')
                const foundElem = options.current!.virtualDom?.body.querySelector(`[node-id="${id}"]`)

                new EditorText(element as HTMLElement, foundElem! as HTMLElement)
            }

        })

    }


    return {
        enableEditing
    }

}