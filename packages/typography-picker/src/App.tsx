import React, { useMemo, useReducer } from 'react';
import { Helmet } from 'react-helmet';
import logo from './logo.svg';
import './App.css';
import FontSelectTool from './components/fontSelectTool/fontSelectTool';

import Typography from 'typography';
// @ts-ignore
import altonTheme from 'typography-theme-alton';
import injectFonts from './injectFonts';
import ModularScaleTool from './components/modularScaleTool/modularScaleTool';
import { parseUnit } from './util/parseUnit';
import NumberEditor from './components/numberEditor/numberEditor';
import Select from './components/select/select';
import { FontList, TypographyOptions } from '../index';
// @ts-ignore
import gray from 'gray-percentage';
import { Lens } from 'monocle-ts';
import { themes } from './themes';
import fontList from './fontList.json';

//fixme to be extracted into plugin
let themeNames: string[] = themes.map(theme => theme.name);

interface AppState {
  theme: number;
  typography: Typography;
  bodyFamily: FontList;
  headerFamily: FontList;
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
//
// const SectionHeader: React.FC = ({ children }) => (
//   <div
//     style={{
//       background: gray(17),
//       borderBottom: '1px solid',
//       borderColor: gray(50, 0, true),
//       fontSize: 13,
//       paddingLeft: 7.5,
//       marginLeft: -7.5,
//       marginRight: -7.5,
//       marginBottom: 3.75,
//     }}>
//     {children}
//   </div>
// );

type ActionThemeType = {
  action: 'newTheme';
  payload: Partial<AppState>;
};

type ActionOptionsType = {
  action: 'modifyOptions';
  payload: { [P in keyof TypographyOptions]: TypographyOptions[P] };
};

function reducer(
  state: AppState,
  action: ActionThemeType | ActionOptionsType,
): AppState {
  switch (action.action) {
    case 'newTheme':
      return { ...state, ...action.payload };
    case 'modifyOptions':
      return Lens.fromPath<AppState>()(['typography', 'options']).modify(s => ({
        ...s,
        ...action.payload,
      }))(state);
    default:
      throw new Error();
  }
}

function App() {
  const typography = new Typography(altonTheme);
  const [state, dispatch] = useReducer(reducer, {
    typography,
    theme: 0,
    bodyFamily: fontList[0],
    headerFamily: fontList[0],
  });

  const currentTypography = new Typography(state.typography.options);
  const injectRecentFont = useMemo(() => injectFonts(currentTypography), [
    state.typography.options.headerFontFamily,
    state.typography.options.bodyFontFamily,
  ]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rusakov Website</title>
        <link rel="canonical" href="http://rusakov.website/" />
        <style id="typography.js">{currentTypography.toString()}</style>
        {injectRecentFont}
      </Helmet>

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
                const createTheme = await themes[+value].requireStr();
                const newTheme = await new Typography(createTheme.default);
                let newBodyFamily: FontList =
                  fontList.find(font => font.family === value) || fontList[0];

                let newHeaderFamily: FontList =
                  fontList.find(font => font.family === value) || fontList[0];

                dispatch({
                  action: 'newTheme',
                  payload: {
                    theme: parseInt(value, 10),
                    typography: newTheme,
                    bodyFamily: newBodyFamily,
                    headerFamily: newHeaderFamily,
                  },
                });
              }}
            />
          </SectionRow>
        </Section>

        <FontSelectTool
          type="body"
          options={state.typography.options}
          onSelectChange={(options, headerFamily) => {
            dispatch({
              action: 'modifyOptions',
              payload: options,
            });
          }}
        />
        <ModularScaleTool
          key="scale"
          scaleRatio={state.typography.options.scaleRatio || ''}
          onChange={newScale =>
            setTimeout(() => {
              dispatch({
                action: 'modifyOptions',
                payload: {
                  scaleRatio: newScale,
                },
              });
            })
          }
        />

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
        <br />
      </div>
      <div className="App">
        <header className="App-header">
          <h1>Here We GO ! ! !</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    </>
  );
}

export default App;
