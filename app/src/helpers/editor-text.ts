export class EditorText {
    public element: HTMLElement
    public virtualElement: HTMLElement

    constructor(element: HTMLElement, virtualElement: HTMLElement) {
        this.element = element
        this.virtualElement = virtualElement

        this.element.addEventListener('click', () => this.enableEditing())
        this.element.addEventListener('blur', () => this.removeEditing())
        this.element.addEventListener('keydown', (e) => this.stopEditing(e))
        this.element.addEventListener('input', () => this.onTextEdit(this.element))

        if(this.element?.parentNode?.nodeName === 'A' || this.element?.parentNode?.nodeName === 'BUTTON'){
            this.element.addEventListener('contextmenu', (e) => this.onCtxMenuEditing(e))

        }
    }

    protected enableEditing = () => {
        this.element.setAttribute('contenteditable', 'true')
        this.element.focus()
    }

    protected removeEditing = () => {
        this.element.removeAttribute('contenteditable')
        this.element.blur()
    }

    protected stopEditing = (e: KeyboardEvent) => {
        if(e.key === 'Enter'){
            this.element.blur()
        }

    }
    protected onTextEdit = (element: HTMLElement) => {

        this.virtualElement.innerHTML = element.innerHTML

    }
    protected onCtxMenuEditing = (e: MouseEvent) => {
        e.preventDefault()
        this.enableEditing()

    }
}