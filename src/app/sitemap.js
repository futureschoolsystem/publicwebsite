export default function sitemap() {
  const base = 'https://futureschoolsystem.pk';
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/events-and-announcements`, lastModified: new Date() },
    { url: `${base}/about-us`, lastModified: new Date() },
    { url: `${base}/contact-us`, lastModified: new Date() },
    // add any other important pages here
  ];
}
