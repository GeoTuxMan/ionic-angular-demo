import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Data de azi, format YYYY-MM-DD, in fusul orar local. */
export function todayIso(now: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/**
 * Data trebuie sa fie azi sau in viitor. Accepta "YYYY-MM-DD" sau un ISO complet (ion-datetime).
 * Un camp gol nu e eroare aici (pentru asta exista Validators.required).
 */
export function notInPastValidator(now: () => Date = () => new Date()): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string | null;
    if (!value) {
      return null;
    }
    const day = value.slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
      return { invalidDate: true };
    }
    return day < todayIso(now()) ? { pastDate: true } : null;
  };
}
