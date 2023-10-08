import axios from "axios";
import { Component } from "react";
import UnclaimedTicket from "../tickets/UnclaimedTicket";
import ClaimedTicket from "../tickets/ClaimedTicket";
import ClosedTicket from "../tickets/ClosedTicket";

type myState = { data: any };

export default class TestViewTickets extends Component<myState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
  }

  componentDidMount(): void {
    axios.get("http://localhost:8000/api/tasks/").then((res) => {
      this.setState({ data: res.data });
    });
  }

  render() {
    return (
      <>
        <div className="grid grid-cols-3 mt-4">
          <div className="text-center font-bold text-lg">Unclaimed Tickets</div>
          <div className="text-center font-bold text-lg">Open Tickets</div>
          <div className="text-center font-bold text-lg">Closed Tickets</div>
        </div>
        <div className="divide-x-[1px] divide-gray-100 grid grid-cols-3 w-100">
          <div className="col-span-1 m-4">
            <div>
              {Object.entries(this.state.data).map(([key, val]) => (
                <>
                  {val.claimed == false && val.closed == false && (
                    <div className="pt-2">
                      <UnclaimedTicket
                        student={val.name}
                        course={val.course}
                        professor={val.professor}
                        assignment={val.assignment}
                        description={val.description}
                        starttime="12:30pm, 7th October 2023"
                        editedtime="12:34pm, 7th October 2023"
                      />
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
          <div className="col-span-1 px-4 pt-4 pb-4">
            <div className="">
              {Object.entries(this.state.data).map(([key, val]) => (
                <>
                  {val.claimed == true && val.closed == false && (
                    <div className="pt-2">
                      <ClaimedTicket
                        student={val.name}
                        course={val.course}
                        professor={val.professor}
                        assignment={val.assignment}
                        description={val.description}
                        starttime="12:30pm, 7th October 2023"
                        editedtime="12:34pm, 7th October 2023"
                      />
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
          <div className="col-span-1 px-4 pt-4 pb-4">
            <div className="">
              {Object.entries(this.state.data).map(([key, val]) => (
                <>
                  {val.closed == true && (
                    <div className="pt-2">
                      <ClosedTicket
                        student={val.name}
                        course={val.course}
                        professor={val.professor}
                        assignment={val.assignment}
                        description={val.description}
                        starttime="12:30pm, 7th October 2023"
                        editedtime="12:34pm, 7th October 2023"
                      />
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}
