export interface OcurrencesDTO extends Document {
  name: string;
  content: string;
  kind: "Sessão" | "Fato Relevante";
  files: string[];
  ocurrenceId: string;
}