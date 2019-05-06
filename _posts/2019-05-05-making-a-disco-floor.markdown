---
layout: post
title:  "React Disco Floor Fever: Making a Disco Floor App"
h1: Making a React Disco Floor Maker
description: "At the end of last year, I had the idea to make a Disco Floor making app. I finally got around to completing the first version. It's missing a lot but I've enjoyed it a ton and wanted to pull some thoughts together on it."
date: 2018-06-01T08:00:01Z
categories: development
permalink: /blog/react-disco-floor-app.html
excerpt: "A disco floor app I'm working on that has no real rhyme or reason other than it seemed like an interesting challenge. Just finished what I would call version 1.0.0 and taking a break for a bit."
---

I've been doing software development as a frontend engineer for CARFAX's Used Car Listings product for almost a year now. In large part, I didn't want to pick up new projects so I could focus on growing into my new career, and it's been a fantastic first (almost) year! However, near the end of 2018, I started getting the itch for a new project and was feeling more comfortable at work, so I started wondering about another project. Something silly and fun, ideally!

<iframe width="100%" height="320" src="https://www.youtube.com/embed/lZQiJOZxgfM" frameborder="0" allowfullscreen></iframe>

And as it turns out, I made a choice over Christmas break while talking with my niece at my parents' house. She and I both thought it would be cool to be able to make your own disco floors. She said her friends would probably like it, so I decided to make a disco floor app. Or rather, an app that can make and play disco floor patterns. Simple as that.

## Project Goals

When I initialized the repo, I made some notes for myself on what the project should accomplish. Some are actually published in the [repo README](https://github.com/jonopens/disco-floor/blob/master/README.md).

I would later learn that the below list did a pretty bad job of encapsulating the work I wanted to do, but we can save that for the "post mortem" section, yeah?

Anyway, overall, my goals for the app were as follows:
- learn basic, essential Webpack configuration
- use MobX in a greenfield project to see how clean it can look
- basic features
  - ability to play a floor pattern, pre-built or user-built
  - ability to add new dance floor patterns that persist locally
  - ability to manage play speed of patterns
  - ability to toggle pulse control (unlit tiles are lit, lit tiles are unlit)
  - ability to toggle color inversion (set color classes to complementary values)
  - ability to manage local floor patterns (delete unwanted)

Of the above goals, there's only one I have yet to complete - the ability to delete local patterns. That will come with a later update along with other quality of life and UX improvements, but overall I completed what I set out to do with the app.

## Technical Issues

Over the course of the ~4 months where I was on again, off again writing the disco floor, I had a few issues worth mentioning.

### On Data Structure & Saving Dev Time

One of the initial questions that I struggled with was how best to represent the basic structure of a disco pattern. A two-dimensional array made the most sense for a matrix-like object like a tiled floor, but that's only a single frame. A 'pattern' in the way a disco floor works would be a series of frames - something like `Pattern --< Frame --< Tile`. In other words, the representation needs more depth, so the Disco Floor app opts to have each pattern represented as an object, each frame represented as a unique, numerical key pointing to a two-dimensional array value.

```
const examplePatternWithTileObjects = {
  0: [
    // array for each row of tiles
    [
      {}, {}, {}, {}, {}, {}, {}, {}, {}, // row of tile objects
    ],
  ],
  1: [
    // etc
  ],
};
```

Further, each tile is defined as an object having two key-value pairs that would be referenced during UI interactions - `color` and `isLit`.


```
const exampleTile = {
  color: 'green',
  isLit: true,
};
```

Additionally, I wanted to hand-write a few patterns to use as seed data for users to play with. It ended up being pretty **frustrating** and **time-consuming** to write as they got more complex and longer; I needed an abstraction to make it easier to write them from scratch (and is it turned out later, change them). A [reference object](https://github.com/jonopens/disco-floor/blob/master/src/data/reference.js) (<== links to Github reference file) with a limited number of tiles (20) helped simplify things.

So with the reference, the patterns look something like...

```
const examplePatternWithNumberReferences = {
  0: [
    // array for each row of tiles
    [
      1, 5, 5, 5, 1, 5, 5, 5, 1, // row of tiles now represented by numbers
    ],
  ],
  1: [
    // etc
  ],
};
```

Overall, making this choice eased the frustration of writing patterns manually AND helped down the line when writing React components that would handle tile behavior. Each tile variation is referenced with a number from 1-20 when reading and setting patterns. Components that need the patterns import a pattern file and the reference file. Makes sense why Python calls these things dictionaries :/

<!-- 
  later updates
  - mobile experience exists and is good
  - row, column, diagonal toggle
  - color selector
  - "fresh start" frame (current) vs. last frame frame
-->