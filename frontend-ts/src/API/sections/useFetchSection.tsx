import axios from "axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useFetchSection() {
    async function getSection() {
        const { data } = await axios.get('http://localhost:6969/api/sections/')
        return data
    }
    const data = useQuery({
        queryKey: ["sections"],
        queryFn: () => getSection(),
        placeholderData: keepPreviousData,
        staleTime: 30000,
    })
    if (data) {
        return data
    }
}