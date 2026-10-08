# Project Verde — 3D Model Generation Prompts

Prompts written for text-to-3D / image-to-3D generators (Meshy, Tripo, Rodin, Luma
Genie, Hunyuan3D, Sloyd). Each model has:

- **Prompt** — paste this in as-is
- **Negative prompt** — what to suppress
- **Settings** — generator options to pick
- **Image-to-3D route** — a 2D image prompt first, which gives far better results
- **Export** — what to download and what to tell me

> **Export settings for every model:** `GLB`, PBR materials on, Y-up, 2K textures,
> quad or triangle mesh both fine, under 10 MB. Do **not** export FBX/OBJ/BLEND.

---

## MODEL 1 — The Verde Tower *(essential — the hero)*

### Prompt

```
A modern vertical hydroponic farming tower, four stacked horizontal grow shelves
on a slim matte-black aluminium frame. Each shelf holds a row of white net pots
with small green leafy lettuce seedlings. Thin LED grow-light strips mounted
under each shelf, glowing soft white-green. A sealed white water reservoir tank
at the base with a visible clear tube running up the side of the frame. A small
white electronics control box with a tiny display and status LEDs mounted on the
right-hand upright. Clean minimal product design, matte and brushed metal
finishes, smart-appliance aesthetic, studio product render, neutral grey
background, even soft lighting, highly detailed, sharp edges, symmetrical,
full object visible, centred.
```

### Negative prompt

```
blurry, low poly, melted geometry, floating parts, text, watermark, logo,
people, hands, soil mess, dirt, rust, broken, duplicated frames, cropped,
cut off, extreme close-up, dramatic shadows, colored background lighting
```

### Settings

| Option | Value |
|---|---|
| Art style | Realistic / PBR |
| Topology | Quad |
| Polycount | High (~150k–300k) — this is the hero, detail pays off |
| Texture | 2K, PBR maps on |
| Symmetry | On |

### Image-to-3D route *(recommended — much better output)*

Generate this image first in your image tool, then feed it to the 3D generator:

```
Product photograph of a modern vertical hydroponic grow tower, four shelves of
green lettuce seedlings in white net pots, slim matte black aluminium frame,
glowing LED strips under each shelf, white reservoir tank at base, small white
control box on the side upright. Shot straight-on at eye level, full product in
frame, plain light grey seamless studio background, soft even softbox lighting,
no harsh shadows, Apple product photography style, ultra sharp, 8k.
```

Then run image-to-3D on it. If your generator supports multi-view, also make a
**side** and **back** view with the identical prompt plus `side view, same object,
same lighting` / `rear view, same object, same lighting`.

### Before you send it to me

If your tool lets you name parts, use these — I hook animation and hotspot labels
onto them:

```
Frame, Shelf_01, Shelf_02, Shelf_03, Shelf_04, Plants,
Reservoir, LED_Strip, ControlBox, Pump, Tubing
```

If it doesn't support naming, send it anyway — I'll split it by material instead.

---

## MODEL 2 — The Sensor Pod *(high value — the detail shot)*

### Prompt

```
A single small green lettuce seedling with four broad leaves growing from a
white cylindrical hydroponic pod, dark moist soil puck visible at the top. A
slim stainless steel two-prong soil moisture probe inserted into the soil beside
the stem, its thin red and black wires running down to a tiny exposed green
circuit board clipped to the side of the pod. Two small LEDs on the board, one
green one blue. Macro product render, shallow clean design, matte white plastic,
fresh vivid green leaves, studio lighting, neutral grey background, extremely
detailed, centred, full object visible.
```

### Negative prompt

```
blurry, low poly, flat leaves, plastic looking plant, wilted, dead, text,
watermark, hands, pot plant saucer, terracotta, flowers, petals, cropped,
cluttered background, multiple plants
```

### Settings

| Option | Value |
|---|---|
| Art style | Realistic / PBR |
| Polycount | Medium (~80k) — it's a section accent, not the hero |
| Texture | 2K, PBR maps on |
| Symmetry | **Off** — organic leaves need asymmetry or it looks fake |

