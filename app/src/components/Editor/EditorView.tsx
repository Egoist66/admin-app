import React, {
  FC,
  FormEvent,
  forwardRef,
  memo,
  RefObject,
  useEffect,
} from "react";
import styled from "styled-components";
import { ModalWindow } from "../Features/Modal";
import { useToggle } from "../../hooks/useToggle";
import { Statuses } from "../../store/slice/source-slice";
import { Button, List, ListContent, ListHeader, ListItem, Progress, Segment } from "semantic-ui-react";
import { PagesList } from "../Features/PagesList";

const StyledEditor = styled.div``;

type EditorViewProps = {
  data: {
    files: string[];
    init: (e: MouseEvent | null, page: string, mount: boolean) => void
    savedMessage: string;
    save: () => void;
    currentPage: string;
    deletePage: (page: string) => void;
    inputRef: RefObject<HTMLInputElement>;
    statusCode: 0 | 1;
    createPage: (e: FormEvent<HTMLFormElement>) => void;
    status: "resolved" | "pending" | "rejected" | null;
    saveStatus: Statuses;
  };
};

export const EditorView: FC<EditorViewProps> = memo(
  forwardRef(({ data }) => {
    EditorView.displayName = "EditorView";
    const { setOpen: setOpenEdits, isToggled: isEditsOpen } = useToggle();
    const { setOpen: setOpenConfirm, isToggled: isConfirmOpen } = useToggle();

    const {
      files,
      save,
      currentPage,
      deletePage,
      inputRef,
      init,
      statusCode,
      saveStatus,
      savedMessage,
      createPage,
      status,
    } = data;

   

    useEffect(() => {
      if (status === "resolved") {
        if (statusCode === 0) {
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        }
      }
    }, [status]);

    return (
      <StyledEditor>
        {/*
               <form onSubmit={createPage}>
                    <input data-value={inputRef?.current?.value} name='filename' ref={inputRef} type="text" />
                    <button disabled={status === 'pending'} type="submit">Создать новую страницу</button>

               </form>

               {message ? <p>{message}</p>: null}
               {pages} */}
        <iframe src={currentPage} frameBorder="0"></iframe>

        <div className={"panel"}>
          <Button primary onClick={() => setOpenEdits(true)}>
            Сохранить
          </Button>
          <Button primary onClick={() => setOpenConfirm(true)}>
            Открыть
          </Button>
        </div>

        <ModalWindow
          _messageDefault="Сохранение"
          description={"Уверены сохранить изменения?"}
          buttons={[
            { type: "update", name: "Опубликовать", handler: save },
            {
              type: "cancel",
              name: "Отменить",
              handler: () => setOpenEdits(false),
            },
          ]}
          response={({ _message, hint }) => (
            <span style={{ color: hint }}>{_message}</span>
          )}
          operationStatus={saveStatus}
          open={isEditsOpen}
          _message={savedMessage}
          setOpen={setOpenEdits}
        />

        <ModalWindow
          _messageDefault="Перейти"
          description={"Открыть другие страницы?"}
          buttons={[
            {
              type: "cancel",
              name: "Отменить",
              handler: () => setOpenConfirm(false),
            },
          ]}
          response={({ _message, hint }) => (
            <span style={{ color: hint }}>{_message}</span>
          )}
          operationStatus={saveStatus}
          open={isConfirmOpen}
          render={(message, descr) => (
            <>
                {status === 'pending' ? <Progress  active={status === 'pending'} size="small" color="blue" percent={100} /> : null}
               <PagesList redirect={init} files={files} deletePage={deletePage} /> 
            
            
            
            </>
          )}
          _message={savedMessage}
          setOpen={setOpenConfirm}
        />
      </StyledEditor>
    );
  })
);
