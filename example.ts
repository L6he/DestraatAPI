interface Mediaator{
    teadvusta(sender: object, event:string): void;
}

class KindelMediaator implements Mediaator {
    private komponent1: Komponent1;
    private komponent2: Komponent2;

    constructor(c1:Komponent1, c2: Komponent2) {
        this.komponent1 = c1;
        this.komponent1.seaMediaator(this);
        this.komponent2 = c2;
        this.komponent2.seaMediaator(this);
    }

    public teadvusta(sender:object,event:string): void {
        if(event === 'A'){
            console.log("Mediaator reageerib juhtumile A ja teostab järgneva tegevuse:")
            this.komponent2.teeTegevusC();
        }
        if(event === 'D'){
            console.log("Mediaator reageerib juhtumile D ja teostab järgnevad tegevused:")
            this.komponent1.teeTegevusB();
            this.komponent2.teeTegevusC();
        }

    }
}

class Baaskomponent {
    protected mediaator: Mediaator;

    constructor(mediaator?: Mediaator){
        this.mediaator
    }
    public seaMediaator(mediaator: Mediaator): void{
        this.mediaator = mediaator;
    }
}

class Komponent1 extends Baaskomponent {
    public teeTegevusA(): void {
        console.log('Komponent 1 teostabtegevuse A')
        this.mediaator.teadvusta(this, 'A')
    }
    public teeTegevusB(): void {
        console.log('Komponent 1 teostabtegevuse B')
        this.mediaator.teadvusta(this, 'B')
    }
}

class Komponent2 extends Baaskomponent {
    public teeTegevusC(): void {
        console.log('Komponent 2 teostabtegevuse C')
        this.mediaator.teadvusta(this, 'C')
    }
    public teeTegevusD(): void {
        console.log('Komponent 2 teostabtegevuse D')
        this.mediaator.teadvusta(this, 'D')
    }
}

const k1 = new Komponent1();
const k2 = new Komponent2();
const mediaator = new KindelMediaator(k1, k2);
console.log("Klient kutsub esile tegevuse A")
k1.teeTegevusA();
console.log(' ');
console.log("Klient kutsub esile tegevuse D")
k2.teeTegevusD; 
