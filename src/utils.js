export const replaceImageUrl = (imageUrl) => {
  try {
    const newImageUrl = new URL(imageUrl);

    if (imageUrl.includes('media')) {
      const newUrl = `${process.env.REACT_APP_MEDIA_URL.slice(0, -6)}${newImageUrl.pathname}`;
      return newUrl;
    } else {
      return imageUrl;
    }
  } catch (error) {
    console.error('Invalid URL:', error);
    return '';
  }
};
