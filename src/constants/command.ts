export interface SelectItem {
  name: string;
  desc: string;
  cmd: () => void;
}

export const allDataSet: SelectItem[] = []