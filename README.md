# [Elemental Invoker](https://bmzhu2.github.io/Elemental-Invoker/)

Elemental Invoker is a puzzle game in which you arrange elemental stars in order to cast spells from your grimoire. The game is simple to jump into, but requires good planning, knowledge, and luck to score highly!

![gameplay demo](images/spellcast-large.gif)

The game is played by clicking and dragging pieces on the board or spells to their respective formations on the board. There are more specific instructions for how to play on the site itself.

This game was built using only Javascript, vanilla DOM, and HTML Canvas.

[Project Proposal](docs/proposal.md)

## Features & Highlights

### Board with smooth sliding pieces

When moving pieces on the board, a smooth sliding experience when dragging and swapping pieces was prioritized. One of the earliest problems encountered when creating the game was implementing this feature. The solution that was decided upon was to use two layers of HTML elements to handle this: a board object with many piece instances that handled the actual swapping event and logic, while a canvas layer on top rendered the visual swapping. As a result, players do not need to wait for a piece to visually finish swapping in order to continue moving, so the player can make a long sequence of moves if desired without sacrificing any smoothness in the visual transition.

### Pseudo Drag & Drop for spell-casting

When grabbing a spell from the grimoire, you can drop the spell onto the board where the pieces line up. The logic for both rendering the spell piece formations and determining a valid spell cast were done by structuring a spell to have an "anchor" element and represent the other elements through relative position according to that anchor.

```
//example structure of a spell
{
    name: 'Hurricane',
    anchor: { type: 'water', dx: 2, dy: 2 },
    otherPieces: [
      { type: 'wind', dx: 0, dy: -1 },
      { type: 'wind', dx: 0, dy: 1 },
      { type: 'wind', dx: -1, dy: 0 },
      { type: 'water', dx: -1, dy: -1 }
    ]
  }
```

The dragging of the selected spell itself was accomplished by detecting mouse movement after clicking and using canvas to render the anchor piece at the cursor position as well as the other elements through their relative positions. This brought up its own interesting coding challenge, as the canvas used to render the selected spell would end up blocking other elements from getting hit by the mouseup event. If the canvas was not in front, then of course the render would not show up at certain areas, which would also be a problem. With the way the elements were organized, event propogation was not a clean option either. My workaround was to keep the canvas in the back through the z-axis when not in use, and when trying to drop of a spell while the canvas was in front, I would fire a 0ms delayed click so that the canvas could be put away first and then the element below could then be immediately clicked.

