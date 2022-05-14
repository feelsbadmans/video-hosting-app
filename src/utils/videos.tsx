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

export const getThumbnail = (data: EntityModelVideoEntity) => {
  if (data.source.includes('youtube')) {
    const thumbnail = getYoutubeThumbnail(data.source, 'medium');

    return thumbnail;
  }

  //TODO обработка обычного видео

  return '';
};
