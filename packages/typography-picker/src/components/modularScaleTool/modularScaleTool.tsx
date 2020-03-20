import React from 'react';
import NumberEditor from '../numberEditor/numberEditor';
import SectionTool from '../sectionTool/sectionTool';
import msToRatio from '../msToRatio/msToRatio';

const ModularScaleTool: React.FC<{
  scaleRatio: string;
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
