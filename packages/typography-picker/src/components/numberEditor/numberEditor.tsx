import React, { useEffect, useState } from 'react';
// @ts-ignore
import ReactNumberEditor from 'react-number-editor';
import { StyleSheet, css } from 'aphrodite';
import { saturate } from 'polished';
import { auditTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

const styles = StyleSheet.create({
  editor: {
    ':active': {
      borderColor: saturate('10', '#00F'),
    },
    ':hover': {
      borderColor: saturate('50', '#00F'),
    },
    ':focus': {
      borderColor: saturate('200', '#00F'),
    },
  },
});

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
    <div>
      <ReactNumberEditor
        {...props}
        ref={props.ref}
        className={css(styles.editor)}
        onValueChange={(value: string) => input$.next(value)}
        style={{
          backgroundColor: saturate(10, '#F0F'),
          border: '1px solid',
          borderColor: saturate(25, '#00F'),
          borderRadius: 3,
          color: '#FFF',
          fontSize: 12,
          padding: '2px 8px',
          width: 80,
        }}
      />
      <div
        style={{
          color: '#AFA',
          fontSize: 10,
          position: 'absolute',
          right: 5,
          top: 4,
        }}>
        {props.unit}
      </div>
    </div>
  );
});

export default NumberEditor;
