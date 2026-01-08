import {useQuery} from "@tanstack/react-query";
import {getAdvById} from "../api/api.ts";


export const useAdvertsById = (id:string = '') => {


    return useQuery({
        queryFn: () => getAdvById(id),
        queryKey: ['ads:id', id],
    })

}
