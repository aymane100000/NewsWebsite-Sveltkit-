
import type { Article } from '../types/types';
import { articlesStore } from '../store';
import { get } from 'svelte/store';

export async function getLatestArticles(): Promise<Article[]> {
    try {
        const response = await fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=R6BE8lH4n2qzsBBAJUL7PlxIT25YPr0P');
        const data = await response.json();
        console.log(data);
        return data.results as Article[];
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}



export function loadArticleFromStore(id: number): Article | null {

    const articles = get(articlesStore);

    const article = articles.find(a => a.id === id) || null;

    if (article) {

        localStorage.setItem('currentArticle', JSON.stringify(article));
    }

    return article;
}