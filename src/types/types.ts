export interface Article {
  id: number;
  author: any;
	published_date: string;
	multimedia: Multimedia[];
  title: string;
  abstract: string;
  isBookmark:boolean;
  }

  export interface Multimedia {
    url: string;
  }