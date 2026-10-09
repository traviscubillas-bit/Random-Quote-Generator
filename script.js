const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const statusMessage = document.getElementById("status");

async function loadRandomQuote() {
    newQuoteButton.disabled = true;

    try {
        const response = await fetch("https://dummyjson.com/quotes/random");
        if (!response.ok) {
            throw new Error("The quote request failed.");
        }

        const quote = await response.json();
        if (
            typeof quote.quote !== "string" ||
            typeof quote.author !== "string" ||
            !quote.quote.trim() ||
            !quote.author.trim()
        ) {
            throw new Error("The quote service returned invalid data.");
        }

        quoteText.textContent = quote.quote;
        authorText.textContent = `— ${quote.author}`;

        const imageUrl = `https://picsum.photos/1200/800?random=${Date.now()}`;
        document.body.style.backgroundImage =
            `linear-gradient(rgba(15, 23, 42, 0.55), rgba(15, 23, 42, 0.55)), ` +
            `url("${imageUrl}")`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
    } catch (error) {
        console.error("Unable to load a quote:", error);
        statusMessage.textContent = "Could not fetch data. Please try again.";
    } finally {
        newQuoteButton.disabled = false;
    }
}

newQuoteButton.addEventListener("click", loadRandomQuote);
