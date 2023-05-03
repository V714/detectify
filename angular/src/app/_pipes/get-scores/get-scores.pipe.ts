import { Pipe, PipeTransform } from '@angular/core';
import { DetectifiedResult } from 'src/app/_models/detectified';

@Pipe({ name: 'getScores' })
export class GetScoresPipe implements PipeTransform {
  transform(label: string, results: DetectifiedResult[]) {
    if (!label || !results) return label;

    results = results.filter((result) => result.label === label);
    return 'Scores:\n' + results.map((result) => result.score).join('\n');
  }
}
