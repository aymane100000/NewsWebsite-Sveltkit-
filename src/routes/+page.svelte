
<script>

    import { onMount } from 'svelte';
    import { getLatestArticles } from '../lib/api';
    import { goto } from '$app/navigation';
    import '../global.css';
    import '../style.css';
    import { articlesStore } from '../stores.js';
    //import type { Article } from '../types/types';
    
  
  
    let searchQuery = '';
    /**
	 * @type {any[]}
	 */
    let filteredArticles = [];

  
    // onMount(async () => {
      
    //   const fetchedArticles = await getLatestArticles();
    //   fetchedArticles.forEach((/** @type {{ id: any; }} */ article, /** @type {any} */ index) => {
    //     article.id = index; 
    //   });
    //   console.log(fetchedArticles); 
    //   articlesStore.set(fetchedArticles);
    // });
    onMount(async () => {
      const fetchedArticles = await getLatestArticles();
      const articlesWithId = fetchedArticles.map((/** @type {any} */ article, /** @type {any} */ index) => {
        return { ...article, id: index }; 
      });
      console.log(articlesWithId);
      articlesStore.set(articlesWithId);
      filteredArticles = articlesWithId; 
    });


    function searchArticles() {
    filteredArticles = $articlesStore.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.abstract.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  $: if (searchQuery) {
    searchArticles();
  } else {
    filteredArticles = $articlesStore;
  }
	
	/**
	 * @param {number} articleId
	 */
	function goToArticle(articleId) {
    console.log("Navigating to article with ID:", articleId);
		goto(`/article/${articleId}`);
	}

  // Vérifie si un article est bookmarké
  /**
	 * @param {{ id: any; }} article
	 */
  function isBookmarked(article) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    return bookmarks.some((/** @type {{ id: any; }} */ b) => b.id === article.id);
  }

  /**
	 * @param {{ id: any; }} article
	 */
  function toggleBookmark(article) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const index = bookmarks.findIndex((/** @type {{ id: any; }} */ b) => b.id === article.id);

    if (index === -1) {
      bookmarks.push(article);
    } else {
      bookmarks.splice(index, 1);
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  let showSearchBar = false;

</script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

<nav class="bg-gray-800 text-white p">
  <div class="container mx-auto flex justify-between items-center">
    <a href="/" class="logo-link">
      <h2 class="text-xl font-bold text-white">OmerloNews</h2>
    </a>
    <div class="flex space-x-4 mr-5">
      <a href="/" class="hover:text-ray-300">Home</a>
      <a href="/about" >About</a>
      <a href="/bookmarks" >BookMarked</a>
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
          class="bookmark-btn {isBookmarked(article) ? 'bg-green-500' : 'bg-gray-500'} text-white font-bold py-2 px-4 rounded hover:shadow-md transition duration-300">
          {isBookmarked(article) ? 'Bookmarked' : 'Bookmark'}
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