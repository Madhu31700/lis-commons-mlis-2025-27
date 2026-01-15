const quotes = [
  {
    text: "Libraries store the energy that fuels the imagination.",
    author: "Sidney Sheldon",
  },
  {
    text: "Information is the resolution of uncertainty.",
    author: "Claude Shannon",
  },
  {
    text: "The organization of knowledge is the foundation of learning.",
    author: "S. R. Ranganathan",
  },
  {
    text: "Knowledge is power only when it is shared.",
    author: "Unknown",
  },
]

export function getQuoteOfTheDay() {
  const day = new Date().getDate()
  return quotes[day % quotes.length]
}
