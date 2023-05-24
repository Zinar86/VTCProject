export interface Mapper<T, K = object> {
    toDomain?(raw: K): T;
    fromDomain(t: T): K;
}