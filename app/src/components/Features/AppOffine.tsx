import React from "react";
import { FC } from "react";
import { Modal, Button, Header, Icon, ModalContent, ModalActions } from "semantic-ui-react";
//@ts-ignore
import { useNetworkState } from "@uidotdev/usehooks";
export const AppOffline: FC = () => {

     const {online} = useNetworkState()


     return (
          <>

               <Modal
                    basic
                    open={!online}
                    size='small'
               >
                    <Header icon>
                         <Icon name='power off' />
                         <p style={{ color: 'red' }}>Похоже, возникли неполадки с вашей сетью... Проверьте соединение</p>
                    </Header>

                    <ModalActions>


                    </ModalActions>
               </Modal>


          </>
     )
}