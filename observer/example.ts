//Subjekti liides näitab ära mingeid meetodid kuulajate haldamseks
interface Subjekt {
    //lisame jälgja subjekti juurde
    attach(jälgija: jälgija): void;
    detach(jälgija: jälgija): void;

    teavita(): void;
}
//Subjekt omab mingit tähtsat olekut ja teavitab jägijaid kui olek muutub
class KindelSubjekt implements Subjekt {
    //Lihtsuse mõttes on sisemine olek ainult üks number
    public olek: number;
    //Jälgijate nimikiri, päriselt hoitakse seda nimekirja tunduvalt detailsemalt,
    //siin lihtsalt array
    private jälgijad: jälgija[] = [];
    //jälgijate haldusmeetodid
    public attach(jälgija: Jälgija): void {
        const onOlemas = this.jälgijad.includes(jälgija)
        if (onOlemas)
        {
            return console.log ("Subjekt: Jälgija on juba registreeritud")
        }
        console.log(`Subjekt: uus jälgia!!`)
        this.jälgijad.push(jälgija);
    }
    public detach(jälgija: Jälgija): void {
        const jälgijaIndeks = this.jälgijad.indexOf(jälgija)
        if (jälgijaIndeks === -1)
        {
            return console.log("Subjekt: Jälgijat ei leitud")
        }
        this.jälgijad.splice(jälgijaIndeks, 1);
        console.log("Subjekt: jälgia lahkus :CCC");

    }
    //teavitusmeetod mis kutsub esile uuenduse jälgjatele
    public teavitada(): void {
        console.log("Subjekt: teavitan jälgijaid")
        for (const jälgija of this.jälgijad)
        {
            jälgija.uuendaMind(this);
        }
    }
    // Tavaliseltm tellimisloogika on ainult osa mida üks subjekt teha päriselt oskab
    //subjektid tüüpiliselt hoiavad endas mingit kinglat tähtsat äriloogikat, see
    //päästab valla teavituse laine teavitusemeetodi abil, kui midagi tähtsat kas
    //hakkab juhtuma või on juba juhtunud.
    public mingiÄriloogika(): void {
        console.log("Subjekt: mingi värk läks baltas lahti.")
        this.olek = Math.floor(Math.random()*11);
        console.log(`Subjekt: mu olek on nüüd: ${this.olek}`)
        this.teavitada();
    }
}

interface Jälgiad {
    uendaMind(subjekt: Subjekt): void;
}

//Kindlad jälgijad reageerivad teavitusele mis tulevad subjektil kelle kuulajad nad on.
class KindelKuulajaA implements Jälgija {
    public uuendamind(subjekt: Subjekt): void{
        if (subjekt instanceof KindelSubjekt && subjekt.olek < 3) {
            console.log("KindelJälgijaA reageeris juhtumile");
        }
    }
}

