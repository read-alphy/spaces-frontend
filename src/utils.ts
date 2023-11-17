export const HOST = process.env.NEXT_PUBLIC_HOST;


export interface SpaceDetail {
    id: string;
    title: string;
    start_date: string;
    added_at: string;
    creator_id: string;
    creator_name: string;
    creator_screen_name: string;
    media_url: string | null;
    error: string | null;
  }