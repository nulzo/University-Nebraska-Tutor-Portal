import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {Instance} from "@/services/axios.ts";

const instance: Instance = new Instance();

export function useHours() {
    const data = useQuery({
        queryKey: ["hours"],
        queryFn: () => instance.getHours(),
        placeholderData: keepPreviousData,
        staleTime: 30000,
    });
    if (data) {
        return data;
    }
}