import { ChangeEvent } from "react"
import { adminAPI } from "../../api/service/admin-api"
import { AppDispatch, useAppDispatch } from "../../store/store"
import { Statuses, setUpload } from "../../store/app-ui-action-slice"
import { delay } from "../utils/delay"

type EditorPropsImagesElems<T> = T | null


export class EditorImages {

    private element: EditorPropsImagesElems<HTMLImageElement> = null
    private virtualElement: EditorPropsImagesElems<HTMLImageElement> = null
    private imgUploader: HTMLImageElement
    private dispatch!: AppDispatch


    constructor(dispatch: AppDispatch, element: EditorPropsImagesElems<HTMLImageElement>, virtualElement: EditorPropsImagesElems<HTMLImageElement>) {

        this.dispatch = dispatch
        this.element = element
        this.virtualElement = virtualElement
        

        this.element?.addEventListener('click', this.initEditByClick)
        this.imgUploader = document.querySelector('#img-upload') as HTMLImageElement
        
    }

    private initEditByClick = () => {


        this.imgUploader.click()
        this.imgUploader.addEventListener('change', async () => {
            //@ts-ignore
            if(this.imgUploader.files && this.imgUploader.files[0]){
                const formData = new FormData()
                //@ts-ignore
                formData.append('image', this.imgUploader.files[0])


                this.dispatch(setUpload({status: Statuses.LOADING, response: 'Загрузка...'}))
                await delay(1000)

                adminAPI.uploadImage(formData)
                .then(async (data) => {
                    console.log(data)
                    this!.virtualElement!.src = this!.element!.src = data.file.path

                    //@ts-ignore
                    this.imgUploader.value = ''

                    if(data.status === 0){
                        this.dispatch(setUpload({status: Statuses.RESOLVED, statusCode: data.status, response: data.response}))
                        await delay(3000)
                        this.dispatch(setUpload({status: Statuses.IDLE}))
                    }
                    else {
                        this.dispatch(setUpload({status: Statuses.ERROR, statusCode: data.status, response: data.response}))
                        await delay(3000)
                        this.dispatch(setUpload({status: Statuses.IDLE}))
                    }


                })
                .catch((e) => {
                    console.log(e);
                    this.dispatch(setUpload({status: Statuses.ERROR, statusCode: 1}))

                })
            }
        })
    }


}