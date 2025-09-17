export type ClientData = {
  id?: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  Images: ClientImages[];
};

export type AllHeroesClientData = Omit<ClientData, "superpowers" | "catch_phrase" | "Images"> & {
  image_url: string;
};

export type SingleHeroClientData = Omit<ClientData, "superpowers" | "catch_phrase" | "Images"> & {
  images_url: string[];
};

export type ClientImages = {
  id: string;
  hero_id: string;
  url: string;
};
