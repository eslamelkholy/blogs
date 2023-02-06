import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { AppController } from './app.controller';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { GraphQLFormattedError } from 'graphql';
import { Post } from './entities/post.entity';
import { PostService } from './services/post.service';
import { PostResolver } from './resolvers/post.resolver';
import { PostRepository } from './repositories/post.repository';
import { UserToPost } from './entities/user.post.entity';
import { UserPostService } from './services/user.post.service';
import { UserPostRepository } from './repositories/user.post.repository';
import { PostJobService } from './jobs/post.job';
import { PostViews } from './entities/post.views.entity';
import { PostViewsRepository } from './repositories/post.views.repository';
import { PostViewService } from './services/post.views.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: process.env.NODE_ENV === 'development',
      playground: process.env.NODE_ENV === 'development',
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error: any) => {
        if (error.extensions.code === 'BAD_USER_INPUT') return error;

        delete error.extensions.exception.stacktrace;
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.message,
          extensions: { ...error.extensions.exception },
        };
        return graphQLFormattedError;
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.POSTGRES_USER),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: ['dist/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Post, UserToPost, PostViews]),
  ],
  controllers: [AppController],
  providers: [
    UserService,
    UserResolver,
    UserRepository,
    PostService,
    PostResolver,
    PostRepository,
    UserToPost,
    UserPostService,
    UserPostRepository,
    PostJobService,
    PostViewService,
    PostViewsRepository,
  ],
})
export class AppModule {}
