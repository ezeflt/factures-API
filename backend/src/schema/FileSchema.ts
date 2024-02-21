export interface FileSchema {
  id?: number;
  fileBlob: Blob;
  user_id: number;
}

export interface FileDataFromBody {
    description: string;
    price: number;
    user_id: number;
}
