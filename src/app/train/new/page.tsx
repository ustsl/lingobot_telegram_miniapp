'use client';

import { BodyComponent } from "@/components/shared/Body";
import { WordsCarousel } from "../components/widgets/WordsCarousel";
import { ButtonsComponent } from "./components/ButtonsComponent/ui/ButtonsComponent";
import { FullScreen } from "@/components/shared/FullScreen/ui/FullScreen";



export default function NewWordTrainer() {


    return (
        <BodyComponent>
            <FullScreen>
                <WordsCarousel />
                <ButtonsComponent />
            </FullScreen>
        </BodyComponent>
    )
}