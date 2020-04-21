/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useState } from 'react';
// @ts-ignore
import ReactNumberEditor from 'react-number-editor';
import { saturate, readableColor } from 'polished';
import { auditTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

const NumberEditor: React.FC<{
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  decimals: number;
  onValueChange: (value: any) => void;
  ref?: React.Ref<any>;
}> = React.forwardRef(props => {
  // TODO wrap onChange and if value isn't a number, set to minimum value.
  const [input$] = useState(() => new Subject<string>());

  useEffect(() => {
    const subscription = input$
      .pipe(
        auditTime(50),
        distinctUntilChanged(),
        map(change => props.onValueChange(change)),
      )
      .subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div css={{ display: 'flex', position: 'relative', left: 0}}>
      <ReactNumberEditor
        {...props}
        ref={props.ref}
        onValueChange={(value: string) => input$.next(value)}
        css={theme => ({
          backgroundColor: theme.colors.secondary,
          shadowBox: `0 0 2px ${saturate(50, theme.colors.background)}`,
          borderRadius: '6px',
          color: readableColor(theme.colors.text),
          fontSize: '16px',
          padding: '2px 8px',
          width: '100%',
          '&:active': {
            borderColor: saturate('10', '#00F'),
          },
          '&:hover': {
            borderColor: saturate('50', '#00F'),
          },
          '&:focus': {
            borderColor: saturate('200', '#00F'),
          },
        })}
      />
      <span
        css={theme => ({
          position: 'absolute',
          right: 5,
          top: '15%',
          fontSize: 10,
          borderBottom: theme.colors.primary,
        })}>
        {props.unit}
      </span>
    </div>
  );
});

export default NumberEditor;
