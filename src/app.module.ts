import { Module, NestModule, MiddlewareConsumer, RequestMethod, Req } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { BooksModule } from './books/books.module';
import { DummyResourceModule } from './dummy-resource/dummy-resource.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [BooksModule, DummyResourceModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .forRoutes({
        path: 'users/logout',
        method: RequestMethod.GET
      },{
        path: 'books/place-order',
        method: RequestMethod.POST
      })
  }
}
