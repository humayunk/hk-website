import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const fetchEntries = async (contentType) => {
  try {
    console.log('Fetching entries for content type:', contentType); // Debug log
    const entries = await client.getEntries({ content_type: contentType });
    console.log('Fetched entries:', entries); // Debug log
    return entries.items;
  } catch (error) {
    console.error('Error fetching entries:', error);
    throw error;
  }
};

export async function fetchProjectData(slug) {
  try {
    console.log('Fetching project data for slug:', slug); // Debug log
    const entries = await client.getEntries({
      content_type: 'project',
      'fields.slug[in]': slug,
    });

    console.log('Fetched project data:', entries); // Debug log

    if (!entries.items.length) {
      return null;
    }

    const item = entries.items[0];
    const carouselImages = item.fields.carouselImage
      ? item.fields.carouselImage.map(image => {
          const url = image.fields.file.url;
          return url.startsWith('//') ? `https:${url}` : url;
        })
      : [];
    const video = item.fields.video
      ? item.fields.video.fields.file.url.startsWith('//')
        ? `https:${item.fields.video.fields.file.url}`
        : item.fields.video.fields.file.url
      : null;

    return {
      ...item.fields,
      carouselImages,
      video,
    };
  } catch (error) {
    console.error('Error fetching project data:', error);
    throw error;
  }
}
