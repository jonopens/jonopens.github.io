type Url = string;

export interface BasicProps {
  title: string,
  description: string,
  canonicalUrl: Url,
  ogImageUrl?: Url,
}

export interface ExperimentProps {
  experimentTitle: string,
  description: string,
  canonicalUrl: Url,
  libraryUrls?: Url[],
}