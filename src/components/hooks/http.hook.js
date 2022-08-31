import { useCallback, useState } from "react";


export const useHttp = () => {
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [process,setProcess] = useState('waiting')
    
    const request = useCallback(async (url,method ='GET', body = null, headers = {'Content-Type':'application/json'}) => {
       
       
        try {
            setProcess('loading')
            const responce = await fetch(url,{method,body,headers});
            if(!responce.ok) {
                throw new Error (`Could not fetch ${url}, status ${responce.ok}`) 
               }
               const data = await responce.json()
               setLoading(false)
               return data
         } 
         catch(e) {
            setError(e.message);
            setLoading(false);
            setProcess('error')
            throw e
         }
   

    }, [])

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    return {loading,error,clearError,request,process,setProcess}
}