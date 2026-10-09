
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const button = document.getElementById("new-quote");
const statusElement = document.getElementById("status");

async function getQuote() {
    button.disabled = true;
    statusElement.textContent = "Loading quote and image...";

    try {
        // 1. Get a random quote from DummyJSON
        const quoteResponse = await fetch(
            "https://dummyjson.com/quotes/random"
        );

        if (!quoteResponse.ok) {
            throw new Error("Could not load quote.");
        }

        const quoteData = await quoteResponse.json();

        // 2. Display the quote and author
        quoteElement.textContent = quoteData.quote;
        authorElement.textContent = "— " + quoteData.author;

        // 3. Get a random background image
        const imageUrl =
            "https://picsum.photos/1200/800?random=" + Date.now();

        // 4. Apply the image to the page background
        document.body.style.backgroundImage =
            `linear-gradient(rgba(15,23,42,0.55),` +
            `rgba(15,23,42,0.55)),` +
            `url("${imageUrl}")`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";

        statusElement.textContent = "Quote and image loaded!";

    } catch (error) {
        console.error("Error:", error);

        statusElement.textContent =
            "Could not load quote. Please try again.";

    } finally {
        // 5. Enable the button again
        button.disabled = false;
    }
}

// 6. Load a new quote when the button is clicked
button.addEventListener("click", getQuote);
