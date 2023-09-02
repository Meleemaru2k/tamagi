# Tamagi #
# A Tamagotchi Clone #

## Base-Features

### Tamagotchi
#### Tamagotchi-Stats
- Hunger ✅
- Happiness ✅
- Sickness-Chance ✅
- Poop-Chance ✅
- Evolution-Conditions ✅

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
  - Animation
  - Resume

### Game-Events
#### Automatic Stat-Updates
Tick -> Each Tick conditions get checked and modifications to stats get applied when certain conditions are met
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
#### Game Saves (Cookies)
- Saving the game
- Loading the game
Later on -> Export/Import Saves as JSON

#### Other Events
- Puking when overfed oder very fed & just gotten sick
 



