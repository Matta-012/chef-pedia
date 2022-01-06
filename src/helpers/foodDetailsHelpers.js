const embedYoutube = (strYoutube) => {
  if (strYoutube) {
    const youtubeId = strYoutube.split('v=')[1];
    const ampersandPosition = youtubeId.indexOf('&');
    const NEGATIV_ONE = -1;
    if (ampersandPosition !== NEGATIV_ONE) {
      youtubeId.slice(0, ampersandPosition);
    }
    return `https://www.youtube.com/embed/${youtubeId}`;
  }
  return '';
};

const copyText = (setCopiedLink) => {
  const fullPathName = window.location.href;
  navigator.clipboard.writeText(fullPathName);
  setCopiedLink(true);
  const INTERVAL_TIME = 3000;
  const timeOutId = setTimeout(() => {
    setCopiedLink(false);
    clearTimeout(timeOutId);
  }, INTERVAL_TIME);
};

export { embedYoutube, copyText };
