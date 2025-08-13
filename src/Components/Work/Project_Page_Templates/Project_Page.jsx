import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

export default function ProjectPage({ title, video, content }) {

    const [open, setOpen] = React.useState(false);

    const [slideIndex, setSlideIndex] = React.useState(0);

    // image on click to open the lightbox
    const galleryClick = (open, i) => {
        setOpen(open)
        setSlideIndex(i)
    }

    return <div className="page-wrapper">
        <div className="page-padding pt-40 pb-20">

            {/* PROJECT-TITLE */}
            <div className="proj-title-wrapper"><h1>{title}</h1></div>

            {/* PROJECT-VIDEO */}
            <div
                // 16:9 aspect ratio (9/16 = 0.5625 = 56.25%)
                className="relative w-full mb-10 pb-[56.25%] h-0"
            >
                <iframe
                    src={video}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 0,
                    }}
                    allow="fullscreen; picture-in-picture"
                    allowFullScreen
                    title={title}
                />
                <img className="flex flex-col h-full items-center" src={content.image} />
            </div>

            {/* PROJECT DESCRIPTION CONTENT*/}

            <div className="flex flex-col gap-10">

                <div className="proj-section-wrapper">
                    <div className="proj-page-header"><h2>Synopsis</h2></div>
                    <p className="proj-page-content">{content.synopsis}</p>
                </div>


                {/* CREDITS */}

                <div className="proj-section-wrapper">
                    <div className="proj-page-header" ><h2>Credits</h2></div>

                    <div className="proj-page-content" >
                        {content.credits.map((credit, i) => {
                            return <p key={i}>{credit}</p>
                        })}
                    </div>
                </div>

                {/* NOTES */}
                {/* uncomment the two lines below to bring back notes */}
                {/* <div className="proj-header-wrapper"><h2 className="proj-page-header">Notes</h2></div>
                <p className="proj-page-content">{content.notes}</p> */}

                {/* IMAGES */}
                <div className="proj-section-wrapper">
                    <div className="proj-page-header"><h2>Images</h2></div>
                    <div className="proj-page-content">
                        <div className="grid gap-5 lg:grid-cols-2 grid-cols-1">
                            {content.images.map((img, i) => (
                                <div key={i} onClick={() => galleryClick(true, i)}>
                                    <img className="proj-image" src={img} alt={`image ${i}`} />
                                </div>
                            ))}
                            {content.video_posters.map((poster, i) => (
                                <div key={content.images.length + i} onClick={() => galleryClick(true, content.images.length + i)}>
                                    <img className="proj-image" src={poster} alt={`image ${i}`} />
                                </div>
                            ))}

                            <Lightbox
                                open={open}
                                index={slideIndex}
                                close={() => setOpen(false)}
                                slides={[
                                    // image slides
                                    ...content.images.map((img) => ({ src: img })),
                                    // video slides
                                    ...content.videos.map((video) => ({
                                        type: "video",
                                        width: 1280,
                                        height: 720,
                                        sources: [
                                            {
                                                src: video,
                                                type: "video/mp4",
                                            },
                                        ]
                                    }))
                                ]}
                                plugins={[Counter, Video]}
                                counter={{ container: { style: { top: "unset", bottom: 0 } } }}
                                animation={{ swipe: 0 }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div >
}