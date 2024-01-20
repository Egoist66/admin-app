import React, {FC, memo, ReactNode, useEffect, useState} from "react";
import {Button, Modal, ModalActions, ModalContent, ModalDescription, ModalHeader, Transition} from "semantic-ui-react";
import {delay} from "../../utils/delay";
import {Statuses} from "../../store/slice/source-slice";

type ModalProps = {
    onClickHandler: () => void
    saveStatus: Statuses
    savedMessage: string
    open: boolean
    setOpen: (isOpen: boolean) => void
}
export const ModalWindow: FC<ModalProps> = memo(({onClickHandler, savedMessage, open, setOpen, saveStatus}) => {
    const [message, setMessage] = useState<ReactNode | string>('Сохранение')


    useEffect(() => {
        switch (saveStatus) {
            case Statuses.PENDING:
                setMessage('Обновление...')
                break
            case Statuses.RESOLVED:
                setMessage(<span style={{color: '#2185D0'}}>{savedMessage}</span>)
                break
            case Statuses.REJECTED:
                setMessage(<span style={{color: 'red'}}>{savedMessage}</span>)
                break
            default:
                setMessage('Сохранение')
        }


    }, [saveStatus])

    useEffect(() => {
        if (saveStatus === Statuses.RESOLVED) {
            delay(1000).then(() => {
                setMessage('Сохранение')

                setOpen(false)
            })
        }
    }, [saveStatus])
    return (
        <Transition  visible={open} animation='zoom' duration={500}>

            <Modal
                centered={false}
                size={'tiny'}
                open={open}
                onClose={() => setOpen(false)}
            >
                <ModalHeader>{message}</ModalHeader>
                <ModalContent>
                    <ModalDescription>
                        Уверены сохранить изменения?
                    </ModalDescription>
                </ModalContent>
                <ModalActions>
                    <Button disabled={saveStatus === Statuses.PENDING} loading={saveStatus === Statuses.PENDING} primary
                            onClick={onClickHandler}>Опубликовать</Button>
                    <Button onClick={() => setOpen(false)}>Отменить</Button>
                </ModalActions>
            </Modal>

        </Transition>
    )
})