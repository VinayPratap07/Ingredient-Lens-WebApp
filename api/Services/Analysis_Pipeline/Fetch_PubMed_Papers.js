const { sleep } = require("../../Utils/Pipeline_Helper_Function");

//identityData is a oject contaning name and aliases
async function fetchPubMedPaperIds(identityData) {
  const targetName = identityData.name;

  //If there is at least one alias, create an OR search condition using the first alias. Otherwise, use an empty string.
  const synonymTerms = Array.isArray(identityData.aliases)
    ? identityData.aliases
        .filter(Boolean)
        .map((alias) => `OR "${alias}"[Title/Abstract]`)
        .join(" ")
    : "";

  //The [Title/Abstract] part is a field restriction commonly used in PubMed-style queries. It means the search should look for that term in the title or abstract.

  const baseTerm = `("${targetName}"[Title/Abstract]${synonymTerms})`;

  //Conecpt/terms used to search pubmeds api
  //creating an array of 6 different PubMed search queries
  const serachConcepts = [
    `${baseTerm} AND ("dermatology"[MeSH Terms] OR "dermatology"[Title/Abstract])`,
    `${baseTerm} AND ("skin"[Title/Abstract])`,
    `${baseTerm} AND ("acne"[Title/Abstract] OR "comedone"[Title/Abstract])`,
    `${baseTerm} AND ("irritation"[Title/Abstract] OR "erythema"[Title/Abstract] OR "sensitization"[Title/Abstract])`,
    `${baseTerm} AND ("adverse effects"[Title/Abstract] OR "toxicity"[Title/Abstract] OR "safety"[Title/Abstract])`,
    `${baseTerm} AND ("skin barrier"[Title/Abstract] OR "stratum corneum"[Title/Abstract])`,
  ];

  //A JavaScript Set stores unique values.
  //Creating set of paper ids
  const pmidSet = new Set();
  for (const conceptQuery of serachConcepts) {
    try {
      //Searching pub med db for the id of papers that contains our follwoing terms
      //URL for NCBI's E-utilities ESearch API.
      const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(conceptQuery)}&retmode=json&retmax=4`;
      const searchRes = await fetch(searchUrl);
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        const ids = searchData?.esearchresult?.idlist || [];
        ids.forEach((id) => pmidSet.add(id));
      }
    } catch (error) {
      console.warn(`⚠️ PubMed ESearch concept query warning: ${err.message}`);
    }
    //This pauses for 200 ms before moving to the next search.
    await sleep(200);
  }

  //Slicing number of ids and limiting to 30
  const pmIdList = Array.from(pmidSet).slice(0, 30);
  //If no id returning an empty array
  if (pmIdList.length === 0) {
    return [];
  } else {
    return fetchPubMedPapers(pmIdList, targetName); //Calling paper fetching function
  }
}

//Function that fetches the paper using the id fetched earlier by the fetchPubMedPaperIds function
async function fetchPubMedPapers(pmidList, targetName) {
  try {
    const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmidList.join(",")}&retmode=xml`;
    const fetchRes = await fetch(fetchUrl);
    if (!fetchRes.ok) return [];

    const xmlText = await fetchRes.text();

    return parseAndClassifyPubMedXml(xmlText);
  } catch (error) {
    console.error(`PubMed EFetch error for '${targetName}':`, error.message);
    return [];
  }
}

