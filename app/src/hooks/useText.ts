import {ChangeEvent, useEffect, useState} from "react";

export const useText = (initialValue: string): [string, (e: ChangeEvent<HTMLInputElement>) => void, (val: string) => void] => {
   const [text, setText] = useState<string>(initialValue)

    const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }


    return [
        text,
        handleValue,
        setText
    ]
}