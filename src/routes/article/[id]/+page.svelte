<script>
    import { articlesStore } from '../../../stores.js';
    import { page } from '$app/stores';
    import '../../../article_style.css';
    //import type { Article } from '../../types/types';
  
    let articleId = Number($page.params.id);
    console.log("Loaded article ID:", articleId);
    $: article = $articlesStore.find(a => a.id === articleId);

    // onMount(async () => {
    //   console.log("Article ID:", articleId);
    //   // articlesStore.set(articles);
    // }); 
  </script>
  <nav class="bg-gray-800 text-white p">
    <div class="container mx-auto flex justify-between items-center">
      <a href="/" class="logo-link">
        <h2 class="text-xl font-bold text-white">OmerloNews</h2>
      </a>
      <div class="flex space-x-4 mr-5">
        <a href="/" class="hover:text-ray-300">Home</a>
        <a href="/about" >About</a>
        <a href="/about" >Articles</a>
      </div>
    </div>
  </nav>
  {#if article}
  <article class="p-6 bg-white shadow-lg rounded-lg">
    {#if article.multimedia.length>0}
      <img src={article.multimedia[0].url} alt={article.title} class="w-full h-64 object-cover rounded-t-lg" />
    {/if}
    <header class="mt-4">
      <h1 class="text-3xl font-bold mb-2">{article.title}</h1>
      <div class="text-sm text-gray-600">
        {#if article.author}
          <span> | By {article.author}</span>
        {/if}
      </div>
    </header>
    <section class="mt-4 text-lg text-gray-800">
      <p>{article.abstract}</p>
      <span>Posted : {article.published_date}</span>
    </section>
  </article>
{:else}
  <p>Loading article...</p>
{/if}

<footer class="bg-gray-800 text-white py-6">
  <div class="container mx-auto text-center">
    <p>&copy; {(new Date().getFullYear())} OmerloNews. Tous droits réservés.</p>
    <div class="mt-4">
      <a href="/about" class="hover:text-gray-400 text-sm mx-2">À propos</a>
      <a href="/contact" class="hover:text-gray-400 text-sm mx-2">Contact</a>
    </div>
  </div>
</footer>