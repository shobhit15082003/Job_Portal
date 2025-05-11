import Comapnies from "../LandingPage/Comapnies"
import DreamJob from "../LandingPage/DreamJob"
import JobCategory from "../LandingPage/JobCategory"
import Subscribe from "../LandingPage/Subscribe"
import Testimonials from "../LandingPage/Testimonials"
import Working from "../LandingPage/Working"

const HomePage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
        <div className="">

        </div>
     
      <DreamJob/>
      <Comapnies/>
      <JobCategory/>
      <Working/>
      <Testimonials/>
      <Subscribe/>
    
    </div>
  )
}

export default HomePage
