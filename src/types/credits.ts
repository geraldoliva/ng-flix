export type Actor = {
  profile_path: string;
  name: string;
  character: string;
};

export type CreditsDto = {
  cast: Actor[];
};
