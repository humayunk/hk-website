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
    'fields.slug': slug,
  });

  return entries.items.map((item) => ({
    ...item.fields,
    carouselImages: item.fields.carouselImage.map(image => image.fields.file.url)
  }))[0];
}
