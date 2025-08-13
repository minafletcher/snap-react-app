import mars_and_siv_video from './Videos/mars_and_siv.mp4'
import khruangbin_video from './Videos/khruangbin.mp4'
import migration_video from './Videos/migration.mp4'
import guard_down_video from './Videos/guard_down.mp4'

import MarsSivContent from './Mars-And-Siv/mars_and_siv_content.js'
import MayNinthContent from './May-Ninth/may_ninth_content.js'
import MigrationContent from './Migration/migration_content.js'
import GuardDownContent from './Guard-Down/guard_down_content.js'

const mars_and_siv = {
    title: "Mars and Siv",
    slug: "mars-and-siv",
    thumb_video: mars_and_siv_video,
    video_url: "https://player.vimeo.com/video/1082168017?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    content: MarsSivContent
}

const khruangbin = {
    title: "May Ninth",
    slug: "may-ninth",
    thumb_video: khruangbin_video,
    video_url: "https://player.vimeo.com/video/919738412?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    content: MayNinthContent
}

const migration = {
    title: "Migration",
    slug: "migration",
    thumb_video: migration_video,
    video_url: "https://player.vimeo.com/video/1029666544?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    content: MigrationContent
}

const guard_down = {
    title: "Guard Down",
    slug: "guard-down",
    thumb_video: guard_down_video,
    video_url: "https://player.vimeo.com/video/510722179?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    content: GuardDownContent
}


const projects_data = [
    {
        key: 1,
        project: mars_and_siv
    },
    {
        key: 2,
        project: khruangbin
    },
    {
        key: 3,
        project: migration
    },
    {
        key: 4,
        project: guard_down
    },

]

export const featured_projects = [
    {
        key: 1,
        project: mars_and_siv
    },
    {
        key: 2,
        project: khruangbin
    },
    {
        key: 3,
        project: migration
    },
    {
        key: 4,
        project: guard_down
    },

]

export default projects_data