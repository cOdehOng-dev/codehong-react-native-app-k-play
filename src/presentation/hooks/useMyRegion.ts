import { useAppSelector } from './hooks';

export default function useMyRegion() {
  return useAppSelector(state => state.myRegion);
}
