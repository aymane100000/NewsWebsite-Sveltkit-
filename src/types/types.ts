export interface Article {
	published_date: any;
	  multimedia: Multimedia[];
    id: number;
    title: string;
    abstract: string;
  }

  export interface Multimedia {
    url: string;
  }