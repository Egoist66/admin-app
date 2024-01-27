import React, { memo, useEffect } from "react";
import { FC } from "react";
import {
  Segment,
  List,
  ListItem,
  ListContent,
  ListHeader,
  Button,
} from "semantic-ui-react";
import { delay } from "../../utils/delay";
import { usePages } from "../../hooks/usePages";


type PageListProps = {
    files: string[]; 
    deletePage: (page: string) => void, 
    redirect: (e: any | null, page: string, mount: boolean) => void
}

export const PagesList: FC<PageListProps> = memo(({ files, redirect, deletePage }) => {
  const pages = files.filter(item => !item.startsWith('$randTmp-page01'))



  return (
    <List divided link size="medium" celled relaxed>
        {pages.map((p, index) => (
            <ListItem className="page-item" icon>

        
                <ListContent className="file-name" key={index}>
                <a onClick={(e) => redirect(e, p, false)}  href={'#'}>{p}</a>
                    <ListHeader>
                    <a
                        style={{ color: "white" }}
                        onClick={p.startsWith('index.html') ? () => {}: () => deletePage(p)}
                        href="#"
                    >
                        <Button disabled={p.startsWith('index.html')} size="mini" primary
                        >
                        Удалить
                        </Button>
                    </a>
                    </ListHeader>
                </ListContent>
        
            

            </ListItem>
        ))}
    </List>
  );
})
