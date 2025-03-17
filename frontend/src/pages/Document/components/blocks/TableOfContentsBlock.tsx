import { Dispatch, SetStateAction } from 'react';
import { blockType } from '@/Types';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';

type TableOfContentsBlockPropsType = {
  idx: number;
  activeBlockState: [number, Dispatch<SetStateAction<number>>];
  blocksContentState: [blockType[], Dispatch<SetStateAction<blockType[]>>];
};

export default function TableOfContentsBlock({
  idx,
  activeBlockState,
  blocksContentState,
}: TableOfContentsBlockPropsType) {
  return (
    <MarkedBlockFrame
      idx={idx}
      activeBlockState={activeBlockState}
      blockName="Table of contents"
      sectionsContent={blocksContentState[0]}
      setSectionsContent={blocksContentState[1]}
    >
      table of contents
    </MarkedBlockFrame>
  );
}
