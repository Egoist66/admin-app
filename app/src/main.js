import axios from "../../node_modules/axios/index";



function getPageList() {

     let pages = []
     axios.get('./api')
          .then(data => {

               pages = [...pages, ...data.data]
               const res = pages.map(p => {
                    return `<p>${p}</p>`
               }).join(' ')

               document.querySelector('#root').innerHTML = res

          })
  
}

getPageList()

const btn = document.querySelector('button')
btn?.addEventListener('click', () => {
     const form = document.querySelector('form')
     if (form) {
          const formData = new FormData(form)
          if (form.querySelector('input')?.value === '') {
               alert('Empty')
               return
          }

          axios.post('./api/newpage.php', formData)
               .then(data => {
                    console.log(data)
                    getPageList()
               })

     }


})
