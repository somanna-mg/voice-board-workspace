export interface ArrayElementProps {
  values: (string | number)[];
  selectedIndex?: number;
  onCellClick?: (index: number) => void;
}

export interface ArrayCell {
  value: string | number;
  index: number;
  isSelected: boolean;
}

export interface ArrayElementState {
  values: (string | number)[];
  selectedIndex: number | null;
  isEditing: boolean;
} 