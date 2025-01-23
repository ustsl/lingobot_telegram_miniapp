'use client';

import { BodyComponent } from "@/components/shared/Body";
import { FullScreen } from "@/components/shared/FullScreen/ui/FullScreen";
import { VerbsCarousel } from "./components/VerbsCarousel/ui/VerbsCarousel";



export default function RepeatWordTrainer() {

    return (
        <BodyComponent>
            <FullScreen>
                <VerbsCarousel />
            </FullScreen>
        </BodyComponent>
    )
}