EP TAS Mod
=======

First-time setup
-----

1. Ensure NodeJS and yarn are installed.
2. Download/clone repository and navigate to directory in command line.
3. Run `yarn install` in command line.

Normal launch
-----
1. Navigate to directory in command line.
2. Run `yarn build:data` in command line, wait until done.
3. Run `yarn start` in command line, wait until done.
4. Open `localhost:8080` in a browser tab.

Usage
-----
This is a modded version of the HTML5 client of Exit Path by @kiootic, which supports TAS functionality on Singleplayer and Practice modes.

There are 5 mod specific in-game key commands:
* 1 - Toggle freeze/unfreeze of the game (different from in-game pausing)
* 2 - Advance game by one frame while frozen
* R - Toggle recording mode
* M - Make save state
* L - Load save state

There are also 3 in-game modes, indicated by the color of your player:
* Red - Recording mode
    * In this mode, all of your keyboard inputs will be recorded by the game, and will overwrite any existing inputs on the input log at the point you started recording.
* Green - Playback mode
    * In this mode, the game will play out all recorded inputs on the input log, starting from the current frame.
* Default (blue) - Freeplay mode
    * This mode occurs when you reach the end of the input log. Note that entering recording mode from here will immediately start adding to the end of the input log, without accounting for any changes in position/time since the log ended.

Save states can only be made while in Recording or Playback mode. Loading a save state will keep you in whatever mode you were in before loading (besides freeplay). This mod currently only supports one save state at a time, and a save state is set by default at the start of every stage.

On the start of each stage, the game will be in playback mode (press R to record instead) unless you are at the end of your input log, in which case it will record by default. Entering a new level, as well as switching between modes, will always freeze the game.

Finally, the input log is a list of 8-length arrays, each representing a frame with the following key inputs (0 = released, 1 = held), in order:
* `Up(W), Left(A), Down(S), Right(D), Flow(Space/Shift), P(ause), K(ill), extra`

For example, the frame `[1,1,0,1,1,0,0,0]` would denote holding up, left, right, and flow at the same time.

Note that the extra slot does not correspond to a key. It is equal to:
* 2 on the frame of the most recent save state
* 3 on the frame of any level finish
* 4 on the current frame

These values can be helpful for searching (Ctrl+F) when manually editing inputs in a text file. Note that if you overwrite the same log with many different level finishes, every frame that ever had a level finish will keep the extra entry, which may become confusing.

The input log may be imported/exported at any time from the side panel (including while in-game), but should always end with an empty frame `[0,0,0,0,0,0,0,0]` (not doing this won't break anything, but this frame will be overwritten as soon as you start recording).

Known Issues/Inconveniences
-----
* Multiplayer does not work
* Modify panel cannot be used after Singleplayer panel is opened
* Using "Practice Level" while in-game will cause a crash
* Practice mode doesn't have traffic lights countdown (inconsistent with real multiplayer)

Any feature/fix requests will be low priority, unless they significantly impact the ability to use the tool.
