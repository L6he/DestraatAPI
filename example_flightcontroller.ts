// siin asub mediaatori liides, Lennukid teavitavad lennujuhtumistorni, selle asemel
// et suhelda otse üksteiega
interface Lennujuhataja {
    teavita(sender: object, event: string): void;
}

//Lennujuhtumistornis on lennujuhtijad. kes kordineerivad erinevaid lennukeid
class LennujuhtumisTorn implements Lennujuhatija {
    private reisiLennuk: ReisiLennuk;
    private kaubaLennuk: KaubaLennuk;

    constructor(reisiLennuk: ReisiLennuk, KaubaLennuk: KaubaLennuk) {
        this.reisiLennuk = reisiLennuk;
        this.reisiLennuk.seaLennujuhtija(this);
        this.kaubaLennuk = reisiLennuk;
        this.kaubaLennuk.seaLennujuhtija(this);
    }

    public teavita(sender: object, event: string): void {
        if (event === "KÜSIN_LUBA_ÕHKUTÕUSUKS") {
            console.log("Lennujuhtimistorn: Õhkutõusu luba palutud.")
            this.kaubaLennuk.hoiaAsukohta();
            this.reisiLennuk.tõuseÕhku
        }
        if (event === "KÜSIN_LUBA_MAANDUMISEKS") {
            console.log("Lennujuhtimistorn: Maandumist luba palutud.")
            this.kaubaLennuk.eemalRajalt();
            this.reisiLennuk.maandu();
        }
    }
}

class Lennuk {
    protected lennutorn!: LennujuhtimisTorn

    public seaLennujuhatija(lennutorn: LennujuhtimisTorn):void {
        this.lennutorn = lennutorn;
    }
    
}

//reisijalennuk
class ReisiLennuk extends Lennuk {
    public küsiÕhkutõusuluba(): void{
        console.log("Reisilennuk küsib luba õhkutõusuks")
        this.lennutorn.teavita(this, "KÜSIN_LUBA_ÕHKUTÕUSUKS")
    }
    public õhkuTõis(): void{
        console.log("Reisilennuk küsib luba õhkutõusuks")
        this.lennutorn.teavita(this, "KÜSIN_LUBA_ÕHKUTÕUSUKS")
    }
}
//Kaubalennuk
class KaubaLennuk extends Lennuk {
    public küsiMaandumisLube(): void{
        console.log("Kaubalennuk küsib maandumisluba")
        this.lennutorn.teavita(this, "KÜSIN_LUBA_MAANDUMISEKS")
    }
    public maandu(): void {
        console.log("Kaubalennuk maandub eoowwwww")
    }
    public hoiaAsukohta(): void {
        console.log("Kaubalennuk maandub eoowwwww")
    }
}
//kliendikood
const reisiLennuk = new ReisiLennuk();
const kaubaLennuk = new KaubaLennuk();

const lennuJuhtimisTorn = new LennujuhtumisTorn(reisiLennuk, kaubaLennuk);

console.log("Reisilennuk tahab õhku tõusta:")
reisiLennuk.küsiÕhkutõusuluba();
console.log("")
console.log("Kaubalennuk tahab maanduda:")
kaubaLennuk.küsiMaandumisLuba();























































































