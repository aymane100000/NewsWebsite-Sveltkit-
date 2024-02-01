

<script lang="ts">
  import { onMount } from 'svelte';
  import { getLatestArticles } from '../lib/api';
  import { goto } from '$app/navigation';
  import '../global.css';
  import '../style.css';
  import { articlesStore } from '../store';
  import type { Article } from '../types/types';
  import { writable } from 'svelte/store';



  let searchQuery: string = '';
  let filteredArticles: Article[] = [];
  const bookmarksStore = writable(new Set());


  onMount(async () => {
    const fetchedArticles: Article[] = await getLatestArticles();
    fetchedArticles.forEach((article, index) => {
      article.id = index;
    });
    console.log(fetchedArticles);
    articlesStore.set(fetchedArticles);
    const storedBookmarks: Article[] = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    bookmarksStore.set(new Set(storedBookmarks.map(article => article.id)));
  });

  function searchArticles(): void {
    filteredArticles = $articlesStore.filter((article: Article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.abstract.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  $: if (searchQuery) {
    searchArticles();
  } else {
    filteredArticles = $articlesStore;
  }

  function goToArticle(articleId: number): void {
    console.log("Navigating to article with ID:", articleId);
    goto(`/article/${articleId}`);
  }

  function isBookmarked(article: Article): boolean {
    const bookmarks: Article[] = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    return bookmarks.some((b) => b.id === article.id);
  }

  function toggleBookmark(article: Article): void {
  let tempUpdatedBookmarksIds;
  bookmarksStore.update(current => {
    const updatedBookmarks = new Set(current);
    if (updatedBookmarks.has(article.id)) {
      updatedBookmarks.delete(article.id);
    } else {
      updatedBookmarks.add(article.id);
    }
    tempUpdatedBookmarksIds = Array.from(updatedBookmarks);
    return updatedBookmarks;
  });

  const bookmarksArray = Array.from(updatedBookmarks).map(id => {

    return $articlesStore.find(a => a.id === id);;

  });
  localStorage.setItem('bookmarks', JSON.stringify(bookmarksArray));
}

  let showSearchBar: boolean = false;
</script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

<nav class="bg-gray-800 text-white p">
  <div class="container mx-auto flex justify-between items-center">
    <a href="/" class="logo-link">
      <h2 class="text-xl font-bold text-white">OmerloNews</h2>
    </a>
    <div class="flex space-x-4 mr-5">
      <a href="/" class="hover:text-ray-300">Home</a>
      <a href="/bookmarks" >BookMarked</a>
      <a href="/about" >About</a>
    <i class="fas fa-search cursor-pointer" on:click={() => showSearchBar = !showSearchBar}></i>
  </div>
</div>
</nav>

{#if showSearchBar}
  <div class="search-bar-container p-4 flex justify-center items-center">
    <input type="text" bind:value={searchQuery} placeholder="Rechercher des articles..." class="search-input border-2 border-gray-300 rounded-lg p-2 mr-2">
    <button on:click={searchArticles} class="search-button bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Rechercher</button>
  </div>
{/if}
 

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
  {#each filteredArticles as article}
    <div class="article bg-white rounded-lg shadow-md overflow-hidden">
      {#if article.multimedia && article.multimedia.length > 0}
        <img src={article.multimedia[0].url} alt={article.title} class="w-full h-64 object-cover" />
      {/if}
      <div class="p-4">
        <h2 on:click={() => goToArticle(article.id)} class="cursor-pointer text-lg font-bold mb-2">
          {article.title}
        </h2>
        <p class="text-gray-600 mb-4">{article.abstract}</p>
        <p> {article.published_date}</p><br><br>
        <button 
          on:click={() => toggleBookmark(article)}
          class="bookmark-btn {$bookmarksStore.has(article.id) ? 'bg-green-500' : 'bg-gray-500'} text-white font-bold py-2 px-4 rounded hover:shadow-md transition duration-300">
          {$bookmarksStore.has(article.id) ? 'Bookmarked' : 'Bookmark'}
        </button>
      </div>
    </div>
  {/each}
</div>
<footer class="bg-gray-800 text-white py-6">
  <div class="container mx-auto text-center">
    <p>&copy; {(new Date().getFullYear())} OmerloNews. Tous droits réservés.</p>
    <div class="mt-4">
      <a href="/about" class="hover:text-gray-400 text-sm mx-2">À propos</a>
      <a href="/contact" class="hover:text-gray-400 text-sm mx-2">Contact</a>
    </div>
  </div>
</footer>