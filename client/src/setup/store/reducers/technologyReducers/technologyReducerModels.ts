export interface Technology {
  _id?: string;
  TechnologyName: string;
  description: string;
  picture?: string;
}
export interface TechnologyState {
  technologies: Technology[];
  loading: boolean;
  error: any;
}
