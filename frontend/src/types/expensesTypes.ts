export interface expensesPerDay {
    date: string;
    total_attendances: number;
    expenses_per_first_time: number;
    expenses_per_first_second: number;


}

export type TExpenses = expensesPerDay[]