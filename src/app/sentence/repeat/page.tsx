'use client';

import { BodyComponent } from "@/components/shared/Body";
import { FullScreen } from "@/components/shared/FullScreen/ui/FullScreen";
import { SentenceCarousel } from "./components/widgets/SentenceCarousel";


export default function RepeatWordTrainer() {

    return (
        <BodyComponent>
            <FullScreen>
                <SentenceCarousel />
            </FullScreen>
        </BodyComponent>
    )
}