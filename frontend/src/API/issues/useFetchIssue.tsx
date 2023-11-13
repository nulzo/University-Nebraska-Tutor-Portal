import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useFetchIssue() {
  async function getIssue() {
    const { data } = await axios.get("/api/issues/");
    return data;
  }
  const data = useQuery({
    queryKey: ["issues"],
    queryFn: () => getIssue(),
    placeholderData: keepPreviousData,
    staleTime: 30000,
  });
  if (data) {
    return data;
  }
}
