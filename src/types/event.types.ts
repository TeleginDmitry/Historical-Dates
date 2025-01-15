export interface DateType {
  year: number;
  description: string;
}

export interface EventType {
  name: string;
  dates: DateType[];
}
