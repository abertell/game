TAS EP Mod
=======

First-time Setup
-----

1. Ensure NodeJS and yarn is installed.
2. Download repo and navigate to directory in command line.
3. Run `yarn install` in command line.

Normal launch
-----
1. Navigate to directory in command line.
2. Run `yarn build:data` in command line, wait until done.
3. Run `yarn start` in command line, wait until done.
4. Open `localhost:8080` in a browser tab.

Usage
-----
This is a modded version of the html5 client of Exit Path, which supports TAS functionality on Singleplayer and Practice modes.

There are 5 mod specific in-game key commands:
* 1 - Toggle freeze/unfreeze of the game (different from in-game pausing)
* 2 - Advance game by one frame while frozen
* R - Toggle recording mode
* M - Make save state
* L - Load save state

This mod currently only supports one save state at a time, and save states are not remembered between stages (i.e. you cannot go back to a previous Singleplayer level without replaying from level 1, so it is best to optimize each level in order). Exiting the game will always reset you to Singleplayer level 1, to avoid confusion/inconsistent behavior.

There are also 3 in-game modes, indicated by the color of your player:
* Red - Recording mode
    * In this mode, all of your keyboard inputs will be recorded by the game, and will overwrite any existing inputs on the input log at the point you started recording.
* Green - Playback mode
    * In this mode, the game will play out all recorded inputs on the input log. This mode can only be activated by entering a new level, or loading the save state.
* Default (blue) - Freeplay mode
    * This mode occurs when you reach the end of the input log. Note that entering recording mode from this mode is not recommended, as it will start adding immediately to the end of the input log, without accounting for any changes in position/time since the log ended.

On the start of each stage, the game will be in playback mode (press R to record instead) and frozen (press 1 to unfreeze). Switching between modes will always freeze the game.

Finally, the input log is a list of 8-length arrays, representing the following key inputs, in order:
* `W, A, S, D, Flow(Space/Shift), P(ause), K(ill), extra`

Note that the extra slot does not correspond to a key. It is equal to 2 on the frame of the most recent save state, and is equal to 3 on the frame of any level finish, which can be helpful for searching (Ctrl+F) when manually editing inputs in a text file. Note that if you overwrite the same log with many different save states/level finishes, every frame that ever had a save state/level finish will keep the extra entry, which may become confusing.

The input log may be imported/exported at any time (including while in-game), but should always end with an empty frame `[0,0,0,0,0,0,0,0]`.

Known Issues/Inconveniences
-----
* Multiplayer does not work
* Modify panel cannot be used after Singleplayer panel is opened
* Using "Practice Level" while in-game will cause a crash

Any feature/fix requests will be low priority, unless they significantly impact the ability to use the tool.
