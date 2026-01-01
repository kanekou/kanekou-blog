const getFavicon = (url: string, size: 16 | 32 | 64 = 64) => {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
    url
  )}&size=${size}`;
};

export default getFavicon;
