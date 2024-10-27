let currentLang = "ca";

// Funció per carregar el contingut del post seleccionat
async function loadContent(postId = "post1") {
  try {
    const response = await fetch(`content-md/${postId}_${currentLang}.md`);
    const markdown = await response.text();
    const htmlContent = marked.parse(markdown);
    document.getElementById("post-content").innerHTML = htmlContent;

    // Actualitza títol i descripció per SEO
    const post = posts.find(p => p.id === postId);
    document.getElementById("dynamic-title").textContent = post.title[currentLang];
    document.getElementById("dynamic-description").content = post.description[currentLang];
  } catch (error) {
    console.error("Error carregant el contingut:", error);
  }
}

// Funció per carregar el llistat de posts
async function loadPostsList() {
  try {
    const response = await fetch("content-md/posts.json");
    posts = await response.json();
    displayPosts();
  } catch (error) {
    console.error("Error carregant el llistat de posts:", error);
  }
}

// Funció per mostrar el llistat de posts segons l'idioma
function displayPosts() {
  const postItemsContainer = document.getElementById("post-items");
  postItemsContainer.innerHTML = ""; // Neteja la llista anterior

  posts.forEach(post => {
    const postItem = document.createElement("div");
    postItem.className = "post-item";
    postItem.innerHTML = `
      <h3>${post.title[currentLang]}</h3>
      <p>${post.description[currentLang]}</p>
      <p><strong>Etiquetes:</strong> ${post.tags.join(", ")}</p>
      <button onclick="loadContent('${post.id}')">Llegeix més</button>
    `;
    postItemsContainer.appendChild(postItem);
  });
}

// Carrega els posts i el contingut en l’idioma seleccionat
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language");
  if (savedLang) {
    currentLang = savedLang;
  }
  loadPostsList();
  loadContent();
});

// Canvia l'idioma i recarrega els posts i contingut
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("language", lang);
  displayPosts();
  loadContent();
}
