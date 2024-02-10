import { Box, Button, TextField, TextareaAutosize } from "@mui/material";
import React, { ChangeEvent, FC, memo, useEffect } from "react";
import { useMeta } from "../../hooks/useMeta";
import { useAppSelector } from "../../../store/store";
import { Statuses, editorSelector } from "../../../store/app-ui-action-slice";

type EditorMetaInfoProps = {
  virtualDom: Document | null;
  getMeta?: (vDom: Document | null) => void;
  save: () => Promise<void>;
  onChangeMeta?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export const EditorMetaInfo: FC<EditorMetaInfoProps> = ({
  virtualDom,
  save,
}) => {
  EditorMetaInfo.displayName = "EditorMetaInfo";

  const { getMeta, applyMeta, metaData, onChangeMeta } = useMeta(virtualDom);
  const {editing} = useAppSelector(editorSelector)

  useEffect(() => {
    if (virtualDom) {
      getMeta();
    }
  }, [virtualDom]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
      className="MuiFormGroup-root"
    >
      <Box>
        <TextField
          onChange={onChangeMeta}
          name="title"
          value={metaData.meta.title}
          style={{ width: "100%" }}
          id="title"
          label="title"
          variant="outlined"
        />
      </Box>

      <Box display={"flex"}>
        <TextareaAutosize
          onChange={onChangeMeta}
          name="keywords"
          value={metaData.meta.keywords}
          id="text-area-meta"
          minRows={3}
          style={{
            width: "100%",
            borderRadius: "4px",
            resize: "vertical",
          }}
          placeholder="meta keywords"
        />
      </Box>

      <Box display={"flex"}>
        <TextareaAutosize
          onChange={onChangeMeta}
          name="description"
          value={metaData.meta.description}
          id="text-area-meta"
          minRows={3}
          style={{
            width: "100%",
            borderRadius: "4px",
            resize: "vertical",
          }}
          placeholder="meta description"
        />
      </Box>

      <Box display={'flex'} justifyContent={'flex-end'}>
        <Button
          variant="outlined"
          disabled={editing.status === Statuses.LOADING}
          size="large"
          color="primary"
          onClick={() => applyMeta(save)}
        >
          {editing.status === Statuses.LOADING ? 'Применение...' : 'Применить'}
        </Button>
      </Box>
    </form>
  );
};
