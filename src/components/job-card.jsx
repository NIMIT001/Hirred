import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Heart, MapPin, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { saveJob } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";


 const JobCard = (
    {job,
    isMyJob=false,
    savedInit = false,
    onJobSaved = ()=>{},
}) => {
    const {user} = useUser()
    const [saved,setSaved] = useState(savedInit);

    const {
        fn: fnSavedJob,
        data: savedJob,
        loading: loadingSavedJob,
      } = useFetch(saveJob,{
        alreadySaved : saved,
      });

      const handleSaveJob = async()=>{
        await fnSavedJob({
            user_id:user.id,
            job_id: job.id,
        });
        onJobSaved();
      };
      useEffect(()=>{
            if(savedJob !== undefined)setSaved(saveJob?.length>0)
      },[saveJob])



  return (<Card className="flex flex-col">
    <CardHeader>
        <CardTitle className="flex justify-between font-bold">
             {job.title}
        {!isMyJob && ( 
            <Trash2Icon
            fill="red"
            size={18}
            className="text-red-300 cursor-pointer"/>
        )
    }
    </CardTitle>

    </CardHeader>
    <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
        {job.company && <img src = {job.company.logo_url} className="h-6"/>}
        <div className="flex gap-2 items-center">
            <MapPin size={15}/>{job.location}
        </div>
        </div>
        <hr />
        {job.description.substring(0,job.description.indexOf("."))}
    </CardContent>
    <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
        <Button variant="secondary" className="w-full">
            More details
        </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
          >
            {saved ? (
              <Heart size={20} fill="red" stroke="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
    </CardFooter>
  </Card>
  )
}

export default JobCard;
