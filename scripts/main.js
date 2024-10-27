let currentLang = "ca";

// Canvia l'idioma i carrega el contingut
async function loadContent() {
  try {
    const response = await fetch(`content-md/post1_${currentLang}.md`);
    const markdown = await response.text();
    const htmlContent = marked.parse(markdown);
    document.getElementById("post-content").innerHTML = htmlContent;
    
    // Canvia el títol i la descripció dinàmica per a SEO
    document.getElementById("dynamic-title").textContent = 
      currentLang === "ca" ? "Paisatges Increïbles - Blog Multi Idioma" : 
      currentLang === "es" ? "Paisajes Increíbles - Blog Multi Idioma" : 
      currentLang === "en" ? "Amazing Landscapes - Blog Multi Language";

    document.getElementById("dynamic-description").content = 
      currentLang === "ca" ? "Explora increïbles paisatges del món en català, castellà i anglès." : 
      currentLang === "es" ? "Explora increíbles paisajes del mundo en catalán, español e inglés." : 
      currentLang === "en" ? "Explore amazing landscapes from around the world in Catalan, Spanish, and English.";

  } catch (error) {
    console.error("Error carregant el contingut:", error);
  }
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("language", lang);
  loadContent();
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language");
  if (savedLang) {
    currentLang = savedLang;
  }
  loadContent();
});
