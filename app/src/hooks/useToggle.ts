import {useCallback, useState} from "react";

export const useToggle = () : [boolean, (isOpen: boolean) => void, () => void] => {
    const [isToggled, setToggle] = useState<boolean>(false)

    const setOpen = useCallback((isOpen: boolean) => {
        setToggle(isOpen)
    }, [isToggled])

    const toggle = useCallback(() => {
        setToggle(isToggled => !isToggled)
    }, [isToggled])

    return [
        isToggled,
        setOpen,
        toggle
    ]
}