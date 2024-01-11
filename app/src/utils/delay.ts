export const delay = (ms: number) => {
     return new Promise((res, rej) => {
          const timer = setTimeout(() => {
               res(true)
               clearTimeout(timer)
          }, ms)
     })
}