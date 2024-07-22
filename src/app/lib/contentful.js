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
    console.log('Fetching pitch data for slug:', slug);
    const entries = await client.getEntries({
      content_type: 'pitch',
      'fields.slug[in]': slug,
    });

    console.log('Fetched pitch data:', entries);

    if (!entries.items.length) {
      return null;
    }

    const item = entries.items[0];

    const ensureAbsoluteUrl = (url) => {
      return url.startsWith('//') ? `https:${url}` : url;
    };

    const videoUrl = item.fields.video
      ? ensureAbsoluteUrl(item.fields.video.fields.file.url)
      : null;

    const logoUrl = item.fields.logo
      ? ensureAbsoluteUrl(item.fields.logo.fields.file.url)
      : null;

    console.log('Video URL:', videoUrl);
    console.log('Logo URL:', logoUrl);

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
    console.log('Fetching project data for slug:', slug);
    const entries = await client.getEntries({
      content_type: 'project',
      'fields.slug[in]': slug,
    });

    console.log('Fetched project data:', entries);

    if (!entries.items.length) {
      return null;
    }

    const item = entries.items[0];
    console.log('Project item fields:', item.fields);

    const ensureAbsoluteUrl = (url) => {
      return url.startsWith('//') ? `https:${url}` : url;
    };

    const carouselImages = item.fields.carouselImage
      ? item.fields.carouselImage.map(image => ensureAbsoluteUrl(image.fields.file.url))
      : [];

    const video = item.fields.video
      ? ensureAbsoluteUrl(item.fields.video.fields.file.url)
      : null;

    const cardImage = item.fields.cardImage && item.fields.cardImage.fields && item.fields.cardImage.fields.file
      ? ensureAbsoluteUrl(item.fields.cardImage.fields.file.url)
      : null;

    const image = item.fields.image
      ? ensureAbsoluteUrl(item.fields.image.fields.file.url)
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

export async function fetchBlogPosts() {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      order: '-fields.publishDate',
    });

    const ensureAbsoluteUrl = (url) => {
      return url && url.startsWith('//') ? `https:${url}` : url;
    };

    return entries.items.map(item => {
      return {
        title: item.fields.title,
        slug: item.fields.slug,
        blurb: item.fields.blurb || 'No blurb available',
        publishDate: item.fields.publishDate,
        author: item.fields.author,
        tags: item.fields.tags || [],
        featuredImage: ensureAbsoluteUrl(item.fields.featuredImage?.fields?.file?.url),
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

export async function fetchBlogPost(slug) {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
    });

    if (!entries.items.length) {
      return null;
    }

    const item = entries.items[0];
    const ensureAbsoluteUrl = (url) => {
      return url && url.startsWith('//') ? `https:${url}` : url;
    };

    return {
      title: item.fields.title,
      blurb: item.fields.blurb,
      content: item.fields.content,
      publishDate: item.fields.publishDate,
      author: item.fields.author,
      tags: item.fields.tags,
      featuredImage: ensureAbsoluteUrl(item.fields.featuredImage?.fields?.file?.url),
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
}
