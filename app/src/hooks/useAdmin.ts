import { EditorImages } from "../helpers/editor-images"
import { EditorText } from "../helpers/editor-text"

export const useAdmin = () => {

    
     const enableEditig = (body: HTMLElement, virtualDOM: Document) => {
          body.querySelectorAll('text-editor').forEach((element) => {

               const id = element.getAttribute('node-id')
               const foundElement = virtualDOM.body.querySelector(`[node-id="${id}"]`)
               
               new EditorText(element as HTMLElement, foundElement as HTMLElement)
          })


          body.querySelectorAll('[editable-img-id]').forEach((element) => {

               const id = element.getAttribute('editable-img-id')
               const foundElement = virtualDOM.body.querySelector(`[editable-img-id="${id}"]`)
               
               new EditorImages(element as HTMLImageElement, foundElement as HTMLImageElement)
          })
     }

     return {
          enableEditig
     }
}