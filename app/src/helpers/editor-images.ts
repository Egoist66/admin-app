import { ChangeEvent } from "react"
import { adminAPI } from "../../api/service/admin-api"

type EditorPropsImagesElems<T> = T | null


export class EditorImages {

    private element: EditorPropsImagesElems<HTMLImageElement> = null
    private virtualElement: EditorPropsImagesElems<HTMLImageElement> = null
    private imgUploader: HTMLImageElement


    constructor(element: EditorPropsImagesElems<HTMLImageElement>, virtualElement: EditorPropsImagesElems<HTMLImageElement>) {

        this.element = element
        this.virtualElement = virtualElement
        

        this.element?.addEventListener('click', this.initEditByClick)
        this.imgUploader = document.querySelector('#img-upload') as HTMLImageElement
        
    }

    private initEditByClick = () => {
        this.imgUploader.click()
        this.imgUploader.addEventListener('change', () => {
            //@ts-ignore
            if(this.imgUploader.files && this.imgUploader.files[0]){
                const formData = new FormData()
                //@ts-ignore
                formData.append('image', this.imgUploader.files[0])

                adminAPI.uploadImage(formData)
                .then(data => {
                    console.log(data)
                    this!.virtualElement!.src = this!.element!.src = data.file.path


                    //@ts-ignore

                    this.imgUploader.value = ''
                })
                .catch((e) => {
                    console.log(e);
                    
                })
            }
        })
    }


}