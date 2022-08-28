import * as mongoose from 'mongoose';

export const UniversitiesSchema = new mongoose.Schema(
  {
    domains: [{ type: String, required: true }],
    alpha_two_code: { type: String, required: true },
    country: { type: String, required: true },
    web_pages: [{ type: String, required: true }],
    name: { type: String, required: true },
    'state-province': { type: String, required: false },
  },
  { timestamps: true, collection: 'universities' }
);
