export class RegisterDto {
  username: string;  
  email: string;     
  password: string;  
}

export class UserResponseDto {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
}