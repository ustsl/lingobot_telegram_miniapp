export interface VerbsResponse {
    verbs: Verb[];
}

export interface Verb {
    infinitive: string;
    present_continuous: Conjugation;
    simple_past: Conjugation;
    future: Conjugation;
    ru: string;
    transcription: string;
}

export interface Conjugation {
    positive: PersonForms;
    negative: PersonForms;
}

export interface PersonForms {
    "1sg": string;
    "2sg": string;
    "3sg": string;
    "1pl": string;
    "2pl": string;
    "3pl": string;
}