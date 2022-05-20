import { EntityModelVideoEntity } from 'api_generated';

type Quality = 'low' | 'medium' | 'high';

const getYoutubeThumbnail = (url: string, quality: Quality) => {
  let video_id, result;

  if ((result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))) {
    video_id = result.pop();
  } else if ((result = url.match(/youtu.be\/(.{11})/))) {
    video_id = result.pop();
  }

  if (video_id) {
    if (typeof quality == 'undefined') {
      quality = 'high';
    }

    let quality_key = 'mqdefault'; // Max quality
    if (quality == 'low') {
      quality_key = 'sddefault';
    } else if (quality == 'medium') {
      quality_key = 'mqdefault';
    } else if (quality == 'high') {
      quality_key = 'hqdefault';
    }

    const thumbnail = 'http://img.youtube.com/vi/' + video_id + '/' + quality_key + '.jpg';

    return thumbnail;
  }

  return '';
};

// const getNormalThumbnail = (src: string) => {
//   const videoPlayer = document.createElement('video');
//   videoPlayer.setAttribute('src', src);
//   videoPlayer.load();
//   // load metadata of the video to get video duration and dimensions
//   videoPlayer.addEventListener('loadedmetadata', () => {
//     setTimeout(() => {
//       videoPlayer.currentTime = videoPlayer.duration / 2;
//     }, 200);
//     // extract video thumbnail once seeking is complete
//     videoPlayer.addEventListener('seeked', () => {
//       // define a canvas to have the same dimension as the video
//       const canvas = document.createElement('canvas');
//       canvas.width = videoPlayer.videoWidth;
//       canvas.height = videoPlayer.videoHeight;
//       // draw the video frame to canvas
//       const ctx = canvas.getContext('2d');
//       ctx?.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
//       // return the canvas image as a blob

//       return canvas.toDataURL('image/jpeg');
//     });
//   });
// };

export const getThumbnail = (data: EntityModelVideoEntity) => {
  if (data.source.includes('youtube')) {
    const thumbnail = getYoutubeThumbnail(data.source, 'medium');

    return thumbnail;
  }

  return data.source;
};
