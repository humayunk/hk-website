import { createClient } from 'contentful';

const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const fetchEntries = async (contentType) => {
  const entries = await client.getEntries({ content_type: contentType });
  return entries.items;
};

export async function fetchProjectData(slug) {
  const entries = await client.getEntries({
    content_type: 'project',
    'fields.slug[in]': slug,
  });

  if (!entries.items.length) {
    return null;
  }

  const item = entries.items[0];
  const carouselImages = item.fields.carouselImage
    ? item.fields.carouselImage.map(image => {
        const url = image.fields.file.url;
        const finalUrl = url.startsWith('//') ? `https:${url}` : url;
        console.log('Image URL:', finalUrl); // Add this line for logging
        return finalUrl;
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
}
