export interface EntityMapper<Entity, Domain> {
  asEntity(domain: Domain): Entity;
  asDomain(entity: Entity): Domain;
}

export interface DtoMapper<Dto, Domain> {
  asDomain(dto: Dto): Domain;
}

export interface DomainMapper<Dto, Domain> {
  asDto(domain: Domain): Dto;
}
