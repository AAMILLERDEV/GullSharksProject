import { Asset } from "./Asset";
import { GameDetails } from "./GameDetails";
import { GameReview } from "./GameReview";

export interface Game {
  id: number;
  gameName: string;
  asset_ID: number;
  gameDetail_ID: number;
  priceInCAD: number;
  isDeleted: boolean;
  gameDetails?: GameDetails;
  gameAsset?: Asset;
  srcFront?: string;
  srcBack?: string;
  src?: string;
  rating?: number;
  textColor?: string;
  reviews?: GameReview[];
}
