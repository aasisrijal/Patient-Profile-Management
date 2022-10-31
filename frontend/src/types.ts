export interface PatientData {
  id: number;
  full_name: string;
  email: string;
  contact: string;
  dob: string;
  image_url: string;
  user_id: string;
  is_special: string;
  is_deleted: string;
  created_at: string;
  updated_at: string;
}

export interface FileUploaderProps {
  buttonText: string;
  fileTypes?: string[];
  loading?: boolean;
  onError: (error: string) => void;
  onSuccess: (file: File) => void;
  imageUrlLink?: string | undefined;
}

export interface PatientFormData {
  email: string;
  full_name: string;
  contact: string;
  dob: string;
  is_special: boolean;
  image_url?: string;
}
