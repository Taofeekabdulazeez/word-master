export type ApiResponse<T = object> = {
  message: string;
  status: number;
  data: T;
};

export type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export type PageProps = {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
