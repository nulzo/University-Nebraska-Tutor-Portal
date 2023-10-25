import useFetchProfessor from "@/API/professors/useFetchProfessor";

export default function ProfileView() {
    const data = useFetchProfessor();
    console.log(data?.isLoading)
    return (
        <></>
    )
}
