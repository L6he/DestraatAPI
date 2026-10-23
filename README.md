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
<img width="1176" height="925" alt="{A38F1615-50A4-477E-AF05-60F079C3548E}" src="https://github.com/user-attachments/assets/2819e59b-ec06-443f-abb2-1aa90d1d5cd9" />


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
3. Koodi peatamiseks tee `CTRL`+`C`
