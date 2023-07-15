import { TamagiEvos, TamagiType } from "./tamagiEvolutions/types";
import {
  baby,
  baby_rat,
  baby_bat,
  baby_brownSlime,
  baby_rabbit,
} from "@/utils/tamagi/tamagiEvolutions/baby";

const tamagiTypes = new Map<TamagiEvos, TamagiType>([
  [baby.id, baby],
  [baby_rat.id, baby_rat],
  [baby_bat.id, baby_bat],
  [baby_rabbit.id, baby_rabbit],
  [baby_brownSlime.id, baby_brownSlime],
]);

export default tamagiTypes;
