export type Step = 1 | 2 | 3

export interface DemoState {
  currentStep: Step
  selectedEssayType: string | null
  selectedTopic: number | null
  isGenerating: boolean
  generatedContent: string
  showAnalysis: boolean
}

export const ESSAY_TYPES: Array<{ label: string; emoji: string; id: number }> = [
  { label: 'Rozprávanie', emoji: '✍️', id: 1 },
  { label: 'Umelecký opis', emoji: '🎨', id: 2 },
  { label: 'Charakteristika osoby', emoji: '🧑', id: 3 },
  { label: 'Úvaha', emoji: '🤔', id: 4 },
  { label: 'Výklad', emoji: '📚', id: 5 },
  { label: 'Slávnostný prejav', emoji: '🎤', id: 6 },
  { label: 'Diskusný príspevok', emoji: '💬', id: 7 },
  { label: 'Beletrizovaný životopis', emoji: '🧾', id: 8 },
]


