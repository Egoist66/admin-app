import { EditorText } from "../helpers/editor-text"

export const useAdmin = () => {

    
     const enableEditig = (body: HTMLElement, virtualDOM: Document) => {
          body.querySelectorAll('text-editor').forEach((element) => {

               const id = element.getAttribute('node-id')
               const foundElement = virtualDOM.body.querySelector(`[node-id="${id}"]`)
               
               new EditorText(element as HTMLElement, foundElement as HTMLElement)
          })
     }

     return {
          enableEditig
     }
}