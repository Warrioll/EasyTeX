import { useBlocksContentContext } from '../../DocumentContextProviders';
import BasicTexfield from './blocksComponents/BasicTextfield';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';

type TextfieldBlockProps = {
  idx: number;
};

export default function TextfieldBlock({ idx }: TextfieldBlockProps) {
  const { blocksContent, setBlocksContent } = useBlocksContentContext();

  return (
    <MarkedBlockFrame idx={idx} blockName="Textfield">
      <BasicTexfield
        idx={idx}
        contentToRead={blocksContent[idx].blockContent as string}
        idxInput={idx.toString()}
      />
    </MarkedBlockFrame>
  );
}
