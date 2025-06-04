import { Button, Divider, FileInput, LoadingOverlay, Notification, NumberInput, rem, Textarea, TextInput } from "@mantine/core"
import { IconCheck, IconPaperclip } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";


const ApplyJobComp = () => {
    const [preview, setPreview]=useState<boolean>(false);
    const [submit,setSubmit]=useState<boolean>(false);
    const [second,setSecond]=useState<number>(5);
    const navigate=useNavigate();
    const handlePreview=()=>{
        setPreview(!preview);
        window.scrollTo({top:0,behavior:'smooth'});
    }
    const handleSubmit=()=>{
        setSubmit(true);
        let x=5;
        setInterval(()=>{
            x--;
            setSecond(x);
            if(x==0){
                navigate('/find-jobs');
            }
        },1000)

    }
  return (
    <>
    <div className="w-2/3 mx-auto ">
    <LoadingOverlay className="!fixed " visible={submit} zIndex={1000} overlayProps={{radius:"sm",blur:2}} loaderProps={{color:'brightSun.4', type:'bars'}}/>
      <div className="flex justify-between ">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-mine-shaft-800 rounded-xl ">
            <img className="h-14" src={`/Icons/Google.png`} alt="" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-2xl">Software Engineer III</div>
            <div className="text-lg text-mine-shaft-300 ">
              Google &bull; 3 days ago &bull; 48 Applicants
            </div>
          </div>
        </div>
      </div>
        <Divider my="xl"/>
        <div className="text-xl font-semibold mb-5 ">Submit Your Application</div>
        <div className="flex flex-col gap-5 ">
            <div className="flex gap-10 [&>*]:w-1/2 ">
                <TextInput readOnly={preview?true:false} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold ":""}`} label="Full Name" withAsterisk placeholder="Enter your Name"/>
                <TextInput readOnly={preview?true:false} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold ":""}`} label="Email" withAsterisk placeholder="Enter your Email"/>
            </div>
            <div className="flex gap-10 [&>*]:w-1/2 ">
                <NumberInput readOnly={preview?true:false} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold ":""}`} label="Phone Number" min={0} max={9999999999} clampBehavior="strict" hideControls withAsterisk placeholder="Enter your phone number"/>
                <TextInput readOnly={preview?true:false} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold ":""}`} label="Personal website" withAsterisk placeholder="Enter your Url"/>
            </div>
            <FileInput readOnly={preview?true:false} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold ":""}`} withAsterisk leftSection={<IconPaperclip stroke={1.5}/>} label="Attach Your Resume" placeholder="Your Resume" leftSectionPointerEvents="none"  />
            <Textarea readOnly={preview?true:false} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold ":""}`} withAsterisk autosize minRows={4} placeholder="Write Something About Yourself...." label="Cover Letter" />
            {!preview && <Button onClick={handlePreview}  color='brightSun.4' variant='light'>Preview</Button>}
            {
                preview && <div className="flex gap-10 [&>*w-1/2]">
                    <Button fullWidth onClick={handlePreview}  color='brightSun.4' variant='outline'>Edit</Button>
                    <Button fullWidth onClick={handleSubmit}  color='brightSun.4' variant='light'>Submit</Button>
                </div>
            }
        </div>
    </div>
    <Notification  withBorder className={`!border-bright-sun-400 !fixed top-0 left-[35%]  transition duration-300 ease-in-out z-[1001] ${submit?"translate-y-0":"-translate-y-20"}`} icon={<IconCheck style={{width:rem(20), height: rem(20)}}/>} color="teal" title="Application Submitted!" mt="md" withCloseButton={false}>Redirecting to Find Jobs in {second} second...</Notification>
    </>
  )
}

export default ApplyJobComp
