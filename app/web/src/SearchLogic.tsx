export function calculateWordSimilarity(input: string, stringSet: string[]): { title: string; score: number }[] {
  const inputWords: string[] = input.toLowerCase().split(/\s+/);
  const scores: { title: string; score: number }[] = [];

  for (const str of stringSet) {
    const strWords: string[] = str.toLowerCase().split(/\s+/);
    const commonWords: string[] = getCommonWords(inputWords, strWords);
    const SimilarityScore: number = calculateSimilarityScore(commonWords, inputWords, strWords);

    scores.push({ title: str, score: SimilarityScore });
  }

  scores.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0))
  return scores;
}

function getCommonWords(arr1: string[], arr2: string[]): string[] {
  return arr1.filter(word => arr2.includes(word));
}

function calculateSimilarityScore(commonWords: string[], inputWords: string[], strWords: string[]): number {
  const commonWordCount: number = commonWords.length;
  const totalWordCount: number = inputWords.length + strWords.length - commonWordCount;

  const similarityScore: number = commonWordCount / totalWordCount;
  return similarityScore;
}
