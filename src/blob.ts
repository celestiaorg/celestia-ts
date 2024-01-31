import {Client} from "./client";
import { plainToClass } from 'class-transformer';

export class BlobClient extends Client {
  async get(height: number, namespace: Namespace, commitment: Commitment): Promise<Blob> {
    let blob = await this.callMethod('blob.Get', [height, namespace, commitment])
    return plainToClass(Blob, blob)
  }

  async get_all(height: number, namespaces: Namespace[]): Promise<Blob[]> {
    let blobs = await this.callMethod('blob.GetAll', [height, namespaces])
    return plainToClass(Array<Blob>, blobs)
  }

  async get_proof(height: number, namespace: Namespace, commitment: Commitment): Promise<Proof> {
    let proof = await this.callMethod('blob.GetProof', [height, namespace, commitment])
    return plainToClass(Proof, proof)
  }

  async included(height: number, namespace: Namespace, commitment: Commitment): Promise<boolean> {
    return await this.callMethod('blob.Included', [height, namespace, commitment]) as boolean
  }

  async submit(blobs: Blob[], gasPrice: number): Promise<number> {
    return await this.callMethod('blob.Submit', [blobs, gasPrice]) as number
  }
}

export class Blob {
  namespace: Namespace
  data: Uint8Array
  share_version: number
  commitment: string

  toJson() {
    return {
      namespace: this.namespace.toString(),
      data: btoa(this.data.toString()),
      share_version: this.share_version,
      commitment: this.commitment.toString()
    }
  }
}


export class Namespace {
  id: string
  toString() {
    return btoa(this.id)
  }
}

export class Commitment {
  commitment: string
  toString() {
    return btoa(this.commitment)
  }
}

export class Proof {
  start: number
  end: number
  nodes: Object
  leaf_hash: string
  is_max_namespace_ignored: boolean
}
