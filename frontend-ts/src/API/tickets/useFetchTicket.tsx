import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useFetchTicket() {
  async function getTicket() {
    const { data } = await axios.get("http://localhost:6969/api/tickets/");
    return data;
  }
  const data = useQuery({
    queryKey: ["tickets"],
    queryFn: () => getTicket(),
    placeholderData: keepPreviousData,
    staleTime: 30000,
  });
  if (data) {
    return data;
  }
}
