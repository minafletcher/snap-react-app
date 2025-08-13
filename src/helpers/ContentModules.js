// helper function for gathering image, video and video poster files from the specified folder path
export function ContentModules(path_name) {

    const path = path_name

    // only works in Vite -> automatically imports all images in a folder
    const imageModules = import.meta.glob(
        '../../**/Images/*.{png,jpg,jpeg,gif}',
        { eager: true }
    );

    const images = Object.entries(imageModules)
        .filter(([filePath]) => filePath.includes(path + '/Images/'))
        .sort(([a], [b]) => a.localeCompare(b)) // sort videos by file path
        .map(([, mod]) => mod.default);

    const videoModules = import.meta.glob(
        '../../**/Videos/*.{mp4,MP4,mov,MOV}',
        { eager: true }
    );

    const videos = Object.entries(videoModules)
        .filter(([filePath]) => filePath.includes(path + '/Videos/'))
        .sort(([a], [b]) => a.localeCompare(b)) // sort videos by file path
        .map(([, mod]) => mod.default);

    const video_poster_modules = import.meta.glob(
        '../../**/Videos/Posters/*.{jpg,png,jpeg}',
        { eager: true }
    );

    const video_posters = Object.entries(video_poster_modules)
        .filter(([filePath]) => filePath.includes(path + '/Videos/Posters/'))
        .sort(([a], [b]) => a.localeCompare(b)) // sort by file path
        .map(([, mod]) => mod.default);

    return { images, videos, video_posters }
}