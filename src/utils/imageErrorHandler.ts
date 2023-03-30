export const handleImageError = (e: React.BaseSyntheticEvent) => {
  e.target.onerror = null;
  e.target.src = 'https://www.computerhope.com/jargon/g/guest-user.png';
};