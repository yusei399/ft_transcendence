import { IsEmail , IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDto {
	@IsEmail()
	@IsNotEmpty()
	readonly email: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	readonly password: string;
}

