import projects_data from "../../content/Projects/projects_data"
import { Link } from "react-router-dom"

export default function Work() {
    return <>
    
    {/* UNCOMMENT BELOW WHEN YOU WANT TO DISPLAY ALL PROJECTS BELOW SHAPES EXPERIENCE */}

        {/* <div className="page-padding">

            <h1 className="mb-10 py-10 border-b-2 border-t-2">ALL PROJECTS</h1>

            <div className="flex flex-col gap-20">
                {
                    projects_data.map((project) => {
                        return <div className="flex flex-col lg:flex-row gap-10">
                            <div className="flex flex-col h-full basis-1/2 gap-5">
                                <h2>{project.project.title}</h2>
                                <div>{project.project.content.synopsis}</div>
                                <Link to={project.project.slug} className="block w-fit py-2.5 px-5 border border-solid rounded-lg">View Project</Link>
                            </div>

                            <div className='basis-1/2'>
                                <img className="w-full aspect-video" src={project.project.thumbnail}></img>
                            </div>
                        </div>
                    })
                }
            </div>
        </div> */}
    </>
}