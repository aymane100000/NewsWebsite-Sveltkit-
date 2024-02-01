import { writable } from 'svelte/store';
import type { Article } from './types/types';


export const articlesStore = writable<Article[]>([]);


