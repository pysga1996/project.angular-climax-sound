import {Artist} from './artist';

export interface Song {
  id: number;
  name: string;
  releaseDate: Date;
  url: string;
  rating: [];
  displayRating: any;
  artists: Artist[];
  tags: [];
  genres: [];
  mood: any;
  activity: any;
  isDisabled?: boolean;
}
