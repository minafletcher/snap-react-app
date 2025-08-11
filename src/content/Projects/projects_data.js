import test_image from './Images/Feathers_Mcgraw.png'
import test_video from './Videos/feathers.mp4'
import MarsSivContent from './Mars-And-Siv/mars_and_siv_content.js'
import MayNinthContent from './May-Ninth/may_ninth_content.js'
import mars_image from './Mars-And-Siv/Cover-Image/NoVacancyFinalV9_1920_noise.00_01_19_15.Still008.jpg'
import may_image from './May-Ninth/may-ninth-test.jpg'

const mars_and_siv = {
    title: "Mars and Siv",
    slug: "mars-and-siv",
    thumbnail: mars_image,
    thumb_video: test_video,
    content: MarsSivContent
}

const may_ninth = {
    title: "May 9th Music Video",
    slug: "may-ninth",
    thumbnail: may_image,
    thumb_video: test_video,
    content: MayNinthContent
}

const lorem_ipsum = {
    title: "Lorem Ipsum",
    slug: "lorem-ipsum-1",
    thumbnail: test_image,
    thumb_video: test_video,
    content: MarsSivContent
}


const projects_data = [
    {
        key: 1,
        project: mars_and_siv
    },
    {
        key: 2,
        project: may_ninth
    },
    {
        key: 3,
        project: lorem_ipsum
    },
    {
        key: 4,
        project: lorem_ipsum
    },
    {
        key: 5,
        project: lorem_ipsum
    },
    {
        key: 6,
        project: lorem_ipsum
    },
    {
        key: 7,
        project: lorem_ipsum
    }

]

export const featured_projects = [
    {
        key: 1,
        project: mars_and_siv
    },
    {
        key: 2,
        project: may_ninth
    },
    {
        key: 3,
        project: lorem_ipsum
    },
    {
        key: 4,
        project: lorem_ipsum
    },

]

export default projects_data