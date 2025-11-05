import React from 'react';
import { Tooltip } from '@mantine/core';

type CustomTooltipProposType<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
  bg?: string;
  label: string | React.ReactNode;
  c?: string;
} & React.ComponentPropsWithRef<T>;

const CustomTooltip = React.forwardRef(
  <T extends React.ElementType>(
    { as, children, label, ...others }: CustomTooltipProposType<T>,
    ref: React.LegacyRef<HTMLDivElement> | undefined
  ) => {
    return (
      <Tooltip
        ref={ref}
        label={label}
        //label={buttonsNotToRender.includes(idx) ? 'true' : 'false'}
        bg={others.bg ? others.bg : 'var(--mantine-color-cyan-9)'}
        c={others.c ? others.c : 'var(--mantine-color-white)'}
        position="bottom"
        offset={5}
        arrowOffset={50}
        arrowSize={7}
        arrowRadius={2}
      >
        {children}
      </Tooltip>
    );
  }
);

export default CustomTooltip;
