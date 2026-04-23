const CLOUD_NAME = 'dklu1pviz';
const ROOT_FOLDER = 'torq';

/**
 * Generates a Cloudinary URL for a given path within the 'torq' folder.
 * Example: getCloudinaryUrl('hero-videos/drift-night', 'video')
 */
export function getCloudinaryUrl(path: string, type: 'image' | 'video' = 'image') {
  // Clean the path (remove leading slash if present)
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // For TOR'Q, all assets are in the 'torq' subfolder
  // We use the full public_id: torq/folder/filename
  return `https://res.cloudinary.com/${CLOUD_NAME}/${type}/upload/${ROOT_FOLDER}/${cleanPath}`;
}
