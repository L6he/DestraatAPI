//Originaator hoiab endas mingit tähtsat olekut, mis võib aja jooksul muutuda.
//Ta defineerib ära meetodi millega saab salvestada tema sisemist olekut memento sees
//ja teist meetodit mis seda seisundit taastab mementost.
class Originaator {
    //lihtsuse mõttes on kogu seisund väljaga mis on string.
    private sisemineOlek: string;
    constructor(sisemineOlek: string) {
        this.sisemineOlek = sisemineOlek;
        console.log(`Originaator: minu olek on: ${sisemineOlek}`)

    }
    //Originaatori äriloogika võib mõjutada selle sisemist olekut, seega klient peaks
    //tegema ühe varukoopia sisemisest olekust, enne äriloogika meetodite käivitamist.
    //antud juhul teeb seda meil "Salvesta()" meetod
    public teeMidagi(): void {
        console.log("Originaator: Toimub tähtis tegevus");
        this.sisemineOlek = this.genereeriSõne(30);
        console.log(`Originaator: Minu sisemine olek on muutunud: ${this.sisemineOlek}`)
    }
    private genereeriSõne(pikkus: number = 10): string {
        const tähestik = "abcdefghijklmnopqrstuvwxyzpksjgbpasajrajborjgj"
        return Array.apply(null, {pikkus})
        .map(()=> tähestik.charAt(Math.floor(Math.random()*tähestik.length)
    )).join('')
    }

    public salvesta(): Memento {
        return new KindelMemento(this.sisemineOlek)
    }
    public taasta(memento: Memento): void {
        this.sisemineOlek = memento.saaOlek():
        console.log(`Originaator: Mu sisemine olek on muutunud: ${this.sisemineOlek}`)
    }
}

interface Memento {
    saaOlek(): string;
    saaNimi(): string;
    saaAeg(): string;
}

class KindelMemento implements Memento {
    private sisemineOlek: string;
    private kuupäev: string;
    constructor(sisemineOlek: string) {
        this.sisemineOlek = sisemineOlek;
        this.kuupäev = new Date().toISOString().slice(0,19).replace('T', ' ')
    }

    public saaOlek(): string {
        return this.sisemineOlek;
    }
    //Teisi meetodeid kasutab hoolekand ja metaandmete kuvamiseks.
    public saaAeg(): string {
        return this.kuupäev;
    }
    public saaNimi(): string {
        return `${this.kuupäev} / (${this.sisemineOlek.substring(0,9)})`
    }
}
//hoolekandja klass ei sõltu KindelMemento klassist, seega ei tal juurdepääu
//originaatori olekule, mida memento sees hoitakse. See töötab kõikide Mementodega
//läbi Memento baasliidese.
class Hoolekandja {
    private mementod: Memento[] = [];
    private originaator: Originaator;

    constructor(originaator: Originaator) {
        this.originaator = originaator;
    }

    public varukoopia(): void {
        console.log("Teen varukoopia originaatori olekust")
        this.mementod.push(this.originaator.salvesta())
    }
    public tagasivõtt(): void {
        if (!this.mementod.length) {
            return;
        }
        const memento = this.mementod.pop
        console.log(`Hoolekandja: Taastan oleku: ${memento.saaNimi}`)
    }
    public kuvaAjalugu(): void{
        console.log("Hoolekandja: siin on mementode nimekiri")
        for (const memento of this.mementod) {
            console.log(memento.saaNimi())
    
        }
    }
}
//kliendikood
const originaator = new Originaator("fucked");
const hoolekandja = new Hoolekandja(originaator);

for (let index = 0; index < 3; index++) {
    hoolekandja.varukoopia();
    originaator.teeMidagi();
}

console.log('')
hoolekandja.kuvaAjalugu()

console.log("Klient: võta üks tagasi")
hoolekandja.tagasivõtt();

