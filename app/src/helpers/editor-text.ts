export class EditorText {
    public element: HTMLElement
    public virtualElement: HTMLElement

    constructor(element: HTMLElement, virtualElement: HTMLElement) {
        this.element = element
        this.virtualElement = virtualElement

        this.element.addEventListener('click', () => this.onClick())
        this.element.addEventListener('blur', () => this.onBlur())
        this.element.addEventListener('keydown', (e) => this.onKeyDown(e))
        this.element.addEventListener('input', () => {
            this.onTextEdit(this.element)
        })
    }

    protected onClick = () => {
        this.element.setAttribute('contenteditable', 'true')
        this.element.focus()
    }

    protected onBlur = () => {
        this.element.removeAttribute('contenteditable')
        this.element.blur()
    }

    protected onKeyDown = (e: KeyboardEvent) => {
        if(e.key === 'Enter'){
            this.element.blur()
        }

    }
    protected onTextEdit = (element: HTMLElement) => {

        this.virtualElement.innerHTML = element.innerHTML



    }
}