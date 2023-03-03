type Url = string;

export interface PostProps {
  title: string,
  description: string,
  canonicalUrl: Url,
  ogImageUrl: Url,
}