export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
export type AlignItems = 'stretch' | 'flex-start' | 'center' | 'flex-end';
export type FlexWrap = 'nowrap' | 'wrap';

export interface FlexboxState {
  flexDirection: FlexDirection;
  justifyContent: JustifyContent;
  alignItems: AlignItems;
  gap: number;
  flexWrap: FlexWrap;
  itemCount: number;
  containerWidthPercent: number;
  showAxes: boolean;
}

export type GridColumnMode = 'fixed' | 'minmax';

export interface GridState {
  columns: number; // 1, 2, 3, 4
  gap: number;
  mode: GridColumnMode;
  minmaxMin: number; // e.g. 180px
  itemCount: number;
  containerWidthPercent: number;
  customSpanItem1: boolean;
}

export type PositionType = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

export interface PositionState {
  type: PositionType;
  top: number;
  left: number;
  parentHasRelative: boolean;
}

export type OverflowType = 'visible' | 'hidden' | 'auto' | 'scroll';

export interface BreakFixCase {
  id: string;
  title: string;
  category: string;
  summary: string;
  brokenDescription: string;
  fixedDescription: string;
  whyItBroke: string;
  howToFix: string;
  brokenCode: string;
  fixedCode: string;
  highlightProps: string[];
}

export interface GlossaryTerm {
  term: string;
  japanese: string;
  category: 'flexbox' | 'grid' | 'position' | 'box-model';
  shortDesc: string;
  detailedDesc: string;
  exampleCode?: string;
}
