interface Category {
   id: number
   title: string
   created_at: string
   updated_at: string
   clues_count: number
}

export interface Question {
   id: number,
   answer: string,
   question: string,
   value: number,
   airdate: string,
   created_at: string,
   updated_at: string,
   category_id: number,
   game_id: number,
   invalid_count: null,
   category: Category
}