export type ApiResponse<T> = {
  status: number;     
  success: boolean;  
  message: string;    
  data: T;            
};
