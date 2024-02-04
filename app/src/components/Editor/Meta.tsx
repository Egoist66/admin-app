import { Box, TextField, TextareaAutosize } from "@mui/material";
import React, { FC, memo, useEffect } from "react";
import { useMeta } from "../../hooks/useMeta";

export const EditorMetaInfo: FC<{virtualDom: Document | null}> = memo(({virtualDom}) => {

    EditorMetaInfo.displayName = 'MetaEditor'
    const {getMeta, metaData} = useMeta()

    useEffect(() => {
        getMeta(virtualDom)
    }, [virtualDom])

    return (
        <form style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20
        }} className="MuiFormGroup-root">

            <Box>
                <TextField value={metaData.meta.title} style={{width: '100%'}} id="title" label="Title" variant="outlined" />
            </Box>

            
            <Box display={'flex'}>
                <TextareaAutosize value={metaData.meta.keywords}  id="text-area-meta" minRows={3} style={{
                    width: '100%',
                    borderRadius: '4px',
                    resize: 'vertical'
                }} placeholder="Keywords" />
            </Box>

            <Box display={'flex'}>
                <TextareaAutosize value={metaData.meta.description}  id="text-area-meta" minRows={3} style={{
                    width: '100%',
                    borderRadius: '4px',
                    resize: 'vertical'
                }} placeholder="Description" />
            </Box>


          
            

        </form>
    )
})