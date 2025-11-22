import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cant be hollow'})
  title: string;
  @IsString()
  @IsNotEmpty({ message: 'Text cant be hollow' })
  text: string;
}
