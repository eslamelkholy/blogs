export interface Post {
  id: number;
  created_at: string;
  text: string;
  title: string;
  totalPostViews: number;
  subTitle: string;
}

export interface RoleProps {
  role: string;
}
