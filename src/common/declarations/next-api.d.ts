declare module "next" {
  export interface NextApiRequest {
    files: any[];
    imageUrl: string;
  }
}

export {};
