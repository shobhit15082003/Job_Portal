import Header from "../Header/Header"
import Comapnies from "../LandingPage/Comapnies"
import DreamJob from "../LandingPage/DreamJob"
import JobCategory from "../LandingPage/JobCategory"
import Testimonials from "../LandingPage/Testimonials"
import Working from "../LandingPage/Working"

const HomePage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
        <div className="">

        </div>
      <Header/>
      <DreamJob/>
      <Comapnies/>
      <JobCategory/>
      <Working/>
      <Testimonials/>
    </div>
  )
}

export default HomePage
