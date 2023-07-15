import { TamagiEvos, TamagiType } from "./tamagiEvolutions/types";
import { baby_0 } from "@/utils/tamagi/tamagiEvolutions/baby";

const tamagiTypes = new Map<TamagiEvos, TamagiType>([
  [TamagiEvos.Baby, { ...baby_0 }],
]);

export default tamagiTypes;
