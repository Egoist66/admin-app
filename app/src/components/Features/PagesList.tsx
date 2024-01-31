import React, { memo, useEffect } from "react";
import { FC } from "react";
import { delay } from "../../utils/delay";


type PageListProps = {
    files: string[]; 
    deletePage: (page: string) => void, 
    redirect: (e: any | null, page: string, mount: boolean) => void
}

export const PagesList: FC<PageListProps> = memo(({ files, redirect, deletePage }) => {
  const pages = files.filter(item => !item.startsWith('$randTmp-page01'))



  return (
    <></>
  );
})
