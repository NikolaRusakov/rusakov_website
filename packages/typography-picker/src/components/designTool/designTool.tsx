import React, { useReducer, useEffect } from 'react';
import Typography from 'typography';
// @ts-ignore
import gray from 'gray-percentage';
import { Lens } from 'monocle-ts';
import fontList from '../../fontList.json';
import Select from '../select/select';
import SectionTool from '../sectionTool/sectionTool';
import NumberEditor from '../numberEditor/numberEditor';
import { parseUnit } from '../../util/parseUnit';
import ModularScaleTool from '../modularScaleTool/modularScaleTool';
import FontSelectTool from '../fontSelectTool/fontSelectTool';
import FontWeightTool from '../fontWeightTool/fontWeightTool';
import {
  TypographyState,
  FontList,
  TypographyOptions,
} from '@saltit/typography-picker';

export interface DesignToolProps {
  defaultTheme: TypographyOptions;
  themeNames: string[];
  themes: { name: string; title: string; requireTheme: () => Promise<any> }[];
  onChange: (options: TypographyOptions) => void;
}

type ActionThemeType = {
  action: 'changeState';
  payload: Partial<TypographyState>;
};

type ActionFontType = {
  action: 'changeFont';
  payload: {
    options: Typography;
    headerFamily?: FontList;
    bodyFamily?: FontList;
  };
};

type ActionOptionsType = {
  action: 'modifyOptions';
  payload: { [P in keyof TypographyOptions]: TypographyOptions[P] };
};

function reducer(
  state: TypographyState,
  action: ActionThemeType | ActionOptionsType | ActionFontType,
): TypographyState {
  switch (action.action) {
    case 'changeState':
      return { ...state, ...action.payload };
    case 'changeFont':
      return {
        ...state,
        ...(action.payload.headerFamily && {
          headerFamily: action.payload.headerFamily,
        }),
        ...(action.payload.bodyFamily && {
          bodyFamily: action.payload.bodyFamily,
        }),
        typography: action.payload.options,
      };
    case 'modifyOptions':
      return Lens.fromPath<TypographyState>()(['typography', 'options']).modify(
        s => ({
          ...s,
          ...action.payload,
        }),
      )(state);
    default:
      throw new Error();
  }
}

const Section: React.FC = ({ children }) => (
  <div
    style={{
      clear: 'both',
      paddingBottom: 3.75,
      paddingLeft: 7.5,
      paddingRight: 7.5,
    }}>
    {children}
  </div>
);
const SectionRow: React.FC = ({ children }) => (
  <div
    style={{
      marginBottom: 3.75,
      overflow: 'hidden',
    }}>
    {children}
  </div>
);

const SectionHeader: React.FC = ({ children }) => (
  <div
    style={{
      background: gray(17),
      borderBottom: '1px solid',
      borderColor: gray(50, 0, true),
      fontSize: 13,
      paddingLeft: 7.5,
      marginLeft: -7.5,
      marginRight: -7.5,
      marginBottom: 3.75,
    }}>
    {children}
  </div>
);

