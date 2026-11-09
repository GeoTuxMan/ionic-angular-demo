import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonTextarea,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular';

import { notInPastValidator, todayIso } from '../shared/date.validators';
import type { Goal } from '../shared/goal.model';

import { GoalService } from './goal.service';

@Component({
  selector: 'app-goal',
  templateUrl: 'goal.page.html',
  styleUrls: ['goal.page.scss'],
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    DatePipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonFooter,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonNote,
    IonButton,
    IonDatetime,
    IonModal,
  ],
})
export class GoalPage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly goals = inject(GoalService);
  private readonly toast = inject(ToastController);
  private readonly router = inject(Router);

  readonly minDate = todayIso();
  readonly lastSaved = signal<Goal | null>(null);

  readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    // null, nu '': ion-datetime nu accepta un sir gol (si ion-datetime-button nu s-ar mai afisa)
    dueDate: new FormControl<string | null>(null, [Validators.required, notInPastValidator()]),
  });

  /** Mesajul de eroare al unui camp, doar dupa ce utilizatorul a interactionat cu el. */
  error(field: 'title' | 'description' | 'dueDate'): string | null {
    const c = this.form.controls[field];
    if (!c.errors || !(c.touched || c.dirty)) {
      return null;
    }
    if (c.errors['required']) {
      return {
        title: 'Title is required.',
        description: 'Description is required.',
        dueDate: 'Choose a completion date.',
      }[field];
    }
    if (c.errors['minlength']) {
      return `At least ${c.errors['minlength'].requiredLength} characters.`;
    }
    if (c.errors['maxlength']) {
      return `At most ${c.errors['maxlength'].requiredLength} characters.`;
    }
    if (c.errors['pastDate']) {
      return 'The completion date cannot be in the past.';
    }
    if (c.errors['invalidDate']) {
      return 'Invalid date.';
    }
    return 'Invalid value.';
  }

  async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const goal: Goal = {
      title: v.title.trim(),
      description: v.description.trim(),
      dueDate: (v.dueDate ?? '').slice(0, 10),
      createdAt: new Date().toISOString(),
    };
    this.lastSaved.set(this.goals.save(goal));
    this.form.reset();
    const t = await this.toast.create({
      message: `Goal "${goal.title}" saved.`,
      duration: 2000,
      color: 'success',
      position: 'bottom',
    });
    await t.present();
  }

  cancel(): void {
    this.form.reset();
    this.router.navigateByUrl('/home');
  }
}
