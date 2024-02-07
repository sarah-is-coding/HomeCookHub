function WordSimilarityFunction(input: string, json: {}[]): { title: string; score: number }[] {
  const scores: { title: string; score: number }[] = [];

  interface StringDescription {
      [key: string]: string;
  }
  
  var stringDescription: StringDescription = {};

  const addToStringSet = (json: {}[]) => {
    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const value = json[key as keyof typeof json];
            const description = value['description' as keyof typeof value]
            const name = value['title' as keyof typeof value]
            stringDescription[name] = description
        }
    }
    return stringDescription
  }
  
  stringDescription = addToStringSet(json)
  console.log(stringDescription)
  for (const key in stringDescription) {
    var title = key
    var description = stringDescription[key]
    if (key !== undefined || key !== 'undefined') {
      const combinedString = title.toLowerCase()
      const levenshteinScore = calculateLevenshteinScore(input, combinedString);
      scores.push({ title, score: levenshteinScore });
    }
  }
  return scores
}

function calculateLevenshteinScore(input: string, str: string): number {
    const maxLength = Math.max(input.length, str.length);
    const distance = levenshteinDistance(input, str);
    return 1 - distance / maxLength;
}

function levenshteinDistance(s1: string, s2: string): number {
    const len1 = s1.length;
    const len2 = s2.length;
    const matrix: number[][] = [];

    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = s1.charAt(i - 1) === s2.charAt(j - 1) ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }

    return matrix[len1][len2];
}

export async function calculateWordSimilarity(input: string, recipes: {}[]): Promise<{ title: string; score: number; }[]> {

    const scores = WordSimilarityFunction(input, recipes)
    console.log("Scores")
    console.log(scores)
    console.log("e")
    return scores
}
