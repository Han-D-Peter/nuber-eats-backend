import { MutationOutput } from 'src/common/dtos/output.dto';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EditProfileOutput extends MutationOutput {}
