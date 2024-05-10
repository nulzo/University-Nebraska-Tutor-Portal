import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {Instance} from "@/services/axios.ts";

const instance: Instance = new Instance();

export function useCourses() {
    const data = useQuery({
        queryKey: ["courses"],
        queryFn: () => instance.getCourses(),
        placeholderData: keepPreviousData,
        staleTime: 30000,
    });
    if (data) {
        return data;
    }
}