export const DesignTool: React.FC<DesignToolProps> = ({
  defaultTheme,
  themeNames,
  themes,
  onChange,
}) => {
  const typography = new Typography(defaultTheme);
  const [state, dispatch] = useReducer(reducer, {
    typography,
    theme: 0,
    bodyFamily: fontList[0],
    headerFamily: fontList[0],
  });

  useEffect(() => {
    onChange(state.typography.options);
  }, [state.typography.options]);
  return (
    <div
      style={{
        fontFamily: state.typography?.options?.headerFontFamily?.toString(),
        fontWeight: 300,
        fontSize: 10,
        lineHeight: 1.5,
        letterSpacing: 0,
        background: 'rgba(0,0,0,0.65)',
        color: 'rgba(255,255,255,0.95)',
        position: 'fixed',
        top: 0,
        right: 0,
        // @ts-ignore
        WebkitFontSmoothing: 'auto',
      }}>
      <Section>
        <div
          style={{
            color: 'rgba(255,255,255,0.95)',
            fontFamily: state.typography?.options?.headerFontFamily?.toString(),
            fontSize: 15,
            fontWeight: 300,
            marginBottom: 0,
            marginTop: 10,
          }}>
          Page Typography
        </div>
        <SectionRow>
          <div
            style={{
              fontSize: 10,
              lineHeight: '15px',
              marginTop: 7.5,
            }}>
            Pick theme
          </div>
          <Select
            options={themeNames}
            value={state.theme}
            style={{
              width: '100%',
            }}
            onChange={async value => {
              const createTheme = await themes[+value].requireTheme();
              const changeState = new Typography(createTheme.default);
              let newBodyFamily: FontList =
                fontList.find(font => font.family === value) || fontList[0];

              let newHeaderFamily: FontList =
                fontList.find(font => font.family === value) || fontList[0];
              dispatch({
                action: 'changeState',
                payload: {
                  theme: parseInt(value, 10),
                  typography: changeState,
                  bodyFamily: newBodyFamily,
                  headerFamily: newHeaderFamily,
                },
              });
            }}
          />
        </SectionRow>
      </Section>
      <Section>
        <SectionHeader>Base sizes</SectionHeader>
        <SectionRow>
          <SectionTool title="Font Size">
            <NumberEditor
              unit="px"
              value={parseUnit(state.typography.options.baseFontSize || '')[0]}
              min={9}
              max={100}
              step={0.25}
              decimals={2}
              onValueChange={baseFontSize =>
                setTimeout(() => {
                  dispatch({
                    action: 'modifyOptions',
                    payload: {
                      baseFontSize,
                    },
                  });
                })
              }
            />
          </SectionTool>
          <SectionTool title="Line height">
            <NumberEditor
              unit="number"
              value={state.typography.options.baseLineHeight ?? 1}
              min={1}
              max={2.5}
              step={0.01}
              decimals={2}
              onValueChange={value => {
                dispatch({
                  action: 'modifyOptions',
                  payload: {
                    baseLineHeight: value,
                  },
                });
              }}
            />
          </SectionTool>
        </SectionRow>
        <SectionRow>
          <SectionTool title="Paragraph Spacing">
            <NumberEditor
              unit="rhythm"
              value={state.typography.options.blockMarginBottom ?? 0}
              min={0.25}
              max={3}
              step={0.1}
              decimals={2}
              onValueChange={value =>
                dispatch({
                  action: 'modifyOptions',
                  payload: {
                    blockMarginBottom: parseFloat(value),
                  },
                })
              }
            />
          </SectionTool>
          <ModularScaleTool
            key="scale"
            scaleRatio={state.typography.options.scaleRatio || ''}
            onChange={newScale =>
              dispatch({
                action: 'modifyOptions',
                payload: {
                  scaleRatio: newScale,
                },
              })
            }
          />
        </SectionRow>
      </Section>

      <Section>
        <SectionHeader>Headers</SectionHeader>
        <SectionRow>
          <div>Typeface</div>
          <FontSelectTool
            type="header"
            options={state.typography.options}
            onSelectChange={(options, headerFamily) =>
              dispatch({
                action: 'changeFont',
                payload: {
                  options: new Typography(options),
                  headerFamily,
                },
              })
            }
          />
        </SectionRow>
        <SectionRow>
          <SectionTool title="Weight">
            <FontWeightTool
              type="header"
              family={state.headerFamily}
              weight={state.typography.options.headerWeight ?? 400}
              options={state.typography.options}
              onChange={newOptions =>
                dispatch({ action: 'modifyOptions', payload: newOptions })
              }
            />
          </SectionTool>
        </SectionRow>
      </Section>

      <Section>
        <SectionHeader>Body</SectionHeader>
        <SectionRow>
          <div>Typeface</div>
          <FontSelectTool
            type="body"
            options={state.typography.options}
            onSelectChange={(options, bodyFamily) =>
              dispatch({
                action: 'changeFont',
                payload: {
                  options: new Typography(options),
                  bodyFamily,
                },
              })
            }
          />
        </SectionRow>
        <SectionRow>
          <SectionTool title="Body Weight">
            <FontWeightTool
              type="body"
              family={state.bodyFamily}
              weight={state.typography.options.bodyWeight || 0}
              options={state.typography.options}
              onChange={newOptions =>
                dispatch({ action: 'modifyOptions', payload: newOptions })
              }
            />
          </SectionTool>
          <SectionTool title="Bold Weight">
            <FontWeightTool
              type="bold"
              family={state.bodyFamily || fontList[0]}
              weight={state.typography.options.boldWeight || 0}
              options={state.typography.options}
              onChange={newOptions =>
                dispatch({ action: 'modifyOptions', payload: newOptions })
              }
            />
          </SectionTool>
        </SectionRow>
      </Section>
    </div>
  );
};

export default DesignTool;
