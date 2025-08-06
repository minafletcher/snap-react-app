import cover_image from './Cover-Image/NoVacancyFinalV9_1920_noise.00_01_19_15.Still008.jpg'

// only works in Vite -> automatically imports all images in a folder
const imageModules = import.meta.glob(
    './Assets/*.{png,jpg,jpeg}',
    { eager: true }
);

const images = Object.values(imageModules).map((mod) => mod.default);

const MarsSivContent = {
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
    images: images
}

export default MarsSivContent;