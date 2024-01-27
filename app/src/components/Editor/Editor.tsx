import { FC, useEffect } from "react";
import { EditorView } from "./EditorView";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { delay } from "../../utils/delay";
import {
  clearMessage,
  fetchPages,
  filesSelector,
} from "../../store/slice/pagelist-slice";
import "../../helpers/iframeLoader";
import {
  createTemplatePage,
  fetchSourceIndexData,
  indexSrcSelector,
} from "../../store/slice/source-slice";
import { useDom } from "../../hooks/useDom";
import { usePages } from "../../hooks/usePages";
import { useAdmin } from "../../hooks/useAdmin";
import { appInitAction } from "../../store/slice/app-init-slice";
import React from "react";

export const Editor: FC = () => {
  const dispatch = useAppDispatch();

  const {
    serializeDomToString,
    parseStringIntoDOM,
    wrapTextNodes,
    injectStyles,
  } = useDom();
  const { options, inputRef, createPage, deletePage, save } = usePages();
  const { enableEditing } = useAdmin(options);

  const {current: { currentPage }} = options;


  const { files, status, message, statusCode } = useAppSelector(filesSelector);
  const { sourceData, saveStatus, savedMessage } = useAppSelector(indexSrcSelector);

  const open = (page: string) => {
    options.current.currentPage = page;
    dispatch(fetchSourceIndexData(`../${page}?rnd=${Math.random()}`));
  };

  const init = (e: any, page: string, mount: boolean) => {
    if(e){
        e.preventDefault()
    }

    const iframe = document.querySelector("iframe") as HTMLIFrameElement;
    options.current.iframe = iframe ? iframe : null;
    open(page);

    if(mount){
        dispatch(fetchPages());
    }
  };



  const initEditor = () => {
    dispatch(appInitAction({ status: "initializing" }));
    const dom = parseStringIntoDOM(sourceData!);
    options.current.virtualDom = wrapTextNodes(dom);

    dispatch(createTemplatePage(serializeDomToString(dom)));

    try {
  
      //@ts-ignore
      options?.current?.iframe?.load("../$randTmp-page01.html", () => {
        enableEditing();
        injectStyles(options.current.iframe)
    
 
        dispatch(appInitAction({ status: "settled" }));
        delay(500).then(() => {
           dispatch(appInitAction({ status: "idle" }));
        })
      });
    } catch (e) {
      console.log(e);
    }
  };


  // Side effects

  

  useEffect(() => {

    if (sourceData) {
      initEditor();


    }
  }, [sourceData]);


  useEffect(() => {
    if (message) {
      delay(2000).then(() => {
        dispatch(clearMessage());
      });
    }
  }, [message]);

  const data = {
    status,
    inputRef,
    save,
    init,
    statusCode,
    message,
    currentPage,
    sourceData,
    createPage,
    initEditor,
    saveStatus,
    savedMessage,
    deletePage,
    files,
  };

  return (
    <>
      <EditorView data={{ ...data }} />
    </>
  );
};
