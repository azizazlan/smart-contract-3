import bagRice from '../assets/bag-rice.png';
import bagWheatFlour from '../assets/bag-wheatflour.png';
import { BAG_001KG_WHEATFLOUR } from '../services/subsidyType';

type TokenIconProps = {
  index: number;
};

export default function TokenIcon(props: TokenIconProps) {
  const { index } = props;
  if (index === BAG_001KG_WHEATFLOUR) {
    return (
      <img
        src={bagWheatFlour}
        alt="wheat flour"
        style={{ width: 32, height: 32 }}
      />
    );
  }
  return <img src={bagRice} alt="rice" style={{ width: 32, height: 32 }} />;
}
