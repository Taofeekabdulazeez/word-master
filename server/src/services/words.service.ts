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
}
