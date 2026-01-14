const quotes = [
  {
    text: "A library is not a luxury but one of the necessities of life.",
    author: "Henry Ward Beecher",
  },
  {
    text: "Libraries are reservoirs of strength, grace, and wit.",
    author: "Germaine Greer",
  },
  {
    text: "Information is the currency of democracy.",
    author: "Thomas Jefferson",
  },
  {
    text: "The true university of these days is a collection of books.",
    author: "Thomas Carlyle",
  },
  {
    text: "Knowledge grows when shared, not when stored.",
    author: "Library Philosophy",
  },
]

export function getQuoteOfTheDay() {
  const dayIndex = new Date().getDate() % quotes.length
  return quotes[dayIndex]
}