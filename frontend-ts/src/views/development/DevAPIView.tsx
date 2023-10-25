import useFetchProfessor from "@/API/professors/useFetchProfessor"
import useFetchTicket from "@/API/tickets/useFetchTicket";
import useFetchTutor from "@/API/tutors/useFetchTutor";

export default function DevAPIView() {
    const professors = useFetchProfessor();
    const tutors = useFetchTutor();
    const tickets = useFetchTicket();
    return (
        <>
            <p>
                {!tickets?.isLoading && console.log(tickets.data)}
            </p>
        </>
    )
}