import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {Instance} from "@/services/axios.ts";

const instance: Instance = new Instance();

export function useAnnouncements() {
    const data = useQuery({
        queryKey: ["announcements"],
        queryFn: () => instance.getAnnouncements(),
        placeholderData: keepPreviousData,
        staleTime: 30000,
    });
    if (data) {
        return data;
    }
}