import { ReactElement } from 'react';
import { BiSolidReport } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { PiPresentationChartFill } from 'react-icons/pi';
import { RiArticleFill, RiBook2Fill, RiSlideshow2Fill } from 'react-icons/ri';
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

//type documentNonCapitalLabelsReturnType =

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
    case 'slides':
      return 'Slides';
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
    case 'slides':
      return 'slides';
    default:
      return '';
  }
}

export function documentColor(type: documentClassType): documentColorReturnType {
  switch (type) {
    // case 'article':
    //   return 'var(--mantine-color-blue-5)';
    // case 'book':
    //   return 'var(--mantine-color-teal-5)';
    // case 'beamer':
    //   return 'var(--mantine-color-orange-5)';
    // case 'report':
    //   return 'var(--mantine-color-grape-5)';
    // case 'letter':
    //   return 'var(--mantine-color-lime-5)';
    // case 'slides':
    //   return 'var(--mantine-color-pink-5)';
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
    case 'slides':
      return 'pink';
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
    case 'slides':
      return <RiSlideshow2Fill size={size} color={iconColor} />;
    default:
      return null;
  }
}

// const documentNonCapitalLabels = (type: documentClassType): documentNonCapitalLabelsReturnType => {
//     switch (type) {
//       case 'article':
//         return 'article';
//       case 'report':
//         return 'report';
//       case 'book':
//         return 'book';
//       case 'letter':
//         return 'letter';
//       case 'beamer':
//         return 'presentation';
//       case 'slides':
//         return 'slide';
//       default:
//         return '';
//     }
//   };
