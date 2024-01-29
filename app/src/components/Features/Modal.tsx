import React, {FC, memo, ReactNode, useEffect, useState} from "react";
import {Button, Modal, ModalActions, ModalContent, ModalDescription, ModalHeader, Transition} from "semantic-ui-react";
import {delay} from "../../utils/delay";
import { Statuses } from "../../hooks/useCatchUI";

type ModalProps = {
    operationStatus: Statuses
    description: ReactNode
    buttons: Array<{type: 'cancel' | 'update', name: string, handler: (arg?: any) => void}>
    render?: (...data: any) => ReactNode
    _message: string
    _messageDefault: string
    response: ({_message, hint}: {_message: string, hint?: string}) => ReactNode
    open: boolean
    setOpen: (isOpen: boolean) => void
}
export const ModalWindow: FC<ModalProps> = memo(({
    response,
    _message,
    _messageDefault,
    description,
    render,
    buttons,
    open, 
    setOpen,
    operationStatus}) => {
        
    const [message, setMessage] = useState<ReactNode | string>(_messageDefault)


    useEffect(() => {
        switch (operationStatus) {
            case Statuses.LOADING:
                setMessage(response({_message}))
                break
            case Statuses.RESOLVED:
                setMessage(<span>{response({_message, hint: '#2185D0'})}</span>)
                break
            case Statuses.ERROR:
                setMessage(<span>{response({_message, hint: 'red'})}</span>)
                break
            default:
                setMessage(_messageDefault)
        }


    }, [operationStatus])

    useEffect(() => {
        if (operationStatus === Statuses.RESOLVED) {
            delay(1000).then(() => {
                setMessage(_messageDefault)

                setOpen(false)
            })
        }
    }, [operationStatus, message])

    Modal.displayName = 'AdminModal'



    return (
        <Transition  visible={open} animation='zoom' duration={500}>

            <Modal
                centered={false}
                size={'tiny'}
                open={open}
                onClose={() => setOpen(false)}
            >
                {render ? render(message, description, buttons, open) :
                  <>
                  
                   <ModalHeader>{message}</ModalHeader>
                        <ModalContent>
                            <ModalDescription>
                                {description}
                        </ModalDescription>
                   </ModalContent>
                  
                  </>
                }
                <ModalActions>
                    {buttons.map(btn => (
                        <Button key={btn.name} disabled={btn.type === 'update' && operationStatus === Statuses.LOADING} loading={btn.type === 'update' && operationStatus === Statuses.LOADING} primary
                        onClick={btn.handler}>{btn.name}</Button>
               
                    ))}
                </ModalActions>
            </Modal>

        </Transition>
    )
})