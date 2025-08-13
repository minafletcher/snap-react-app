import cover_image from './migration-cover.png'

// gets all images, videos, and video posters from the "Migration" folder in the codebase
const { images, videos, video_posters } = ContentModules('Migration')

const MigrationContent = {
    image: cover_image,
    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    credits: [
        "Position Title: Full Name",
        "Position Title: Full Name",
        "Position Title: Full Name",
        "Position Title: Full Name",
        "Position Title: Full Name",
    ],
    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    images: images,
    videos: videos,
    video_posters: video_posters
}

export default MigrationContent;