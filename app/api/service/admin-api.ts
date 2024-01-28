import axios from "axios"


type APIResponse = {
     status: 0 | 1
     files: string[]
     response: string
}
export const adminAPI = {
     async loadPageList(){
         const {data} =  await axios.get<string[]>('./api/fetch-pages.php')
         return data
     },

     async createNewPage(value: string){
          const {data} = await axios.post<APIResponse>('./api/new-page.php', {name: value})
          return data
     },

     async deletePage(page: string){
          const {data} = await axios.post<Omit<APIResponse, 'files'>>('./api/delete-page.php', {name: page})
          return data
     }
}