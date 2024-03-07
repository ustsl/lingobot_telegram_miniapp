'use client';

import { BodyComponent } from "@/components/shared/Body";
import { WordsCarousel } from "../components/widgets/WordsCarousel";
import { FullScreen } from "@/components/shared/FullScreen/ui/FullScreen";


export default function RepeatWordTrainer() {

    return (
        <BodyComponent>
            <FullScreen>
                <WordsCarousel query={'/word/get_repeat_word_list/'} phase={'repeat'} />
            </FullScreen>
        </BodyComponent>
    )
}