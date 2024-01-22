<script lang="ts">
  import { onMount } from 'svelte';
  import type { Article } from '../../types/types';
  let bookmarks: Article[] = [];

  onMount(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];
  });
</script>

<nav class="bg-gray-800 text-white p">
  <div class="container mx-auto flex justify-between items-center">
    <a href="/" class="logo-link">
      <h2 class="text-xl font-bold text-white">OmerloNews</h2>
    </a>
    <div class="flex space-x-4 mr-5">
      <a href="/" class="hover:text-ray-300">Home</a>
      <a href="/about" >About</a>
      <a href="/bookmarks" >BookMarked</a>
    </div>
  </div>
</nav>
<div class="min-h-screen bg-gray-100 py-10">
  <div class="container mx-auto px-4">
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Mes Articles Bookmarkés</h1>

    {#if bookmarks.length === 0}
       <p class="text-center text-gray-600">Aucun article bookmarké.</p>
    {:else}
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each bookmarks as bookmarkedArticle}
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            {#if bookmarkedArticle.multimedia && bookmarkedArticle.multimedia.length > 0}
            <img src={bookmarkedArticle.multimedia[0].url} alt={bookmarkedArticle.title} class="w-full h-64 object-cover"/>
            {/if}
            <div class="p-4">
              <h2 class="text-xl font-semibold mb-2">{bookmarkedArticle.title}</h2>
              <p class="text-gray-600">{bookmarkedArticle.abstract}</p><br>
              <p class="text-black-400">Posted : {bookmarkedArticle.published_date}</p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
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