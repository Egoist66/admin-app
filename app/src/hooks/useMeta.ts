import { ChangeEvent, useRef, useState } from "react"

type MetaProps = {
    meta: {
        title: string
        description: string
        keywords: string
    }
}

export const useMeta = (vDom: Document | null) => {

    const [elements, setElements] = useState<any>({
        title: vDom?.head.querySelector('title') as HTMLTitleElement || vDom?.head.append(vDom.createElement('title')),
        metaDescr:  vDom?.head.querySelector('meta[name="description"]'),
        metaKey: vDom?.head.querySelector('meta[name="keywords"]')
    })
    const [metaData, setMeta] = useState<MetaProps>({
        meta: {
            title: '',
            description: '',
            keywords: ''
        }
    })

    const getMeta = () => {
       

        if(!elements.metaKey){
            const metaKey = vDom!.createElement('meta') as HTMLMetaElement
            metaKey.setAttribute('name', 'keywords')
            metaKey.setAttribute('content', '')
            setElements({
                ...elements,
                metaKey
            })
            
            vDom?.head.append(metaKey)
        }


        if(!elements.metaDescr){
            const metaDescr = vDom!.createElement('meta') as HTMLMetaElement
            metaDescr.setAttribute('name', 'description')
            metaDescr.setAttribute('content', '')

            setElements({
                ...elements,
                metaDescr
            })
            
            vDom?.head.append(metaDescr)
        }

        setMeta({
            ...metaData,
            meta: {
                ...metaData.meta,
                title: elements.title?.innerHTML,
                keywords: elements.metaKey?.getAttribute('content')!,
                description: elements.metaDescr?.getAttribute('content')!
            }
        })
    

      
    }

    const onChangeMeta = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMeta({
            ...metaData,
            meta: {
                ...metaData.meta,
                [e.currentTarget.name]: e.currentTarget.value
            }
        })
    }

    const applyMeta = (afterApply: () => void) => {
        elements.title.innerHTML = metaData.meta.title
        elements.metaKey?.setAttribute('content', metaData.meta.keywords)
        elements.metaDescr?.setAttribute('content', metaData.meta.description)

        afterApply()
    }

    return {
        getMeta,
        onChangeMeta,
        applyMeta,
        metaData
    }

}