'use client';

import { BodyComponent } from "@/components/shared/Body";
import { WordsCarousel } from "../components/widgets/WordsCarousel";
import { FullScreen } from "@/components/shared/FullScreen/ui/FullScreen";


export default function NewWordTrainer() {

    return (
        <BodyComponent>
            <FullScreen>
                <WordsCarousel query={'/word/get_new_word_list/'} phase={'new'} />
            </FullScreen>
        </BodyComponent>
    )
}