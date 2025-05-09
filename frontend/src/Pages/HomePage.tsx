import Header from "../Header/Header"
import Comapnies from "../LandingPage/Comapnies"
import DreamJob from "../LandingPage/DreamJob"
import JobCategory from "../LandingPage/JobCategory"

const HomePage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
        <div className="">

        </div>
      <Header/>
      <DreamJob/>
      <Comapnies/>
      <JobCategory/>
    </div>
  )
}

export default HomePage
