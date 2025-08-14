import * as React from "react";
import { useEffect, useRef } from "react";
import video_play from '../../../content/Images/video_play.png'
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

export default function ProjectPage({ title, video, content }) {

    const [open, setOpen] = React.useState(false);
    const scrollPosition = useRef(0);

    const [slideIndex, setSlideIndex] = React.useState(0);

    // HELPERS TO HANDLE SCROLL BEHAVIOR WHEN LIGHTBOX OPENS

    // disable scrolling when the lightbox is open  
    useEffect(() => {
        if (!open) return;

        // Prevent scrolling
        const preventScroll = (e) => e.preventDefault();

        window.addEventListener("wheel", preventScroll, { passive: false });
        window.addEventListener("touchmove", preventScroll, { passive: false });

        return () => {
            // Re-enable scrolling
            window.removeEventListener("wheel", preventScroll);
            window.removeEventListener("touchmove", preventScroll);
        };
    }, [open]);

    // OPEN / CLOSE FUNCTIONS FOR LIGHTBOX

    const galleryClick = (open, i) => {

        setSlideIndex(i)
        setOpen(open);
    };


    return <>
        <div className="page-wrapper">
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
                    <div className="proj-section-wrapper lg:flex-col">
                        <div className="proj-page-header"><h2>Images</h2></div>
                        <div className="proj-page-content">
                            <div className="grid gap-5 lg:grid-cols-2 grid-cols-1">
                                {content.images.map((img, i) => (
                                    <div key={i} onClick={() => galleryClick(true, i)}>
                                        <img className="proj-image" src={img} alt={`image ${i}`} />
                                    </div>
                                ))}
                                {content.video_posters.map((poster, i) => (
                                    <div
                                        className="relative"
                                        key={content.images.length + i}
                                        onClick={() => galleryClick(true, content.images.length + i)}>
                                        <div className="absolute flex w-full h-full justify-center items-center cursor-pointer">
                                            <img className="w-10 lg:w-20" src={video_play} />
                                        </div>
                                        <img className="proj-image" src={poster} alt={`image ${i}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
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
            controller={{
                closeOnBackdropClick: true
            }}
            noScroll={{ disabled: true }}
            plugins={[Counter, Video]}
            counter={{ container: { style: { top: "unset", bottom: 0 } } }}
            animation={{ swipe: 0 }}
        />
    </>
}