import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import {
  CreateAccountOutput,
  CreateAccountInput,
} from './dtos/create-account.dto';
import { LoginOutput, LoginInput } from './dtos/login-dto';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => Boolean)
  hi() {
    return true;
  }

  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      const { ok, error } = await this.usersService.createAccount(
        createAccountInput,
      );
      if (error) {
        return {
          error,
          ok,
        };
      }
      return {
        ok,
      };
    } catch (error) {
      return { ok: false, error };
    }
  }
  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput) {
    try {
      return await this.usersService.login(loginInput);
    } catch (error) {
      return { ok: false, error };
    }
  }
  @Query((returns) => User)
  me(@Context() context) {
    if (!context.user) {
      return;
    } else {
      return context.user;
    }
  }
}
