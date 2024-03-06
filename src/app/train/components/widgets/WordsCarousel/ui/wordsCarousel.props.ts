export interface IWordEntry {
    pk: number;
    word: string;
    ru: string | null;
    en: string | null;
    verb: boolean;
    transcription: string;
    sound: string;
    get_sentences: ISentence[];
}

export interface ISentence {
    pk: number;
    sentence: string;
    ru: string;
    is_top: boolean;
    is_phraseological: boolean;
}
