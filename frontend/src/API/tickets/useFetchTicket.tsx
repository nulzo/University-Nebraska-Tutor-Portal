import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useFetchTicket(type = "all", query = "") {
  async function getTicket() {
    const { data } = await axios.get("/api/tickets/" + query);
    return data;
  }
  const data = useQuery({
    queryKey: [`${type}-ticket`],
    queryFn: () => getTicket(),
    placeholderData: keepPreviousData,
    staleTime: 30000,
    refetchInterval: 1000,
  });
  if (data) {
    return data;
  }
}