function parseAndClassifyPubMedXml(xmlString) {
  const articles = [];
  const articlesMatches =
    xmlString.match(/<PubmedArticle>[\s\S]*?<\/PubmedArticle>/g) || [];

  for (const xmlSnippet of articlesMatches) {
    const pmidMatch = xmlSnippet.match(/<PMID[^>]*>(.*?)<\/PMID>/);
    const titleMatch = xmlSnippet.match(/<ArticleTitle>(.*?)<\/ArticleTitle>/s);
    const journalMatch = xmlSnippet.match(/<Title>(.*?)<\/Title>/);
    const yearMatch = xmlSnippet.match(/<PubDate>[\s\S]*?<Year>(.*?)<\/Year>/);

    const pubTypes = [
      ...xmlSnippet.matchAll(
        /<PublicationType[^>]*>(.*?)<\/PublicationType>/gs,
      ),
    ].map((m) => m[1].trim().toLowerCase());

    const abstractTextMatches = [
      ...xmlSnippet.matchAll(/<AbstractText[^>]*>(.*?)<\/AbstractText>/gs),
    ];

    const abstract = abstractTextMatches
      .map((m) => m[1].replace(/<[^>]+>/g, ""))
      .join(" ")
      .trim();

    if (pmidMatch && titleMatch) {
      const cleanTitle = titleMatch[1].replace(/<[^>]+>/g, "").trim();
      const pmid = pmidMatch[1].trim();
      const pubYear = yearMatch
        ? parseInt(yearMatch[1].trim(), 10)
        : new Date().getFullYear();

      const isRetracted = pubTypes.some(
        (t) =>
          t.includes("retract") || t.includes("errat") || t.includes("correct"),
      );
      if (isRetracted) {
        continue;
      }

      const classification = classifyStudyObjective(
        cleanTitle,
        abstract,
        pubTypes,
      );

      if (
        classification.population === "Plant" ||
        classification.population === "Veterinary"
      ) {
        continue;
      }

      articles.push({
        source: "Pubmed",
        id: pmid,
        title: cleanTitle,
        journal: journalMatch
          ? journalMatch[1].trim()
          : "Peer Reviewed Journal",
        year: Number.isNaN(pubYear) ? new Date().getFullYear() : pubYear,
        studyType: classification.studyType,
        population: classification.population,
        relevance: classification.relevance,
        abstract: abstract || "No abstract text available",
      });
    }
  }

  return articles.sort((a, b) => getPriorityScore(b) - getPriorityScore(a));
}

function classifyStudyObjective(title, abstract, pubTypes) {
  const text = `${title} ${abstract}`.toLocaleLowerCase();

  let population = "unknown";
  let studyType = "Unknown";
  let relevance = "Unknown";

  // 1. Plant Studies
  if (
    text.includes("chloroplast") ||
    text.includes("seeding") ||
    text.includes("photosynthesis") ||
    text.includes("plant defense") ||
    text.includes("arabidopsis") ||
    text.includes("cultivar")
  ) {
    return {
      population: "Plant",
      studyType: "Botanical / Plant biology study",
      relevance: "Low",
    };
  }
  // 2. Veterinary
  if (
    text.includes("bovine") ||
    text.includes("dairy cow") ||
    text.includes("canine") ||
    text.includes("veterinary") ||
    text.includes("equine") ||
    text.includes("swine")
  ) {
    return {
      population: "Veterinary",
      studyType: "Veterinary study",
      relevance: "Low",
    };
  }

  // 3. Animal
  if (
    text.includes("rat") ||
    text.includes("mice") ||
    text.includes("mouse model") ||
    text.includes("guinea pig") ||
    text.includes("animal model")
  ) {
    population = "Animal";
    studyType = "Animal study";
    relevance = "Low";
  }

  // 4. In-vitro / Cell Culture / Formulation
  if (
    text.includes("in vitro") ||
    text.includes("keratinocyte") ||
    text.includes("fibroblast") ||
    text.includes("cell culture") ||
    text.includes("assay")
  ) {
    population = "In-vitro";
    studyType = "In-vitro study";
    relevance = "Moderate";
  } else if (
    text.includes("transmembrane flux") ||
    text.includes("drug delivery") ||
    text.includes("nanoparticle") ||
    text.includes("permeation enhancer")
  ) {
    population = "In-vitro";
    studyType = "Formulation / drug-delivery study";
    relevance = "Low";
  }

  if (
    pubTypes.some(
      (t) => t.includes("systematic review") || t.includes("meta analysis"),
    )
  ) {
    studyType = "Systematic review / review";
    population = "Human";
    relevance = "High";
  } else if (
    pubTypes.some(
      (t) =>
        t.includes("clinical trial") ||
        t.includes("randomized controlled trial"),
    )
  ) {
    studyType = "Human clinical study";
    population = "Human";
    relevance = "High";
  } else if (pubTypes.some((t) => t.includes("review"))) {
    studyType = "Review";
    if (population === "Unknown") population = "Human";
    relevance = "High";
  } else if (
    text.includes("double-blind") ||
    text.includes("volunteers") ||
    text.includes("patients") ||
    text.includes("clinical evaluation")
  ) {
    studyType = "Human Clinical study";
    population = "Human";
    relevance = "High";
  }
  return { studyType, population, relevance };
}

function getPriorityScore(article) {
  if (
    article.population === "Human" &&
    article.studyType === "Human clinical study"
  )
    return 6;
  if (article.population === "Human" && article.studyType === "Review")
    return 5;
  if (article.studyType === "Systematic review / review") return 4;
  if (article.population === "In-vitro") return 3;
  if (article.population === "Animal") return 2;
  return 0;
}

module.exports = { fetchPubMedPaperIds };