### Image-to-3D route

```
Macro product photograph of one small lettuce seedling in a white cylindrical
hydroponic pod, a thin steel moisture sensor probe pushed into the dark soil
beside the stem, thin wires leading to a tiny green circuit board on the pod's
side with two glowing LEDs. Plain light grey studio background, soft diffused
lighting, crisp focus throughout, product catalogue style, 8k.
```

### Note on the leaves

Generated leaves often come out thick and rubbery. If yours do, that's fine — tell
me and I'll thin them in-engine with a two-sided material and add a gentle sway
shader so they read as real.

---

## MODEL 3 — The ESP8266 Board *(nice to have — Hardware section)*

### Prompt

```
An ESP8266 NodeMCU microcontroller development board. Dark green rectangular
printed circuit board with gold-plated traces, a silver square metal shielding
can in the centre, a zigzag copper PCB antenna at one end, two rows of black
plastic pin headers with gold pins along both long edges, a micro-USB port at
one end, two small tactile push buttons, a tiny blue surface-mount LED, white
silkscreen component markings. Flat on its back, viewed from above at a slight
angle. Clean electronics product render, neutral grey background, even bright
lighting, extremely detailed, sharp, centred, full board visible.
```

### Negative prompt

```
blurry, low poly, melted components, unreadable mush, bent board, broken pins,
soldering iron, hands, wires, breadboard, cables attached, text artifacts,
watermark, cropped, perspective distortion
```

### Settings

| Option | Value |
|---|---|
| Art style | Realistic / PBR |
| Polycount | Medium–High (~120k) — small components need the density |
| Texture | 2K, PBR maps on, **metalness map essential** for the gold pins and shield can |
| Symmetry | Off |

### Image-to-3D route

```
Top-down product photograph of an ESP8266 NodeMCU development board on a plain
light grey background, dark green PCB, silver metal shield can, zigzag antenna
trace, gold pin headers on both sides, micro-USB port, two small buttons, white
silkscreen markings. Even diffused studio lighting, no shadows, perfectly sharp,
high resolution electronics catalogue photo, 8k.
```

### Why this one is the fussiest

Text-to-3D generators are bad at small repeated geometry — pin headers tend to
fuse into a blob. **Use the image-to-3D route for this model specifically.** If the
pins still come out mushy, send it anyway: the board silhouette is what matters at
the size it renders on screen, and I can rebuild the headers procedurally.

---

## Quick reference — all three at a glance

| | Model 1 Tower | Model 2 Pod | Model 3 Board |
|---|---|---|---|
| Priority | **Essential** | High | Nice to have |
| Lives in | Hero, full screen | About / Plant Library | Hardware section |
| Polycount | 150k–300k | ~80k | ~120k |
| Symmetry | On | Off | Off |
| Route | Image-to-3D | Either | **Image-to-3D** |
| Hardest part | Keeping shelves even | Leaves looking real | Pin headers |

---

## General tips, in order of how much they'll help you

1. **Always go image-to-3D when the option exists.** Text-to-3D guesses at the
   silhouette; image-to-3D is given it. The quality gap is not small.
2. **Plain grey background, flat even lighting, full object in frame.** Baked-in
   shadows and coloured studio lighting end up painted onto the texture, and then
   the model carries lighting that fights my scene.
3. **Generate four candidates and keep the best.** These tools are a slot machine —
   the first result is rarely the good one.
4. **Don't pre-colour it green to match the site.** Give me neutral, accurate
   materials. Tinting is one line of code; removing a baked-in tint isn't.
5. **Send me the near-misses too.** A model with a great frame and bad plants is
   still useful — I can hide meshes and rebuild parts.

## Sending them over

Attach the `.glb` in chat, or push it to any GitHub repo of yours and paste the raw
link — GitHub is reachable from my sandbox. Drive and Dropbox links are not.
