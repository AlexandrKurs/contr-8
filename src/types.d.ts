export interface Category {
  title: string;
  id: string;
}

export interface Quote {
  id: string;
  author: string;
  category: string;
  text: string;
}
