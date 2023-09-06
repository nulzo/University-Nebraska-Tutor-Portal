import Navbar from "../components/nav/Navbar";
import "../styles/home.css"
import "../styles/output.css"
import Footer from "../components/nav/Footer";
import useChangeTitle from "../components/useChangeTitle";
import OutlineButton from "../components/buttons/OutlineButton";
import Modal from "../components/Modal";


export default function Home() {
    useChangeTitle("CSLC Tutoring Portal")
    return (
        <main>
            <Navbar></Navbar>
            <h1 className={"font-light text-6xl text-center"}>Welcome to the CSLC</h1>
            <div className={"flex justify-center pt-5"}>
                <OutlineButton text={"Create Ticket"} className={"flex justify-center"}></OutlineButton>
            </div>
            <div className="flex flex-row pt-5">
                <div className="text-center basis-1/3">New</div>
                <div className="basis-1/3 text-center">In Progress</div>
                <div className="basis-1/3 text-center">Completed</div>
            </div>
            <Footer></Footer>
        </main>
    );
}