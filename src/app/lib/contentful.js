import { createClient } from 'contentful';
// Debug log

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const fetchEntries = async (contentType) => {
  try {
    console.log(`Fetching entries for content type: ${contentType}`);
    const entries = await client.getEntries({ content_type: contentType });
    console.log(`Successfully fetched ${entries.items.length} entries`);
    return entries.items;
  } catch (error) {
    console.error('Error in fetchEntries:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
    }
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
    console.log('Project item fields:', item.fields); // Debug log

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

    const cardImage = item.fields.cardImage && item.fields.cardImage.fields && item.fields.cardImage.fields.file
    ? item.fields.cardImage.fields.file.url.startsWith('//')
      ? `https:${item.fields.cardImage.fields.file.url}`
      : item.fields.cardImage.fields.file.url
    : null;

    const image = item.fields.image
      ? item.fields.image.fields.file.url.startsWith('//')
        ? `https:${item.fields.image.fields.file.url}`
        : item.fields.image.fields.file.url
      : null;

    return {
      ...item.fields,
      carouselImages,
      video,
      cardImage,
      image,
    };
  } catch (error) {
    console.error('Error fetching project data:', error);
    throw error;
  }
}
