// contentful.js
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function fetchEntries(contentType) {
  const entries = await client.getEntries({
    content_type: contentType,
  });
  return entries.items;
}

export async function fetchProjectData(slug) {
  const entries = await client.getEntries({
    content_type: 'project', // Ensure this matches your content type ID in Contentful
    'fields.slug[in]': slug, // Ensure this matches the slug field in Contentful
  });

  if (!entries.items.length) {
    return null;
  }

  const item = entries.items[0];
  return {
    ...item.fields,
    carouselImages: item.fields.carouselImage ? item.fields.carouselImage.map(image => image.fields.file.url) : [],
    video: item.fields.video ? item.fields.video.fields.file.url : null,
  };
}
