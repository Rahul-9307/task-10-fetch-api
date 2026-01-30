const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const loadBtn = document.getElementById("loadBtn");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");

// Fetch quote (CORS safe + UX handled)
async function getQuote() {
  loadingEl.style.display = "block";
  errorEl.textContent = "";
  loadBtn.disabled = true;

  try {
    const response = await fetch(
      "https://api.allorigins.win/raw?url=https://zenquotes.io/api/random",
      { cache: "no-store" } // avoid cached bad responses
    );

    const data = await response.json();

    quoteEl.style.opacity = 0;

    setTimeout(() => {
      quoteEl.textContent = `"${data[0].q}"`;
      authorEl.textContent = `— ${data[0].a}`;
      quoteEl.style.opacity = 1;
    }, 200);

  } catch (err) {
    errorEl.textContent =
      "Network issue. Please try again after a few seconds.";
    console.error(err);
  } finally {
    loadingEl.style.display = "none";
    loadBtn.disabled = false;
  }
}

// Button click
loadBtn.addEventListener("click", getQuote);

// Auto load first quote (better UX)
getQuote();
