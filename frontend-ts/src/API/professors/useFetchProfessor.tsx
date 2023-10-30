import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useFetchProfessor() {
  async function getProfessors() {
    const { data } = await axios.get("/api/professors/");
    return data;
  }
  const data = useQuery({
    queryKey: ["professors"],
    queryFn: () => getProfessors(),
    placeholderData: keepPreviousData,
    staleTime: 30000,
  });
  if (data) {
    return data;
  }
}
