# Destraat
HTML/CSS/TS

<i>DoomWorld</i>-ile sarnanev foorumsait <i>DooM</i> <i>WAD</i> failide jagamiseks, arutlemiseks, hindamiseks.

Momendil on projektis arendatud <i>backend</i>, projekt loob ühenduse <i>Zone</i>-i <i>MariaDB</i> andmebaasiga. 
Enamik vahekaartide funktsioonidest töötavad, mõned vajavad veel testimist, käesolevad parandused, refaktoreerimised.

Hiljem läheb projekt <i>live</i>-is ühe andmebaasi peale

### Arendajad
- George Teemus
- Christofer Krabbi
- Marko Maripuu

### GitHub Projects
[M-TARpe24-Destraat](https://github.com/users/L6he/projects/1)

### Andmebaasimudel
<img width="1250" height="979" alt="{B382FFE6-AC07-490B-B120-BD986EA574C6}" src="https://github.com/user-attachments/assets/6d88353b-a1b9-4ea4-841b-c9811e4b7bac" />


[ERD link](https://drive.google.com/file/d/1kwO28o6z54kG1w-VY6iaT8l_ycmZKAjX/view?usp=sharing)

### <i>Backend</i>-i seadistamine

1. Klooni repositoorium <i>Visual Studio Code</i>-i
2. Ava projekti kaust, veendu, et kaust on usaldatud (<i>Trust folder</i>)
3. Menüüribalt vali `Terminal` > `New Terminal`
4. Avanud terminalilt vali paremalt `PowerShell`-i asemel rippmenüüst `Command Prompt`
5. Veendu et terminali failitee on <i>backend</i> kaustas, kui ei ole, kirjuta `cd backend`
6. Lae <i>backend</i>-i sõltuvused alla: `npm i`
7. Kui <i>backend</i> kaustas on nodemon puudu, kirjuta `npm install nodemon -D`

### Andmebaasi seadistamine
1. Logi [<i>Zone</i>-i](https://www.zone.ee) sisse
2. `Veeb ja E-post`i alt ava serveri ülevaade
3. Kõrvalmenüüst vali `Andmebaasid` -> `MySQL/MariaDB`
4. Lisa MariaDB instants
5. Serveri aadressi leiad `Domeeni ___ MySQL/MariaDB serveri aadress on: ___` lõigust
6. Vali `Lisa MySQL/MariaDB andmebaas`
7. Määra andmebaasile nimi, valikuliselt lühikirjeldus
8. Vajuta `Lisa`
9. Vali `Lisa MySQL/MariaDB kasutaja`
10. Määra kasutajale kasutajanimi, valikuliselt lühikirjeldus
11. Lisa `Välised hostid:` välja alla oma kasutusel oleva seadme IP-aadress
12. Määra kasutajale salasõna, jäta see meelde
13. Vajuta `Lisa`
14. `Olemasolevad MySQL/MariaDB kasutajad` loetelust vali kasutajal `Muuda`
15. `Ligipääsuõigused:` alalt veendu, et kasutajal oleks andmebaasi jaoks vähemalt `Alter`, `Create`, `Delete`, `Insert`, `Select` ja `Update` õigused lubatud
16. Vajuta `Muuda õiguseid`, `Salvesta muudatused` ja `Mine tagasi`
17. Ava <i>Visual Studio Code</i>-is kloonitud repositoorium
18. Kopeeri ja kleebi `.env.example` faili, nimeta `.env copy.example` ümber `.env`-iks
19. Ava `.env` fail
20. `DB_NAME`-i jutumärkide vahele lisa andmebaasinimi, `DB_USERNAME`-ile andmebaasikasutaja kasutajanimi, `DB_PASSWORD`-i andmebaasikasutaja salasõna, `DB_HOSTNAME`-i serveri aadressi
21. Salvesta fail ja veendu, et failinimi oleks teiste failidega võrreldes värvusest hallim

### <i>Development</i>-i käivitamine
1. Lae <i>backend</i>-i sõltuvused alla: `npm i`
2. Veendu et terminali failitee on <i>backend</i> kaustas, kui ei ole, kirjuta `cd backend`
3. Koodi käivitamiseks on käsk `npm run dev`
4. Koodi peatamiseks tee `CTRL`+`C`

### Produktsiooni käivitamine
Eelmiste sammude põhjal:
1. Konstrueeri produktsiooni kood käsuga `npm run build`
2. Käivita toodangu kood käsuga `npm run start`
3. Veendu, et <i>Zone</i>-i serveril oleks sinu IP lubatud nimekirjas (`Välised hostid:`)
4. Koodi peatamiseks tee `CTRL`+`C`
