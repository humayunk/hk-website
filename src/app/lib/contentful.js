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

export async function fetchPitchData(slug) {
  try {
    console.log('Fetching pitch data for slug:', slug); // Debug log
    const entries = await client.getEntries({
      content_type: 'pitch',
      'fields.slug[in]': slug,
    });

    console.log('Fetched pitch data:', entries); // Debug log

    if (!entries.items.length) {
      return null;
    }

    const item = entries.items[0];

    // Construct the URL for the video and logo fields if they exist
    const videoUrl = item.fields.video
      ? item.fields.video.fields.file.url.startsWith('//')
        ? `https:${item.fields.video.fields.file.url}`
        : item.fields.video.fields.file.url
      : null;

    const logoUrl = item.fields.logo
      ? item.fields.logo.fields.file.url.startsWith('//')
        ? `https:${item.fields.logo.fields.file.url}`
        : item.fields.logo.fields.file.url
      : null;

    console.log('Video URL:', videoUrl); // Debug log
    console.log('Logo URL:', logoUrl); // Debug log

    return {
      company: item.fields.company,
      person: item.fields.person,
      job: item.fields.job,
      logo: logoUrl,
      slug: item.fields.slug,
      video: videoUrl,
    };
  } catch (error) {
    console.error('Error fetching pitch data:', error);
    throw error;
  }
}
