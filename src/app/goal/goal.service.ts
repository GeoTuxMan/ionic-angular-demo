import { Injectable } from '@angular/core';

import type { Goal } from '../shared/goal.model';

/** Serviciu demonstrativ: fara backend, obiectivele raman in memorie si se afiseaza in consola. */
@Injectable({ providedIn: 'root' })
export class GoalService {
  private readonly goals: Goal[] = [];

  save(goal: Goal): Goal {
    this.goals.push(goal);
    console.log('[GoalService] obiectiv salvat', goal);
    return goal;
  }

  all(): readonly Goal[] {
    return this.goals;
  }
}
