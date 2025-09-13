export type ClientData = {
  id?: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  Images: ClientImages[];
};

export type ClientImages = {
  id: string;
  hero_id: string;
  url: string;
};
