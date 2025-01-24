// rulesData.ts

export const grammarRules = {
    present_continuous: [
        {
            id: "pc-1",
            title: "Present Continuous Tense",
            description: "Для образования Present Continuous используем основу глагола + -(i)yor (с учётом гармонии гласных)."
        },
        {
            id: "pc-2",
            title: "Гармония гласных в Present Continuous",
            description: "Суффикс -(i)yor выбирается в зависимости от последней гласной корня: geliyorum, gidiyorum и т.д."
        }
    ],
    simple_past: [
        {
            id: "sp-1",
            title: "Simple Past Tense",
            description: "Обычно образуется с суффиксом -dı/-di/-tı/-ti (с учётом гармонии гласных)."
        }
    ],
    future: [
        {
            id: "fut-1",
            title: "Future Tense",
            description: "Для будущего времени используем -ecek/-acak (гармония гласных), далее личное окончание."
        }
    ],
    negative: [
        {
            id: "neg-1",
            title: "Отрицательная форма",
            description: "Для отрицания часто добавляется -ma/-me перед временным суффиксом: yapma-dı-m, gelme-yecek-sin."
        }
    ],
    positive: [

    ],
    "1sg": [
        {
            id: "p1sg-1",
            title: "1 лицо единственного числа",
            description: "Окончание -ım/-im/-um/-üm (в зависимости от гармонии). Пример: geliyorum — «я прихожу»."
        }
    ],
    "2sg": [
        {
            id: "p2sg-1",
            title: "2 лицо единственного числа",
            description: "Окончание -sın/-sin/-sun/-sün (в зависимости от гармонии). Пример: geliyorsun."
        }
    ],
    "3sg": [
        {
            id: "p3sg-1",
            title: "3 лицо единственного числа",
            description: "Окончание -dır/-dir или часто вовсе опускается в разговорной речи. В Present Continuous обычно - (i)yor."
        }
    ],
    "1pl": [
        {
            id: "p1pl-1",
            title: "1 лицо множественного числа",
            description: "Окончание -ız/-iz/-uz/-üz. Пример: geliyoruz."
        }
    ],
    "2pl": [
        {
            id: "p2pl-1",
            title: "2 лицо множественного числа",
            description: "Окончание -sınız/-siniz/-sunuz/-sünüz. Пример: geliyorsunuz."
        }
    ],
    "3pl": [
        {
            id: "p3pl-1",
            title: "3 лицо множественного числа",
            description: "Окончание -lar/-ler или в некоторых случаях без суффикса (geliyorlar)."
        }
    ]
};
