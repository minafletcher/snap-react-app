export default function ProjectPage({ title, content }) {

    return <div className="px-40 pt-40">

        {/* PROJECT-TITLE */}
        <h1 className="text-center pb-3">{"\"" + title + "\""}</h1>

        {/* PROJECT-IMAGE */}
        <div className="pb-10 text-center"><img className="w-full h-full" src={content.image} /></div>
        
        {/* PROJECT DESCRIPTION CONTENT*/}

        {/* SYNOPSIS-WRAPPER */}
        <div className="proj-desc-wrapper">
            <h2 className="desc-title">SYNOPSIS</h2>
            <p className="desc-body">{content.synopsis}</p>
            </div>

        {/* CREDITS-WRAPPER */}
        <div className="proj-desc-wrapper">

            <h2 className="desc-title" >CREDITS</h2>

            <div className="desc-body" >
                {content.credits.map((credit, i) => {
                return <p key={i}>{credit}</p>
            })}
            </div>
        </div>

        {/* NOTES-WRAPPER */}
        <div className="proj-desc-wrapper">

            <h2 className="desc-title" >NOTES</h2>
            <p className="desc-body">{content.notes}</p>
        </div>
        <div className="proj-desc-wrapper">

            <h2 className="desc-title" >NOTES</h2>
            <p className="desc-body">{content.notes}</p>
        </div>
    </div>
}