import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {Instance} from "@/services/axios.ts";

const instance: Instance = new Instance();

export function useTickets() {
    const data = useQuery({
        queryKey: ["tickets"],
        queryFn: () => instance.getTickets(),
        placeholderData: keepPreviousData,
        staleTime: 30000,
    });
    if (data) {
        return data;
    }
}