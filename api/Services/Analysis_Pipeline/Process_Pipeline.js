// const { fetchDermNet } = require("./Fetch_DermNet");
const { fetchPubMedPaperIds } = require("./Fetch_PubMed_Papers");

const { InkeedecoderScrapper } = require("./Inkeedecoder_Scrapper");
// const { summmarizeEvidenceWithGemini } = require("./SummarizeEvidence");
// const { summmarizeEvidenceWithGroq } = require("./SummarizeEvidence2");
const { summarizeEvidenceWithLlama } = require("./Ollama");

//This file calls all the API/ funcitons written to fetch the data and then passes on the data to the summarizeEvidence.js file to produce a clean output for the Database

//InputIngredient is an array that contains name and aliases of the ingredient we want to serach for
//Function to process the entire pipeline and produce clean output
async function ProcessPipeline(targetName) {
  const [
    // dermNetResults,
    pubMedResults,
    inkeedecoderResults,
  ] = await Promise.all([
    // fetchCIR(targetName),
    // fetchDermNet(targetName),
    fetchPubMedPaperIds(targetName),
    // fetchSCCSContent(targetName),
    InkeedecoderScrapper(targetName),
  ]);

  const flatEvidenceBundle = [
    // ...(dermNetResults || []),
    ...(pubMedResults.slice() || []),
    ...inkeedecoderResults,
  ];

  console.log(flatEvidenceBundle);

  const summarizedEvidence = await summarizeEvidenceWithLlama(
    targetName,
    flatEvidenceBundle,
  );

  console.log(summarizedEvidence);

  return summarizedEvidence;
}

const ig = {
  name: "Niacinamide",
  aliases: [],
};

module.exports = { ProcessPipeline };
