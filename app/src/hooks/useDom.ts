
export const useDom = () => {
    const parseStringIntoDOM = (dom: string) => {
        const parser = new DOMParser()
        return parser.parseFromString(dom, "text/html");

    }

    const injectStyles = (iframe: HTMLIFrameElement| null) => {
        const style = iframe!.contentDocument?.createElement('style')
        style!.innerHTML = `
        
            text-editor:hover {
                outline: 3px solid orange;
                outline-offset: 8px;
            }
            
            text-editor:focus {
                outline: 3px solid red;
                outline-offset: 8px;
            }
            
            .main h1,h2,h3,h4 {
              overflow: unset !important;
            }

            [editable-img-id]:hover {
                outline: 3px solid orange;
                outline-offset: 8px;
            }
          
        
        `
        if(iframe){
            iframe?.contentDocument?.head.append(style!)

        }
    }

    const wrapTextNodes = (dom: Document) => {

        const body = dom.body as HTMLBodyElement
        const textNodes: ChildNode[] = []

        function recurMatchNodes(element: HTMLBodyElement | ChildNode) {
            element?.childNodes.forEach(node => {
                if (node.nodeName === '#text' && node.nodeValue!.replace(/\s+/g, '').length > 0) {
                    textNodes?.push(node)
                    return
                } else {
                    recurMatchNodes(node)

                }


            })
        }


        recurMatchNodes(body)
        textNodes.forEach((tnode, i: number) => {

            const wrapper = dom.createElement('text-editor') as HTMLElement
            tnode.parentNode?.replaceChild(wrapper, tnode)
            wrapper.appendChild(tnode)
            wrapper.textContent = tnode.textContent?.trim()!
            wrapper.setAttribute('node-id', String(i))
        })

        return dom
    }

    const unwrapTextNodes = (dom: Document | any) => {
        try {
            const customWrapper = dom.body.querySelectorAll('text-editor') as NodeList
            customWrapper.forEach(elem => {
            elem.parentNode?.replaceChild(elem.firstChild!, elem)
            })
        }
        catch(e){
            console.log(e);
        }
    }

    const serializeDomToString = (dom: Document | Node) => {
        const serializer = new XMLSerializer()
        return serializer.serializeToString(dom)
    }

    const wrapImages = (dom: Document) => {

       
        const images = dom.body.querySelectorAll('img')
        images.forEach((img, i) => {
            img.setAttribute('editable-img-id', String(i))
        })

        return dom
        
        
       
    }


    const unwrapImages = (dom: any) => {

        try {
            const images = dom.body.querySelectorAll('[editable-img-id]')
            images.forEach((img: HTMLImageElement) => {
                img.removeAttribute('editable-img-id')
            })

      
        }
        catch(e){
            console.log(e);
        }
       
    }

    return {
        parseStringIntoDOM,
        wrapImages,
        unwrapImages,
        wrapTextNodes,
        unwrapTextNodes,
        serializeDomToString,
        injectStyles
    }
}