import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {Instance} from "@/services/axios.ts";

const instance: Instance = new Instance();

export function useProfessors() {
    const data = useQuery({
        queryKey: ["professors"],
        queryFn: () => instance.getProfessors(),
        placeholderData: keepPreviousData,
        staleTime: 30000,
    });
    if (data) {
        return data;
    }
}