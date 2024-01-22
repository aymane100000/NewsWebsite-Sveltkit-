export async function getLatestArticles() {
    try {
        // const response = await fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=R6BE8lH4n2qzsBBAJUL7PlxIT25YPr0P');
        const response = await fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=R6BE8lH4n2qzsBBAJUL7PlxIT25YPr0P');
        const data = await response.json();
        console.log(data);
        return data.results;
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}