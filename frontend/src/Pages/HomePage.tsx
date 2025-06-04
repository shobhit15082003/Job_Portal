import Comapnies from "../Component/LandingPage/Comapnies"
import DreamJob from "../Component/LandingPage/DreamJob"
import JobCategory from "../Component/LandingPage/JobCategory"
import Subscribe from "../Component/LandingPage/Subscribe"
import Testimonials from "../Component/LandingPage/Testimonials"
import Working from "../Component/LandingPage/Working"

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
