import { Injectable } from '@nestjs/common';

@Injectable()
export class WordsService {
  private words: Array<string> = [
    'master joners',
    'premables lenters',
    'silent danger',
    'rental mechs',
    'blaster omen',
    'neural dims',
    'drone temp',
    'limestone park',
    'sand rebel',
    'planet hiders',
    'realm benders',
  ];

  public getRandomWord(): string {
    const index = Math.floor(Math.random() * this.words.length);
    return this.words[index];
  }

  public isAnagram(str: string, words: string) {
    if (!str.length || !words.length) return false;

    const strFreq: Record<string, number> = {};

    for (const s of str.toLowerCase()) {
      if (strFreq[s]) strFreq[s] += 1;
      else strFreq[s] = 1;
    }

    const wordsFreq: Record<string, number> = {};

    for (const w of words.toLowerCase()) {
      if (wordsFreq[w]) wordsFreq[w] += 1;
      else wordsFreq[w] = 1;
    }

    for (const [key, value] of Object.entries(strFreq)) {
      if (!wordsFreq[key] || wordsFreq[key] < value) return false;
    }

    return true;
  }
}
