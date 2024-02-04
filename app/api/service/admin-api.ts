import axios from "axios"


type APIResponse = {
     status: 0 | 1
     files: string[]
     response: string
}

export type APIBackupResponse = {
     page: string
     backup_time: string
     backup: string
}
export const adminAPI = {
     async loadPageList(){
         const {data} =  await axios.get<string[]>('./api/fetch-pages.php')
         return data
     },

     async loadBackupList(path: string){
          const {data} = await axios.get<APIBackupResponse[]>(path)
          return data
     },

     async createNewPage(value: string){
          const {data} = await axios.post<APIResponse>('./api/new-page.php', {name: value})
          return data
     },

     async deletePage(page: string){
          const {data} = await axios.post<Omit<APIResponse, 'files'>>('./api/delete-page.php', {page})
          return data
     },

     async loadSource(page: string){
          const {data} = await axios.get<string>(`../${page}?rnd=${Math.random()}`)
          return data
     },

     async saveTemplate(html: string){
          const {data} = await axios.post<Omit<APIResponse, 'files'>>('./api/save-temp-page.php', {html})
          return data
     },

     async saveEdit(page: string, html: string){
          const {data} = await axios.post<Omit<APIResponse, 'files'>>('./api/save-edits.php', {page, html})
          return data
     },

     async restore(currenPage: string, backup: string){
          const {data} = await axios.post<Omit<APIResponse, 'files'>>('./api/restoreBackup.php', {page: currenPage, file: backup})
          return data
     }
}