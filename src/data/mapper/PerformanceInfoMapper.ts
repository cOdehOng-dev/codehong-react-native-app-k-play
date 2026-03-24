import { DtoMapper } from './Mapper';
import { PerformanceItemDto } from '../model/performance/list/PerformanceItemDto';
import { PerformanceInfoItem } from '../../domain/model/PerformanceInfoItem';

function toShortAreaName(area?: string): string | undefined {
  if (!area) return area;
  if (area.includes('서울')) return '서울';
  if (area.includes('부산')) return '부산';
  if (area.includes('대구')) return '대구';
  if (area.includes('인천')) return '인천';
  if (area.includes('광주')) return '광주';
  if (area.includes('대전')) return '대전';
  if (area.includes('울산')) return '울산';
  if (area.includes('세종')) return '세종';
  if (area.includes('경기')) return '경기';
  if (area.includes('강원')) return '강원';
  if (area.includes('충북') || area.includes('충청북')) return '충북';
  if (area.includes('충남') || area.includes('충청남')) return '충남';
  if (area.includes('전북') || area.includes('전라북')) return '전북';
  if (area.includes('전남') || area.includes('전라남')) return '전남';
  if (area.includes('경북') || area.includes('경상북')) return '경북';
  if (area.includes('경남') || area.includes('경상남')) return '경남';
  if (area.includes('제주')) return '제주';
  return area;
}

const PerformanceInfoMapper: DtoMapper<PerformanceItemDto | null | undefined, PerformanceInfoItem> = {
  asDomain(dto: PerformanceItemDto | null | undefined): PerformanceInfoItem {
    if (!dto) return {};

    return {
      id: dto.id,
      name: dto.name,
      startDate: dto.startDate,
      endDate: dto.endDate,
      placeName: dto.facilityName,
      posterUrl: dto.posterUrl,
      area: toShortAreaName(dto.area),
      genre: dto.genre,
      openRun: dto.openRun,
      state: dto.state,
      awards: dto.awards?.split('&lt;br&gt;')[0],
    };
  },
};

export function asDomain(dto?: PerformanceItemDto | null): PerformanceInfoItem {
  return PerformanceInfoMapper.asDomain(dto);
}

export default PerformanceInfoMapper;
