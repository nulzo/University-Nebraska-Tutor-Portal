import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useFetchTutor() {
  async function getTutors() {
    const { data } = await axios.get("/api/tutors/");
    return data;
  }
  const data = useQuery({
    queryKey: ["tutors"],
    queryFn: () => getTutors(),
    placeholderData: keepPreviousData,
    staleTime: 30000,
  });
  if (data) {
    return data;
  }
}
