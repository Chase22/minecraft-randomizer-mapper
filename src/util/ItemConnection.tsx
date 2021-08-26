import crypto from 'crypto'

export interface ItemConnection {
  source: string,
  target?: string
}

export function getId(connection: ItemConnection): string {
  const algo = crypto.createHash('md5');
  algo.update((`${connection.source}-${connection.target}`))
  return algo.digest('base64')
}