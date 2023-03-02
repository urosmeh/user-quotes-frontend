export interface Vote {
  id: number;
  userId: number;
  quoteId: number;
  type: 0 | 1;
}
