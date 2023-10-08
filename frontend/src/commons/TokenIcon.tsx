import bagRice from '../assets/bag-rice.png';
import bagWheatFlour from '../assets/bag-wheatflour.png';
import bagCookingOil from '../assets/bag-cooking-oil.png';
import bagDiesel from '../assets/bag-diesel.png';
import bagFertilizer from '../assets/bag-fertilizer.png';
import {
  BAG_070KG_RICE,
  BAG_001KG_WHEATFLOUR,
  BAG_001KG_COOKINGOIL,
  BAG_001KG_DIESEL,
  BAG_010KG_FERTILIZER,
  TOKEN_SHORTNAMES,
} from '../services/subsidyType';

type TokenIconProps = {
  tokenId: number;
};

export default function TokenIcon(props: TokenIconProps) {
  const { tokenId } = props;
  if (tokenId === BAG_001KG_WHEATFLOUR) {
    return (
      <img
        src={bagWheatFlour}
        alt={TOKEN_SHORTNAMES[BAG_001KG_WHEATFLOUR]}
        style={{ width: 32, height: 32 }}
      />
    );
  }
  if (tokenId === BAG_001KG_COOKINGOIL) {
    return (
      <img
        src={bagCookingOil}
        alt={TOKEN_SHORTNAMES[BAG_001KG_COOKINGOIL]}
        style={{ width: 32, height: 32 }}
      />
    );
  }
  if (tokenId === BAG_001KG_DIESEL) {
    return (
      <img
        src={bagDiesel}
        alt={TOKEN_SHORTNAMES[BAG_001KG_DIESEL]}
        style={{ width: 32, height: 32 }}
      />
    );
  }
  if (tokenId === BAG_010KG_FERTILIZER) {
    return (
      <img
        src={bagFertilizer}
        alt={TOKEN_SHORTNAMES[BAG_010KG_FERTILIZER]}
        style={{ width: 32, height: 32 }}
      />
    );
  }
  return (
    <img
      src={bagRice}
      alt={TOKEN_SHORTNAMES[BAG_070KG_RICE]}
      style={{ width: 32, height: 32 }}
    />
  );
}
