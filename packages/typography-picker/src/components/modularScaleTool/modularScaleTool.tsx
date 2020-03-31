import React from 'react';
import NumberEditor from '../numberEditor/numberEditor';
import SectionTool from '../sectionTool/sectionTool';
import msToRatio from '../msToRatio/msToRatio';
/*
TODO: onValueChange
- throttle + limit callback call with RxJS operators
- ex: ...pipe(AuditTime(30),distinctUntilChanges(),map(...))
 */
const ModularScaleTool: React.FC<{
  scaleRatio: string | number;
  onChange: (val: number) => void;
}> = props => (
  <SectionTool title="Scale Ratio">
    <NumberEditor
      unit="ratio"
      value={msToRatio(props.scaleRatio)}
      min={1}
      max={6}
      step={0.1}
      decimals={2}
      onValueChange={value => props.onChange(parseFloat(value))}
    />
  </SectionTool>
);

export default ModularScaleTool;
