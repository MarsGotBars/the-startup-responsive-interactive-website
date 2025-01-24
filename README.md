# [Bread & Butter | JUST](https://marsgotbars.github.io/the-startup-responsive-interactive-website/)
Een interactieve recap-website voor het evenement van JUST, met thema-opties, een slider, een interactief draaiend rondje, en randomized kleuren. De website is volledig responsief en biedt een toegankelijke gebruikerservaring.

## Beschrijving
De website biedt zowel een light als dark theme, met de optie om dit automatisch aan te passen aan je systeeminstellingen. Functioneel bevat de website dus een light/dark/os select, een slider met plaatjes en als kleine extra kun je ook het rondje draaien!

### Thema
https://github.com/user-attachments/assets/8b3e740f-a6c0-418e-ab3c-e273ff5500ed
#### Ontwerkpkeuzes
De select heeft een hover (feedforward), bevat de tekst van het geselecteerde thema (feedback) en de pagina heeft een korte transition tussen themas, zodat de gebruiker weet dat het thema aan het veranderen is. (feedforward)

Hierbij is er ook aan gedacht om goed contrasterende kleuren te gebruiken voor beide thema's, aangezien de secundaire kleuren random zijn.

[Ook bevat de select een OS mode, hierbij wordt er met JS en matchMedia gekeken of er een verandering is in het systeem thema, zo wel, dan past de pagina zich gelijk aan.](https://github.com/MarsGotBars/the-startup-responsive-interactive-website/blob/4f723d20e1b8a822bcca2546ae63682dde6c8499/script.js#L48-L53)

Dit maakt gebruik van het [timing principle](https://medium.com/@ruthiran_b/disneys-motion-principles-in-designing-interface-animations-9ac7707a2b43#:~:text=the%20next%20thing.-,Timing,-In%20traditional%20animation).

### Slider
https://github.com/user-attachments/assets/3e31fa62-3e91-49f0-a01d-0d270c2333e8
#### Ontwerkpkeuzes
De knoppen hebben een hover & active (feedforward), de images hebben een korte transition tussen active & inactive zodat de gebruiker weet dat het een ander plaatje is, ook verandert de tekst en het nummer van de slides (2/10 -> 3/10)

De buttons maken gebruik van de principes: squash & anticipation.
De images maken gebruik van het principe: overlapping.

De knoppen hadden eerst een label 'next/previous slide', na user-testing is dit eruit gehaald, aangezien de meesten benoemden dat dit overbodig was.

### Extra
https://github.com/user-attachments/assets/5ac4d5b5-d905-4234-ba61-ee1c9cccf098
#### Ontwerkpkeuzes
Het rondje heeft een hover effect waardoor de tekst kleuren veranderen (feedforward), en als de gebruiker klikt verandert zijn grab cursor naar grabbing, en kan de gebruiker het rondje draaien tot hij weer los laat

## Responsive
Laat hier zien hoe je website responsive is. Toon een screenshot per breakpoint en leg ze uit. Je kan je responsive website uitleggen aan de hand van de workshop Mobile First.

### Mobile
<img width="495" alt="Screenshot 2025-01-22 at 12 35 39" src="https://github.com/user-attachments/assets/3f453af9-9f7a-408d-8c7e-27d878271103" />

Dit is de default (mobile first) weergave.
De mobiele weergave is weergeven tot 769px, waarbij de tablet weergave start
One column.

### Tablet
<img width="680" alt="Screenshot 2025-01-22 at 12 35 24" src="https://github.com/user-attachments/assets/f3a16c89-2fd6-477e-97b8-e45c2c62e4ff" />

vanaf 769 loopt deze door tot 1024px, waarbij de laptop weergave start
Nog steeds one column.

### Desktop
<img width="793" alt="Screenshot 2025-01-22 at 12 35 31" src="https://github.com/user-attachments/assets/e8454743-641d-48e2-a9b5-1ae7863224d4" />

Lijkt op een one column maar de items staan erg veel verdeelt

Kenmerken
## Kenmerken

- **Toegankelijkheid**: Ondersteunt `prefers-reduced-motion` voor gebruikers die animaties willen minimaliseren. Focusstijlen met `outline` verbeteren de navigatie voor toetsenbordgebruikers en zijn goed zichtbaar gemaakt.
- **Schaalbaarheid**: Gebruik van CSS-variabelen zoals `--primary` en `--secondary` maakt het eenvoudig om thema’s aan te passen. Responsief ontwerp met media queries en `clamp()` zorgt voor consistentie op verschillende schermformaten.
- **Animaties**: Geoptimaliseerd met `@keyframes` en ondersteuning voor voorkeuren van gebruikers via `prefers-reduced-motion`.
- **Efficiëntie**: Gecentraliseerd gebruik van variabelen en gestroomlijnde structuren voor onderhoudsvriendelijke en herbruikbare code.
- **HTML**: Opgebouwd met semantische HTML, zo zijn divjes alleen gebruikt voor positionering en is er waar mogelijk gebruikt van elementen met waarde zoals `<header>`, `<main>`, `<footer>` en `<article>`'s

### Hoe werken de interacties?

#### Thema
Door middel van een data type op de body te zetten, word er bepaald welke waardes de css variables bevatten, zo bevat de --primary css variabele de `--dark-gray` variabele op light mode en `--white` variabele op dark mode (Deze word voornamelijk gebruikt voor teksten)
##### Dit is grotendeels gedaan met JS voor de thema selectie.
Hierbij is er ook gedacht aan:
- **Het onthouden van thema & thema selectie (op de select) in [`localstorage`](https://github.com/MarsGotBars/the-startup-responsive-interactive-website/blob/9658039a4914c7c97c49adc081d72c206c773d82/script.js#L21-L27)**
- **Wat als de gebruiker zijn [`systeem kleur`](https://github.com/MarsGotBars/the-startup-responsive-interactive-website/blob/9658039a4914c7c97c49adc081d72c206c773d82/script.js#L48-L52) verandert terwijl hij/zij op de pagina zit?**
- **Gesepareerde secundaire kleuren voor beide light/dark mode [`ivm met contrast`](https://github.com/MarsGotBars/the-startup-responsive-interactive-website/blob/9658039a4914c7c97c49adc081d72c206c773d82/script.js#L55-L56) en het [`random toepassen`](https://github.com/MarsGotBars/the-startup-responsive-interactive-website/blob/9658039a4914c7c97c49adc081d72c206c773d82/script.js#L59-L80) hiervan**

[Live versie](https://marsgotbars.github.io/the-startup-responsive-interactive-website/)

#### Slider
Een image slider die ook kan werken [`zonder javascript`](https://github.com/MarsGotBars/the-startup-responsive-interactive-website/blob/9658039a4914c7c97c49adc081d72c206c773d82/styling/main.css#L267-L274).
Dit is gedaan door het een scroll overflow te geven en deze vervolgens weg te halen met javascript. Hierdoor zal deze weer in beeld komen wanneer javascript uit staat.
Hierdoor heb ik ook kunnen werken met een [`intersectionObserver om te achterhalen welke slide nu in beeld is`](https://github.com/MarsGotBars/the-startup-responsive-interactive-website/blob/9658039a4914c7c97c49adc081d72c206c773d82/script.js#L217C1-L236C48), om vervolgens aan te passen welk slide nummer & tekst hierbij horen.

Ook is er aan gedacht om te kunnen sliden d.m.v. [`mouse drag`](https://github.com/MarsGotBars/the-startup-responsive-interactive-website/blob/9658039a4914c7c97c49adc081d72c206c773d82/script.js#L241-L272)

[Live versie](https://marsgotbars.github.io/the-startup-responsive-interactive-website/#:~:text=1/9%20Tizian%20Fendt%2C%20UX%20designer%20at%20JUST%20talking%20about%20why%20accessibility%20matters.)

#### Extra
Als gebruiker kun je het draaiende rondje zelf spinnen!

Hierbij is er ook gedacht aan:

- **[Hoe verder de muis van het midden af zit, hoe langzamer het gaat](https://github.com/MarsGotBars/the-startup-responsive-interactive-website/blob/9658039a4914c7c97c49adc081d72c206c773d82/script.js#L97-L105) (draait mee met de muis)**
- **In de code kan aangegeven worden of je wil dat het links-om draait of rechts-om door 1 variabele om te zetten van [`-360 naar 360`](https://github.com/MarsGotBars/the-startup-responsive-interactive-website/blob/9658039a4914c7c97c49adc081d72c206c773d82/script.js#L116)**
- **gebruik gemaakt van matchMedia om te checken of het wel [bruikbaar is op het toestel](https://github.com/MarsGotBars/the-startup-responsive-interactive-website/blob/9658039a4914c7c97c49adc081d72c206c773d82/script.js#L151) (dit is gebouwd voor desktop momenteel, dus check ik op screen size)**

#### Randomization
- **Kleuren**: [Op pagina load word de `--secondary` property aangepast](https://github.com/MarsGotBars/the-startup-responsive-interactive-website/blob/bfda0feab667930d60f9ab2d764485aa1dcdb809/script.js#L55-L77) naar een van de 3 (per thema) kleuren die een goed contrast hebben met dat thema.
- **Stickers**: Op pagina load worden er 3 stickers uitgekozen en op de pagina geplaatst, zie hieronder voor een meer in-depth uitleg.

Om typ werk te voorkomen heb ik alle images genummerd van sticker1 tot sticker24, zo kan ik ze allemaal met een for loop in een array zetten, met een random nummer een item als src zetten en deze vervolgens uit de array halen, zo komen er geen dubbele exemplaren voor op de pagina, de alt laat ik leeg omdat deze stickers niets inhoudelijks toevoegen aan de pagina. 

<sub>in het geval dat deze wel nodig is, is er alleen een array aan alt teksten nodig.</sub>
```js
// All img containers I want to put random stickers in
const stickerSpots = document.querySelectorAll(".sticker img");
// All the assets, using a for loop to get them out of the Stickers directory without server side code
const stickerOptions = [];
for (let i = 1; i < 25; i++) {
  stickerOptions.push(`./assets/Stickers/sticker${i}.svg`);
}
// For each item in stickerSpots, create a random integer (rounded number) based on the length of the stickerOptions array,
// set the src of the spot as nth stickerOption, splice (remove) the set option out of the array.
stickerSpots.forEach((stickerSpot) => {
  const randomInt = Math.floor(Math.random() * stickerOptions.length);
  stickerSpot.src = stickerOptions[randomInt];
  stickerOptions.splice(randomInt, 1);
});
```

##### Algemene code conventies
[Voor css maak ik gebruik van kebab-casing](https://github.com/MarsGotBars/the-startup-responsive-interactive-website/blob/9658039a4914c7c97c49adc081d72c206c773d82/styling/base.css#L154C1-L154C17)

[In JS maak ik gebruik van camelCasing](https://github.com/MarsGotBars/the-startup-responsive-interactive-website/blob/9658039a4914c7c97c49adc081d72c206c773d82/script.js#L89)

