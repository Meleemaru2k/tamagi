# Tamagi #
# A Tamagotchi Clone #
Tick -> One Time-Unit of the Game has passed (at the moment 1 Tick ~= 1 Second)

## Base-Features

### Tamagotchi
#### Tamagotchi-Stats
- Hunger ✅
- Happiness ✅
- Sickness-Chance ✅
- Poop-Chance ✅
- Evolution-Conditions ✅
- Min/Max-Stats ✅
- Tick-Effects
  - How often an Effect will occur (every X-Timeunits) ✅
  - If an effect occured, how long will it be ignored until it can happen again (e.g. after Tamagi has pooped we skip the Poop-Tick-Effect for 10 Minutes) ✅
- Stat-Tracking
    - Keep track of stats e.g. how may ticks Tamagi was sick 

#### Interactions
- Feeding ✅
  - Animation ✅
- Healing ✅
  - Animation ✅
- Playing ✅
  - Animation ✅
- Cleaning ✅
  - Animation
- Sleep-Mode
  - Pause Game 
  - Animation
  - Resume Game
    - Process Ticks gone by, but make it slowmo (e.g. 1 minute in Sleep = 1 Tick instead of 60) 

### Game-Events
#### Automatic Stat-Updates
Each Tick conditions get checked and modifications to stats get applied when certain conditions are met
Each of these Ticks will have a cooldown (defined by the Tamagi-Evolution).  
Example: After a Tamagi got sick and then healed, it won't get sick again in the next 30 minutes.

- Hunger Tick ✅
- Getting-Sick Tick ✅
    - Sickness Tick ✅
- Happyiness Tick ✅
- Pooping Tick ✅
  
#### Evolution
- Evolve when conditions met
  - Animation

### UX/UI
- Display
    - Tamagi-Sprites ✅
    - Background ✅
    - Animations/Events ✅
- Buttons for Interactions
- Tamagotchi-Shell
  - Change Tamagotchi Shell Color/Design
- Animations and Effects (for Buttons etc)

### Other
- Debugging
  - Set Tamagi-Evolution by Presets
  - Show Stats/Ticks/Etc...

 
## Planned Features
### Game Saves (Cookies)
- Saving the game
- Loading the game
Later on -> Export/Import Saves as JSON

### Other Events
- Puking when very fed & sick and then fed again (huge decrease Hunger & Happiness)
- Exhausted when played too much (increased decrease in Hunger/Happiness for a while)
- Overfed when fed and then hunger would be above max value (decrease in Happiness & Insta-Poop...or maybe chance of puking?)
 



