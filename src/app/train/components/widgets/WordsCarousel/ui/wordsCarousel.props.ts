export interface IWordEntry {
    pk: number;
    word: string;
    translate: string;
    transcription: string;
    sound: string;
    get_sentences: ISentence[];
}

export interface ISentence {
    pk: number;
    sentence: string;
    translate: string;
    is_top: boolean;
    is_phraseological: boolean;
}
