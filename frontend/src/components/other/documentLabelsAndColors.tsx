import { ReactElement } from 'react';
import { BiSolidReport } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { PiPresentationChartFill } from 'react-icons/pi';
import { RiArticleFill, RiBook2Fill, } from 'react-icons/ri';
import { documentClassType } from '@/Types';

type documentMainLabelsReturnType =
  | 'Article'
  | 'Book'
  | 'Presentation'
  | 'Report'
  | 'Letter'
  | 'Slides'
  | '';

type documentPluralNonCapitalLabelsReturnType =
  | 'articles'
  | 'books'
  | 'presentations'
  | 'reports'
  | 'letters'
  | 'slides'
  | '';

type documentColorReturnType = string;

type documentIconReturnType = ReactElement | null;

type documentIconPropsType = {
  type: documentClassType;
  color: string | null;
  size: number | string;
};


export function documentMainLabels(type: documentClassType): documentMainLabelsReturnType {
  switch (type) {
    case 'article':
      return 'Article';
    case 'book':
      return 'Book';
    case 'beamer':
      return 'Presentation';
    case 'report':
      return 'Report';
    case 'letter':
      return 'Letter';
    default:
      return '';
  }
}

export function documentPluralNonCapitalLabels(
  type: documentClassType
): documentPluralNonCapitalLabelsReturnType {
  switch (type) {
    case 'article':
      return 'articles';
    case 'book':
      return 'books';
    case 'beamer':
      return 'presentations';
    case 'report':
      return 'reports';
    case 'letter':
      return 'letters';
    default:
      return '';
  }
}

export function documentColor(type: documentClassType): documentColorReturnType {
  switch (type) {
    case 'article':
      return 'blue';
    case 'book':
      return 'teal';
    case 'beamer':
      return 'orange';
    case 'report':
      return 'grape';
    case 'letter':
      return 'lime'; 
    default:
      return '';
  }
}

export function DocumentIcon({ type, color, size }: documentIconPropsType): documentIconReturnType {
  const iconColor = color ? color : `var(--mantine-color-${documentColor(type)}-5)`;

  switch (type) {
    case 'article':
      return <RiArticleFill size={size} color={iconColor} />;
    case 'book':
      return <RiBook2Fill size={size} color={iconColor} />;
    case 'beamer':
      return <PiPresentationChartFill size={size} color={iconColor} />;
    case 'report':
      return <BiSolidReport size={size} color={iconColor} />;
    case 'letter':
      return <MdEmail size={size} color={iconColor} />;
    default:
      return null;
  }
}
