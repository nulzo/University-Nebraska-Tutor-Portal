import "./style/output.css"
import Navbar from "./components/navigation/Navbar"
import { Sidebar } from "./components/navigation/Sidebar"


function App() {
  return (
    <>
      <Navbar></Navbar>
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar className="hidden lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default App
