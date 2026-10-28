# Destraat
HTML/CSS/TS

<i>DoomWorld</i>-ile sarnane foorumsait <i>DooM</i> <i>WAD</i> failide jagamiseks, arutlemiseks, hindamiseks.

Momendil on projekt katkine, käesolevad parandused, refaktoreerimised.

### Arendajad
- George Teemus
- Christofer Krabbi
- Marko Maripuu

### GitHub Projects
[M-TARpe24-Destraat](https://github.com/users/L6he/projects/1)

### Andmebaasimudel
<img width="1245" height="980" alt="{69E506DF-7288-43DC-A902-A32EE51E5EB8}" src="https://github.com/user-attachments/assets/1a0cb1e1-e6e7-4941-9abe-f94c3d31460b" />


[ERD link](https://drive.google.com/file/d/1kwO28o6z54kG1w-VY6iaT8l_ycmZKAjX/view?usp=sharing)

### <i>Backend</i>-i seadistamine

1. Klooni repositoorium <i>Visual Studio Code</i>-i
2. Ava projekti kaust, veendu, et kaust on usaldatud (<i>Trust folder</i>)
3. Menüüribalt vali `Terminal` > `New Terminal`
4. Avanud terminalilt vali paremalt `PowerShell`-i asemel rippmenüüst `Command Prompt`
5. Veendu et terminali failitee on <i>backend</i> kaustas, kui ei ole, kirjuta `cd backend`
6. Lae <i>backend</i>-i sõltuvused alla: `npm i`
7. Kui <i>backend</i> kaustas on nodemon puudu, kirjuta `npm install nodemon -D`

### Produktsiooni käivitamine
Eelmiste sammude põhjal:
1. Konstrueeri produktsiooni kood käsuga `npm run build`
2. Käivita toodangu kood käsuga `npm run dev`, kui see ei toimi, proovi `npm run start`
3. Veendu, et <i>Zone</i>-i serveril oleks sinu IP lubatud nimekirjas
4. Koodi peatamiseks tee `CTRL`+`C`
