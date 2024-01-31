function WordSimilarityFunction(input: string, json: JSON): { title: string; score: number }[] {
  const inputWords: string[] = input.toLowerCase().split(/\s+/);
  const scores: { title: string; score: number }[] = [];

  interface StringDescription {
      [key: string]: string;
  }
  
  var stringDescription: StringDescription = {};

  const addToStringSet = (json: JSON) => {
    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const value = json[key as keyof typeof json];
            const description = value['description' as keyof typeof value]
            const name = value['title' as keyof typeof value]
            stringDescription[name] = "".concat(name, " ", description)
        }
    }
    return stringDescription
  }
  
  stringDescription = addToStringSet(json)

  for (const key in stringDescription) {
    const str = stringDescription[key]
    const strWords: string[] = str.toLowerCase().split(/\s+/);
    const commonWords: string[] = getCommonWords(inputWords, strWords);
    const SimilarityScore: number = calculateSimilarityScore(commonWords, inputWords, strWords);

    if (key !== "undefined") {
      scores.push({ title: key, score: SimilarityScore });
    }
  }

  scores.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0))
  return scores.slice(0, 20);
}

function getCommonWords(arr1: string[], arr2: string[]): string[] {
  return arr1.filter(word => arr2.includes(word));
}

function calculateSimilarityScore(commonWords: string[], inputWords: string[], strWords: string[]): number {
  const totalWordCount: number = inputWords.length + strWords.length - commonWords.length;

  const similarityScore: number = commonWords.length / totalWordCount;
  return similarityScore;
}

export async function calculateWordSimilarity(input: string): Promise<{ title: string; score: number; }[]> {

  const json_promise = fetch('http://localhost:9000/recipes')
  .then((response: { json: () => any; }) => response.json())
  .then((json: any) => { 
      return json})
  .catch((error: { message: string; }) => console.log(error.message));

  const score = json_promise.then((json: any) => {
      const scores = WordSimilarityFunction(input, json)
      return scores
    });
  return score
}
