import {
  CreateCampaignDto,
  SendCampaignDto,
  UpdateCampaignDto,
} from 'src/campaign/campaign.dto';

export const campaignFixture: CreateCampaignDto = {
  subject: 'Hello world',
  textData: 'Come visit my shop',
};

export const campaignFixtureWithId: SendCampaignDto = {
  id: 1,
};

export const campaignFixtureWithoutId: SendCampaignDto = {
  subject: 'Hello world',
  textData: 'Come visit my shop',
};

export const modifiedCampaignFixture: UpdateCampaignDto = {
  textData: 'Come visit my shop now!',
};
