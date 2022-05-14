type VideoFileFormType = {
  name: string;
  description?: string;
  allowedGroups?: string[];
  source?: never;
  videoFile?: string;
};

type VideoSourceFormType = {
  name: string;
  description?: string;
  allowedGroups?: string[];
  source?: string;
  videoFile?: never;
};

export type VideoFormType = VideoFileFormType | VideoSourceFormType;
