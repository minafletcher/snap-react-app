import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

export default function ProjectPage({ title, content, images }) {

    const [open, setOpen] = React.useState(false);

    const [slideIndex, setSlideIndex] = React.useState(0);

    // image on click to open the lightbox
    const galleryClick = (open, i) => {
        setOpen(open)
        setSlideIndex(i)
    }

    return <div className="page-wrapper">
        <div className="page-padding pt-40">

            {/* PROJECT-TITLE */}
            <div className="proj-title-wrapper"><h1 className="proj-page-title">{title}</h1></div>

            {/* COVER-IMAGE */}
            <div className="pb-10 text-center"><img className="w-full h-full" src={content.image} /></div>

            {/* PROJECT DESCRIPTION CONTENT*/}

            <div className="grid md:gap-10 md:grid-cols-4 grid-cols-1">

                <div className="proj-header-wrapper"><h2 className="proj-page-header">Synopsis</h2></div>
                <p className="proj-page-content">{content.synopsis}</p>


                {/* CREDITS */}

                <div className="w-full"><h2 className="proj-page-header">Credits</h2></div>

                <div className="proj-page-content" >
                    {content.credits.map((credit, i) => {
                        return <p key={i}>{credit}</p>
                    })}
                </div>

                {/* NOTES */}
                {/* uncomment the two lines below to bring back notes */}
                {/* <div className="proj-header-wrapper"><h2 className="proj-page-header">Notes</h2></div>
                <p className="proj-page-content">{content.notes}</p> */}

                {/* IMAGES */}
                <div className="proj-header-wrapper"><h2 className="proj-page-header">Images</h2></div>
                <div className="proj-page-content">
                    <div className="grid gap-5 lg:grid-cols-2 grid-cols-1">
                        {images.map((img, i) => (
                            <div key={i} onClick={() => galleryClick(true, i)}>
                                <img className="w-full hover:cursor-pointer" src={img} alt={`image ${i}`} />
                            </div>
                        ))}

                        <Lightbox
                            open={open}
                            index={slideIndex}
                            close={() => setOpen(false)}
                            slides={images.map((img) => ({
                                src: img
                            }))}
                            // add ons
                            plugins={[Counter]}
                            counter={{ container: { style: { top: "unset", bottom: 0 } } }}
                            animation={{ swipe: 0 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
}