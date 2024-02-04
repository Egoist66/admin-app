import { useState } from "react"

type MetaProps = {
    meta: {
        title: string
        description: string
        keywords: string
    }
}

export const useMeta = () => {

    const [metaData, setMeta] = useState<MetaProps>({
        meta: {
            title: '',
            description: '',
            keywords: ''
        }
    })

    const getMeta = (vDom: Document | null) => {
        if(vDom){
            let title = vDom?.head.querySelector('title') as HTMLTitleElement || vDom?.head.append(vDom.createElement('title'))
            let keywords = vDom?.head.querySelector('meta[name="keywords"]') as HTMLMetaElement
            let description = vDom?.head.querySelector('meta[name="description"]') as HTMLMetaElement


            
            if(!keywords){
                const metaKey = vDom.createElement('meta') as HTMLMetaElement
                metaKey.setAttribute('name', 'keywords')
                
                vDom.head.append(metaKey)
            }

            if(!description){
                const metaDescr = vDom.createElement('meta') as HTMLMetaElement
                metaDescr.setAttribute('name', 'description')
                
                vDom.head.append(metaDescr)
            }

           
            

            setMeta({
                ...metaData,
                meta: {
                    ...metaData.meta,
                    title: title?.innerHTML,
                    keywords: keywords?.getAttribute('content')!,
                    description: description?.getAttribute('content')!
                }
            })
        }

      
    }

    return {
        getMeta,
        metaData
    }

}