export const createFactory = <T extends { id?: string }>(create: (attributes?: T) => T) => ({
  create,
  createMany: (count: number, attributes: T[] = []) =>
    Array.from({ length: count }).map((_, key) => create({ id: key.toString(), ...attributes[key] ?? {} })),
})
