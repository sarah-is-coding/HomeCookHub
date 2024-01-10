export function calculateWordSimilarity(input: string, stringSet: string[]): { string: string; score: number }[] {
  function tokenizeAndStem(text: string): string[] {
    return text
      .toLowerCase()
      .split(/\s+/)
      .map((word) => word.replace(/[^a-zA-Z]/g, '')); // Simple tokenization and stemming
  }

  function getCommonWords(arr1: string[], arr2: string[]): string[] {
    return arr1.filter((word) => arr2.includes(word));
  }

  function calculatePartialSimilarityScore(commonWords: string[], inputWords: string[]): number {
    const totalScore = commonWords.reduce((score, commonWord) => {
      const partialSimilarity = calculateJaccardSimilarity(commonWord, inputWords);
      return score + partialSimilarity;
    }, 0);

    return totalScore / inputWords.length; // Normalize by the number of words in the input
  }

  function calculateJaccardSimilarity(word: string, arr: string[]): number {
    const intersection = arr.filter((inputWord) => calculateLevenshteinDistance(word, inputWord) < Math.max(word.length, inputWord.length) / 2);
    const union = [...new Set([...arr, word])];

    return intersection.length / union.length;
  }

  function calculateLevenshteinDistance(a: string, b: string): number {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        const cost = a[j - 1] === b[i - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    return matrix[b.length][a.length];
  }

  const inputWords = tokenizeAndStem(input);
  const scores: { string: string; score: number }[] = [];

  for (const str of stringSet) {
    const strWords = tokenizeAndStem(str);
    const commonWords = getCommonWords(inputWords, strWords);
    const partialSimilarityScore = calculatePartialSimilarityScore(commonWords, inputWords);

    scores.push({ string: str, score: partialSimilarityScore });
  }

  return scores;
}
