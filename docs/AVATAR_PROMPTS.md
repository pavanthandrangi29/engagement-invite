# Illustrated Couple Portraits — Generation Brief

The website currently shows the **real photographs** of Harsha and Jayasree inside the
temple-arch frames. When illustrated portraits are ready, drop them in and they replace
the photos automatically (guests get a "Portrait / Photograph" toggle).

## Where the files go

| Person   | Save as                                          | Size        |
| -------- | ------------------------------------------------ | ----------- |
| Harsha   | `public/images/avatars/harsha-illustrated.webp`   | 720 × 960 px (3:4, portrait) |
| Jayasree | `public/images/avatars/jayasree-illustrated.webp` | 720 × 960 px (3:4, portrait) |

Then in `src/data/weddingConfig.ts` set:

```ts
illustrated: { src: 'images/avatars/harsha-illustrated.webp', alt: 'Illustrated engagement portrait of Harsha', width: 720, height: 960 },
```

(and the same for Jayasree). Leave `src: ''` to keep showing the photographs.

## How to generate them faithfully

Use an image tool that accepts a **reference photo** (image-to-image / "use this face"),
and upload the original photo with each prompt:

- Harsha → `public/images/couple/harsha-original.jpeg`
- Jayasree → `public/images/couple/jayasree-original.jpeg`

Generate several variations, then pick the one that the family agrees *looks like them*.
Reject any result whose face, skin tone, face shape, beard or glasses drift from the photo.

---

### Shared style block (paste into both prompts so the pair matches)

> Premium hand-painted South Indian wedding illustration, gouache and fine gold-leaf
> detailing, soft warm studio light, refined brushwork, elegant editorial composition.
> Waist-up portrait, centred, gentle three-quarter turn, calm natural smile.
> Background: warm ivory (#FBF6EC) with a faint antique-gold temple arch outline and a few
> jasmine buds; no text, no logos, no borders. Palette harmonises with antique gold,
> deep maroon (#6B1424) and muted champagne. 3:4 portrait format.
> Preserve the exact facial identity from the reference photo: same face shape, eyes,
> nose, lips, eyebrows, hairline, skin tone and proportions. Not a cartoon, not anime,
> not a photo filter — a respectful, realistic illustrated likeness.

### Harsha

> [Shared style block]
> Subject: the young man in the reference photo. Keep his exact face, his short dark
> textured hair swept slightly up, his full trimmed beard and moustache, and his clear
> transparent rectangular glasses. Warm, confident smile as in the photo.
> Attire: traditional Telugu engagement look — ivory/cream silk kurta with fine gold
> zari border at the collar and placket, a deep maroon silk angavastram (stole) with an
> antique-gold woven border draped over one shoulder, a thin gold chain. Optional slim
> gold kada on the wrist.
> Negative: different face, no glasses, clean-shaven, lighter or darker skin, slimmer
> face, western suit, turban, exaggerated features, plastic skin, extra fingers.

### Jayasree

> [Shared style block]
> Subject: the young woman in the reference photo. Keep her exact face, her dark hair
> neatly tied back with soft strands at the temples, her small red bindi, and her warm
> open smile as in the photo.
> Attire inspired by her own outfit: a dark bottle-green silk saree with small gold
> buttas and a rich purple/magenta zari border and pallu, a purple brocade blouse,
> traditional gold temple jewellery — layered Lakshmi-coin haram and necklace, jhumka
> earrings, gold vaddanam (waist belt), purple and gold bangles. Add a small string of
> fresh jasmine in her hair.
> Negative: different face, changed face shape, lighter or darker skin, heavy bridal
> veil, north-Indian lehenga, western dress, exaggerated eyes, plastic skin, extra
> fingers.

---

**Tip:** if one portrait comes out warmer or brighter than the other, generate it again
with the same seed/style settings, or colour-match them in any photo editor so they sit
together as a pair.
