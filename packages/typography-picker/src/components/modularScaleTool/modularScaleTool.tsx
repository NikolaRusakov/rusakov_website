import React, { useEffect, useState } from 'react';
import NumberEditor from '../numberEditor/numberEditor';
import SectionTool from '../sectionTool/sectionTool';
import msToRatio from '../msToRatio/msToRatio';
import { Subject } from 'rxjs';
import { auditTime, distinctUntilChanged, map } from 'rxjs/operators';
import namingDefault from '../../naming.json';

const ModularScaleTool: React.FC<{
  scaleRatio: string | number;
  onChange: (val: number) => void;
  naming?: typeof namingDefault;
}> = props => {
  const [input$] = useState(() => new Subject<string>());

  useEffect(() => {
    const subscription = input$
      .pipe(
        auditTime(50),
        distinctUntilChanged(),
        map(change => props.onChange(parseFloat(change))),
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SectionTool title={props?.naming?.scaleRatio ?? namingDefault.scaleRatio}>
      <NumberEditor
        unit={props?.naming?.ratio ?? namingDefault.ratio}
        value={msToRatio(props.scaleRatio)}
        min={1}
        max={6}
        step={0.1}
        decimals={2}
        onValueChange={(value: string) => input$.next(value)}
      />
    </SectionTool>
  );
};

export default ModularScaleTool;
