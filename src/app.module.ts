import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PerksModule } from './perks/perks.module';
import { AddonsModule } from './addons/addons.module';
import { ItemsModule } from './items/items.module';
import { OfferingsModule } from './offerings/offerings.module';
import { SurvivorsModule } from './survivors/survivors.module';
import { KillersModule } from './killers/killers.module';

@Module({
  imports: [PerksModule, AddonsModule, ItemsModule, OfferingsModule, SurvivorsModule, KillersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
