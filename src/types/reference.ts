
interface Reference {
   id: number
   url: string
   created_at: string
}

interface Data {
   title: string
   meta_description?: string
}

interface Result {
   id: number
   reference_id: number
   data: Data
   created_at: string
}

export { Reference, Result };

